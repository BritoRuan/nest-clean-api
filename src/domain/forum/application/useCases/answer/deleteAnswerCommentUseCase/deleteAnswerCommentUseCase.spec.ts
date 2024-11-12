import { InMemoryCommentAnswerRepository } from 'test/repositories/InMemoryRepository/InMemoryAnswerCommentsRepository/InMemoryAnswerCommentsRepository'
import { NotAllowedError } from '@/core/errors/errors/NotAllowedError/NotAllowedError'
import { DeleteAnswerCommentUseCase } from './deleteAnswerCommentUseCase'
import { makeAnswerComment } from 'test/factories/makeAnswerComments'
import { UniqueEntityId } from '@/core/entities/uniqueEntityId'

let inMemoryAnswerCommentsRepository: InMemoryCommentAnswerRepository
let sut: DeleteAnswerCommentUseCase

describe('Delete Answer Comment', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryCommentAnswerRepository()
    sut = new DeleteAnswerCommentUseCase(inMemoryAnswerCommentsRepository)
  })

  it('should be able to delete a answer comment', async () => {
    const answerComment = makeAnswerComment()

    await inMemoryAnswerCommentsRepository.create(answerComment)

    await sut.execute({
      answerCommentId: answerComment.id.toString(),
      authorId: answerComment.authorId.toString(),
    })

    expect(inMemoryAnswerCommentsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete another user answer comment', async () => {
    const answerComment = makeAnswerComment({
      authorId: new UniqueEntityId('author-1'),
    })

    await inMemoryAnswerCommentsRepository.create(answerComment)

    const result = await sut.execute({
      answerCommentId: answerComment.id.toString(),
      authorId: 'author-2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
