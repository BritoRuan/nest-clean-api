import { IAnswerAttachmentsRepository } from '@/domain/forum/application/repositories/contracts/answerAttachmentsRepository'
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answerAttachment'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaAnswersAttachmentsRepository
  implements IAnswerAttachmentsRepository
{
  findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]> {
    throw new Error('Method not implemented.')
  }

  deleteManyByAnswerId(answerId: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
