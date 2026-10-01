import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ConversationsService } from './conversations.service';
import {
  ConversationMemberDto,
  ConversationResponseDto,
  CreateDirectConversationDto,
  CreateGroupConversationDto,
  UpdateMemberRoleDto,
} from './dto/conversation.dto';
import { PaginationQueryDto } from '../common/dto/pagination.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  CurrentUser,
  AuthenticatedUser,
} from '../common/decorators/current-user.decorator';

@ApiTags('conversations')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('conversations')
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  @Get()
  @ApiOperation({ summary: "List the authenticated user's conversations." })
  list(
    @CurrentUser() user: AuthenticatedUser,
    @Query() query: PaginationQueryDto,
  ) {
    return this.conversationsService.listMyConversations(
      user.userId,
      query.cursor,
      query.limit,
    );
  }

  @Post('direct')
  @ApiOperation({
    summary:
      'Create (or return the existing) direct conversation with another user.',
  })
  createDirect(
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: CreateDirectConversationDto,
  ): Promise<ConversationResponseDto> {
    return this.conversationsService.createDirectConversation(
      user.userId,
      dto.userId,
    );
  }

  @Post('groups')
  @ApiOperation({ summary: 'Create a new group conversation.' })
  createGroup(
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: CreateGroupConversationDto,
  ): Promise<ConversationResponseDto> {
    return this.conversationsService.createGroupConversation(user.userId, dto);
  }

  @Get(':conversationId')
  @ApiParam({ name: 'conversationId', format: 'uuid' })
  @ApiOperation({ summary: 'Get a conversation the user is a member of.' })
  get(
    @CurrentUser() user: AuthenticatedUser,
    @Param('conversationId', ParseUUIDPipe) conversationId: string,
  ): Promise<ConversationResponseDto> {
    return this.conversationsService.getConversation(
      user.userId,
      conversationId,
    );
  }

  @Get(':conversationId/members')
  @ApiParam({ name: 'conversationId', format: 'uuid' })
  @ApiOperation({ summary: 'List active members of a conversation.' })
  async getMembers(
    @CurrentUser() user: AuthenticatedUser,
    @Param('conversationId', ParseUUIDPipe) conversationId: string,
  ): Promise<ConversationMemberDto[]> {
    // getConversation performs the membership check; discard the body.
    await this.conversationsService.getConversation(
      user.userId,
      conversationId,
    );
    return this.conversationsService.listMembers(conversationId);
  }

  @Delete(':conversationId/members/me')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({ name: 'conversationId', format: 'uuid' })
  @ApiOperation({ summary: 'Leave a conversation.' })
  async leave(
    @CurrentUser() user: AuthenticatedUser,
    @Param('conversationId', ParseUUIDPipe) conversationId: string,
  ): Promise<void> {
    await this.conversationsService.leaveConversation(
      user.userId,
      conversationId,
    );
  }

  @Delete(':conversationId/members/:userId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({ name: 'conversationId', format: 'uuid' })
  @ApiParam({ name: 'userId', format: 'uuid' })
  @ApiOperation({ summary: 'Remove a member from a group conversation.' })
  async removeMember(
    @CurrentUser() user: AuthenticatedUser,
    @Param('conversationId', ParseUUIDPipe) conversationId: string,
    @Param('userId', ParseUUIDPipe) targetUserId: string,
  ): Promise<void> {
    await this.conversationsService.removeMember(
      user.userId,
      conversationId,
      targetUserId,
    );
  }

  @Patch(':conversationId/members/:userId/role')
  @ApiParam({ name: 'conversationId', format: 'uuid' })
  @ApiParam({ name: 'userId', format: 'uuid' })
  @ApiOperation({ summary: "Change a group member's role (owner only)." })
  async updateRole(
    @CurrentUser() user: AuthenticatedUser,
    @Param('conversationId', ParseUUIDPipe) conversationId: string,
    @Param('userId', ParseUUIDPipe) targetUserId: string,
    @Body() dto: UpdateMemberRoleDto,
  ): Promise<void> {
    await this.conversationsService.updateMemberRole(
      user.userId,
      conversationId,
      targetUserId,
      dto.role,
    );
  }
}
