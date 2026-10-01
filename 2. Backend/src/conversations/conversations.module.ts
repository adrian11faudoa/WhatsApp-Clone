import { Module } from '@nestjs/common';
import { ConversationsController } from './conversations.controller';
import { ConversationsService } from './conversations.service';
import { AuditService } from '../common/audit/audit.service';

@Module({
  controllers: [ConversationsController],
  providers: [ConversationsService, AuditService],
  exports: [ConversationsService],
})
export class ConversationsModule {}
