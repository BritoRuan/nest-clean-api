import { PaginationParams } from '@/core/repositories/paginationParams'
import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/contracts/answerCommentsRepository'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answerComment'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaAnswersCommentsRepository
  implements AnswerCommentsRepository
{
  findById(id: string): Promise<AnswerComment | null> {
    throw new Error('Method not implemented.')
  }

  findManyByAnswerId(
    answerId: string,
    params: PaginationParams,
  ): Promise<AnswerComment[]> {
    throw new Error('Method not implemented.')
  }

  create(answerComment: AnswerComment): Promise<void> {
    throw new Error('Method not implemented.')
  }

  delete(answerComment: AnswerComment): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
