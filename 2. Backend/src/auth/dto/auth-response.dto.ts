import { ApiProperty } from '@nestjs/swagger';

export class AuthTokensDto {
  @ApiProperty()
  accessToken!: string;

  @ApiProperty()
  refreshToken!: string;

  @ApiProperty()
  accessTokenExpiresInSeconds!: number;
}

export class AuthenticatedUserDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  email!: string;

  @ApiProperty()
  username!: string;

  @ApiProperty()
  displayName!: string;
}

export class AuthResponseDto {
  @ApiProperty({ type: AuthenticatedUserDto })
  user!: AuthenticatedUserDto;

  @ApiProperty({ type: AuthTokensDto })
  tokens!: AuthTokensDto;

  @ApiProperty()
  deviceId!: string;

  @ApiProperty()
  sessionId!: string;
}
