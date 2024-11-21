import { ResourceNotFoundError } from '@/core/errors/errors/ResourceNotFoundError/ResourceNotFoundError'
import { QuestionsRepository } from '../../../repositories/contracts/questionsRepository'
import { NotAllowedError } from '@/core/errors/errors/NotAllowedError/NotAllowedError'
import { Either, left, right } from '@/core/either/either'

interface DeleteQuestionUseCaseRequest {
  authorId: string
  questionId: string
}

type DeleteQuestionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>

export class DeleteQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    questionId,
    authorId,
  }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError())
    }

    await this.questionsRepository.delete(question)

    return right(null)
  }
}
