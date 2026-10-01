import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import {
  MeResponseDto,
  PublicProfileResponseDto,
  UpdateProfileDto,
} from './dto/profile.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  CurrentUser,
  AuthenticatedUser,
} from '../common/decorators/current-user.decorator';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @ApiOperation({ summary: 'Get the authenticated user and profile.' })
  getMe(@CurrentUser() user: AuthenticatedUser): Promise<MeResponseDto> {
    return this.usersService.getMe(user.userId);
  }

  @Patch('me')
  @ApiOperation({ summary: 'Update the authenticated user profile.' })
  updateMe(
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: UpdateProfileDto,
  ): Promise<MeResponseDto> {
    return this.usersService.updateMe(user.userId, dto);
  }

  @Get(':userId')
  @ApiParam({ name: 'userId', format: 'uuid' })
  @ApiOperation({ summary: "Get another user's public profile." })
  getPublicProfile(
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<PublicProfileResponseDto> {
    return this.usersService.getPublicProfile(userId);
  }
}
