import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class DeviceResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  platform!: string;

  @ApiPropertyOptional()
  name?: string | null;

  @ApiProperty()
  status!: string;

  @ApiProperty()
  lastActiveAt!: Date;

  @ApiProperty()
  createdAt!: Date;
}
