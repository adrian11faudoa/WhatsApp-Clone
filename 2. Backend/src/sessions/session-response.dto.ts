import { ApiProperty } from '@nestjs/swagger';

export class SessionResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  deviceId!: string;

  @ApiProperty()
  revoked!: boolean;

  @ApiProperty()
  expiresAt!: Date;

  @ApiProperty()
  lastUsedAt!: Date;

  @ApiProperty()
  createdAt!: Date;
}
