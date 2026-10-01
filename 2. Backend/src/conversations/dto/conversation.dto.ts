import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateDirectConversationDto {
  @ApiProperty({ format: 'uuid', description: 'The other participant.' })
  @IsUUID()
  userId!: string;
}

export class CreateGroupConversationDto {
  @ApiProperty({ minLength: 1, maxLength: 100 })
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  name!: string;

  @ApiPropertyOptional({ maxLength: 500 })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @ApiProperty({
    type: [String],
    description:
      'Initial member user IDs, excluding the creator (added automatically as OWNER).',
  })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(255)
  @ArrayUnique()
  @IsUUID('4', { each: true })
  memberIds!: string[];
}

export class ConversationMemberDto {
  @ApiProperty()
  userId!: string;

  @ApiProperty()
  role!: string;

  @ApiProperty()
  status!: string;

  @ApiProperty()
  joinedAt!: Date;
}

export class GroupSummaryDto {
  @ApiProperty()
  name!: string;

  @ApiPropertyOptional()
  description?: string | null;

  @ApiPropertyOptional()
  avatarUrl?: string | null;
}

export class ConversationResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty({ enum: ['DIRECT', 'GROUP'] })
  type!: 'DIRECT' | 'GROUP';

  @ApiProperty()
  createdAt!: Date;

  @ApiPropertyOptional({ type: GroupSummaryDto })
  group?: GroupSummaryDto;

  @ApiProperty({ type: [ConversationMemberDto] })
  members!: ConversationMemberDto[];
}

export class UpdateMemberRoleDto {
  @ApiProperty({ enum: ['ADMIN', 'MEMBER'] })
  @IsString()
  role!: 'ADMIN' | 'MEMBER';
}
