import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { and, desc, eq } from 'drizzle-orm';
import { DATABASE_CONNECTION, Database } from '../database/database.module';
import { devices, sessions } from '../database/schema';
import { AppException } from '../common/errors/app.exception';
import { AppErrorCode } from '../common/errors/app-error-codes';
import { DeviceResponseDto } from './dto/device-response.dto';

@Injectable()
export class DevicesService {
  constructor(@Inject(DATABASE_CONNECTION) private readonly db: Database) {}

  async listMyDevices(userId: string): Promise<DeviceResponseDto[]> {
    return this.db
      .select({
        id: devices.id,
        platform: devices.platform,
        name: devices.name,
        status: devices.status,
        lastActiveAt: devices.lastActiveAt,
        createdAt: devices.createdAt,
      })
      .from(devices)
      .where(eq(devices.userId, userId))
      .orderBy(desc(devices.lastActiveAt));
  }

  /**
   * Revokes a device: marks it REVOKED and revokes every session tied to
   * it, so a lost/stolen device is fully cut off immediately rather than
   * only once its access token expires.
   */
  async revokeDevice(userId: string, deviceId: string): Promise<void> {
    const [device] = await this.db
      .select({ id: devices.id })
      .from(devices)
      .where(and(eq(devices.id, deviceId), eq(devices.userId, userId)))
      .limit(1);

    if (!device) {
      throw new AppException({
        code: AppErrorCode.NOT_FOUND,
        message: 'Device not found.',
        status: HttpStatus.NOT_FOUND,
      });
    }

    await this.db.transaction(async (tx) => {
      await tx
        .update(devices)
        .set({ status: 'REVOKED', updatedAt: new Date() })
        .where(eq(devices.id, deviceId));

      await tx
        .update(sessions)
        .set({ revoked: true, revokedAt: new Date(), updatedAt: new Date() })
        .where(
          and(eq(sessions.deviceId, deviceId), eq(sessions.revoked, false)),
        );
    });
  }
}
