import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answerAttachment'

export interface IAnswerAttachmentsRepository {
  findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]>
  deleteManyByAnswerId(answerId: string): Promise<void>
}
