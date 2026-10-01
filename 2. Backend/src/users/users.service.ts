import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DATABASE_CONNECTION, Database } from '../database/database.module';
import { profiles, users } from '../database/schema';
import { AppException } from '../common/errors/app.exception';
import { AppErrorCode } from '../common/errors/app-error-codes';
import {
  MeResponseDto,
  PublicProfileResponseDto,
  UpdateProfileDto,
} from './dto/profile.dto';

@Injectable()
export class UsersService {
  constructor(@Inject(DATABASE_CONNECTION) private readonly db: Database) {}

  async getMe(userId: string): Promise<MeResponseDto> {
    const row = await this.fetchUserWithProfile(userId);
    return {
      id: row.userId,
      email: row.email,
      profile: {
        id: row.profileId,
        username: row.username,
        displayName: row.displayName,
        avatarUrl: row.avatarUrl,
        about: row.about,
        showLastSeen: row.showLastSeen,
        showOnline: row.showOnline,
      },
    };
  }

  async updateMe(
    userId: string,
    dto: UpdateProfileDto,
  ): Promise<MeResponseDto> {
    const updates: Partial<typeof profiles.$inferInsert> = {};
    if (dto.displayName !== undefined) updates.displayName = dto.displayName;
    if (dto.about !== undefined) updates.about = dto.about;
    if (dto.avatarUrl !== undefined) updates.avatarUrl = dto.avatarUrl;
    if (dto.showLastSeen !== undefined) updates.showLastSeen = dto.showLastSeen;
    if (dto.showOnline !== undefined) updates.showOnline = dto.showOnline;

    if (Object.keys(updates).length > 0) {
      updates.updatedAt = new Date();
      await this.db
        .update(profiles)
        .set(updates)
        .where(eq(profiles.userId, userId));
    }

    return this.getMe(userId);
  }

  async getPublicProfile(userId: string): Promise<PublicProfileResponseDto> {
    const [row] = await this.db
      .select({
        userId: profiles.userId,
        username: profiles.username,
        displayName: profiles.displayName,
        avatarUrl: profiles.avatarUrl,
        about: profiles.about,
      })
      .from(profiles)
      .where(eq(profiles.userId, userId))
      .limit(1);

    if (!row) {
      throw new AppException({
        code: AppErrorCode.NOT_FOUND,
        message: 'User not found.',
        status: HttpStatus.NOT_FOUND,
      });
    }

    return row;
  }

  private async fetchUserWithProfile(userId: string) {
    const [row] = await this.db
      .select({
        userId: users.id,
        email: users.email,
        profileId: profiles.id,
        username: profiles.username,
        displayName: profiles.displayName,
        avatarUrl: profiles.avatarUrl,
        about: profiles.about,
        showLastSeen: profiles.showLastSeen,
        showOnline: profiles.showOnline,
      })
      .from(users)
      .innerJoin(profiles, eq(profiles.userId, users.id))
      .where(eq(users.id, userId))
      .limit(1);

    if (!row) {
      throw new AppException({
        code: AppErrorCode.NOT_FOUND,
        message: 'User not found.',
        status: HttpStatus.NOT_FOUND,
      });
    }

    return row;
  }
}
