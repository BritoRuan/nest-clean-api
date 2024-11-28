import { Attachment as PrismaAttachment } from '@prisma/client'
import { UniqueEntityId } from '@/core/entities/uniqueEntityId'
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answerattachment'

export class PrismaAnswerAttachmentMapper {
  static toDomain(raw: PrismaAttachment): AnswerAttachment {
    if (!raw.answerId) {
      throw new Error('Invalid attachment type.')
    }

    return AnswerAttachment.create(
      {
        attachmentId: new UniqueEntityId(raw.id),
        answerId: new UniqueEntityId(raw.answerId),
      },
      new UniqueEntityId(raw.id),
    )
  }
}
