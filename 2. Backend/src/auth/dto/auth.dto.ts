import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export enum DevicePlatformDto {
  IOS = 'IOS',
  ANDROID = 'ANDROID',
  WEB = 'WEB',
  DESKTOP = 'DESKTOP',
  UNKNOWN = 'UNKNOWN',
}

export class DeviceInfoDto {
  @ApiPropertyOptional({
    enum: DevicePlatformDto,
    default: DevicePlatformDto.UNKNOWN,
  })
  @IsOptional()
  @IsEnum(DevicePlatformDto)
  platform?: DevicePlatformDto;

  @ApiPropertyOptional({
    description: 'Human-readable device name, e.g. "Sam\'s iPhone".',
  })
  @IsOptional()
  @IsString()
  @MaxLength(120)
  name?: string;

  @ApiPropertyOptional({ description: 'Client application version.' })
  @IsOptional()
  @IsString()
  @MaxLength(40)
  appVersion?: string;
}

export class RegisterDto {
  @ApiProperty()
  @IsEmail()
  @MaxLength(254)
  email!: string;

  @ApiProperty({ minLength: 12 })
  @IsString()
  @MinLength(12, { message: 'Password must be at least 12 characters long.' })
  @MaxLength(128)
  password!: string;

  @ApiProperty({ minLength: 3, maxLength: 32 })
  @IsString()
  @MinLength(3)
  @MaxLength(32)
  @Matches(/^[a-zA-Z0-9_.]+$/, {
    message:
      'Username may only contain letters, numbers, underscores, and periods.',
  })
  username!: string;

  @ApiProperty({ maxLength: 80 })
  @IsString()
  @MinLength(1)
  @MaxLength(80)
  displayName!: string;

  @ApiPropertyOptional({ type: DeviceInfoDto })
  @IsOptional()
  device?: DeviceInfoDto;
}

export class LoginDto {
  @ApiProperty()
  @IsEmail()
  email!: string;

  @ApiProperty()
  @IsString()
  password!: string;

  @ApiPropertyOptional({ type: DeviceInfoDto })
  @IsOptional()
  device?: DeviceInfoDto;
}

export class RefreshTokenDto {
  @ApiProperty()
  @IsString()
  refreshToken!: string;
}

export class LogoutDto {
  @ApiPropertyOptional({
    description:
      'Refresh token to revoke. If omitted, revokes the session tied to the presented access token.',
  })
  @IsOptional()
  @IsString()
  refreshToken?: string;
}
