import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/contracts/questionCommentsRepository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/questionComment'
import { PaginationParams } from '@/core/repositories/paginationParams'

export class InMemoryCommentQuestionRepository
  implements QuestionCommentsRepository
{
  public items: QuestionComment[] = []

  async findById(id: string) {
    const questionComment = this.items.find((item) => item.id.toString() === id)

    if (!questionComment) {
      return null
    }

    return questionComment
  }

  async findManyByQuestionId(questionId: string, { page }: PaginationParams) {
    const questionComments = this.items
      .filter((item) => item.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20)

    return questionComments
  }

  async create(questionComment: QuestionComment) {
    this.items.push(questionComment)
  }

  async delete(question: QuestionComment) {
    const itemIndex = this.items.findIndex((item) => item.id === question.id)

    this.items.splice(itemIndex, 1)
  }
}
