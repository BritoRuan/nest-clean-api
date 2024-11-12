import { InMemoryCommentAnswerRepository } from 'test/repositories/InMemoryRepository/InMemoryAnswerCommentsRepository/InMemoryAnswerCommentsRepository'
import { FetchAnswerCommentsUseCase } from './fetchAnswerCommentsUseCase'
import { makeAnswerComment } from 'test/factories/makeAnswerComments'
import { UniqueEntityId } from '@/core/entities/uniqueEntityId'

let inMemoryAnswersCommentsRepository: InMemoryCommentAnswerRepository
let sut: FetchAnswerCommentsUseCase

describe('Fetch Answer Comments', () => {
  beforeEach(() => {
    inMemoryAnswersCommentsRepository = new InMemoryCommentAnswerRepository()
    sut = new FetchAnswerCommentsUseCase(inMemoryAnswersCommentsRepository)
  })

  it('should be able to fetch recent answers', async () => {
    await inMemoryAnswersCommentsRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityId('answer-1'),
      }),
    )
    await inMemoryAnswersCommentsRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityId('answer-1'),
      }),
    )
    await inMemoryAnswersCommentsRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityId('answer-1'),
      }),
    )

    const result = await sut.execute({
      answerId: 'answer-1',
      page: 1,
    })

    expect(result.value?.answerComments).toHaveLength(3)
  })

  it('should be able to fetch paginated answer comments', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswersCommentsRepository.create(
        makeAnswerComment({
          answerId: new UniqueEntityId('answer-1'),
        }),
      )
    }

    const result = await sut.execute({
      answerId: 'answer-1',
      page: 2,
    })

    expect(result.value?.answerComments).toHaveLength(2)
  })
})
