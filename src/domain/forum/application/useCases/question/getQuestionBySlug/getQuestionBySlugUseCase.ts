import { ResourceNotFoundError } from '@/core/errors/errors/ResourceNotFoundError/ResourceNotFoundError'
import { QuestionsRepository } from '../../../repositories/contracts/questionsRepository'
import { Question } from '@/domain/forum/enterprise/entities/question'
import { Either, left, right } from '@/core/either/either'

interface GetQuestionBySlugUseCaseRequest {
  slug: string
}

type GetQuestionBySlugUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    question: Question
  }
>

export class GetQuestionBySlugUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    slug,
  }: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseResponse> {
    const question = await this.questionsRepository.findBySlug(slug)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    return right({
      question,
    })
  }
}
