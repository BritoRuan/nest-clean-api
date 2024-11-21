import { ResourceNotFoundError } from '@/core/errors/errors/ResourceNotFoundError/ResourceNotFoundError'
import { AnswerCommentsRepository } from '../../../repositories/contracts/answerCommentsRepository'
import { AnswersRepository } from '../../../repositories/contracts/answersRepository'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answerComment'
import { UniqueEntityId } from '@/core/entities/uniqueEntityId'
import { Either, left, right } from '@/core/either/either'

interface CommentOnAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

type CommentOnAnswerUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    answerComment: AnswerComment
  }
>

export class CommentOnAnswerUseCase {
  constructor(
    private answersRepository: AnswersRepository,
    private answerCommentRepository: AnswerCommentsRepository,
  ) {}

  async execute({
    authorId,
    answerId,
    content,
  }: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityId(authorId),
      answerId: new UniqueEntityId(answerId),
      content,
    })

    await this.answerCommentRepository.create(answerComment)

    return right({
      answerComment,
    })
  }
}
