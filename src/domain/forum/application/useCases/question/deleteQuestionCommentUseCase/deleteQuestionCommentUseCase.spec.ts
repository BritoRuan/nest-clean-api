import { InMemoryCommentQuestionRepository } from 'test/repositories/InMemoryRepository/InMemoryQuestionCommentsRepository/InMemoryQuestionCommentsRepository'
import { NotAllowedError } from '@/core/errors/errors/NotAllowedError/NotAllowedError'
import { DeleteQuestionCommentUseCase } from './deleteQuestionCommentUseCase'
import { makeQuestionComment } from 'test/factories/makeQuestionComment'
import { UniqueEntityId } from '@/core/entities/uniqueEntityId'

let inMemoryQuestionCommentsRepository: InMemoryCommentQuestionRepository
let sut: DeleteQuestionCommentUseCase

describe('Delete Question Comment', () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository = new InMemoryCommentQuestionRepository()
    sut = new DeleteQuestionCommentUseCase(inMemoryQuestionCommentsRepository)
  })

  it('should be able to delete a question comment', async () => {
    const questionComment = makeQuestionComment()

    await inMemoryQuestionCommentsRepository.create(questionComment)

    await sut.execute({
      questionCommentId: questionComment.id.toString(),
      authorId: questionComment.authorId.toString(),
    })

    expect(inMemoryQuestionCommentsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete another user question comment', async () => {
    const questionComment = makeQuestionComment({
      authorId: new UniqueEntityId('author-1'),
    })

    await inMemoryQuestionCommentsRepository.create(questionComment)

    const result = await sut.execute({
      questionCommentId: questionComment.id.toString(),
      authorId: 'author-2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
