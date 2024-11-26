import { PaginationParams } from '@/core/repositories/paginationParams'
import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/contracts/questionCommentsRepository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/questionComment'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaQuestionsCommentsRepository
  implements QuestionCommentsRepository
{
  findById(id: string): Promise<QuestionComment | null> {
    throw new Error('Method not implemented.')
  }

  findManyByQuestionId(
    questionId: string,
    params: PaginationParams,
  ): Promise<QuestionComment[]> {
    throw new Error('Method not implemented.')
  }

  create(questionComment: QuestionComment): Promise<void> {
    throw new Error('Method not implemented.')
  }

  delete(questionComment: QuestionComment): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
