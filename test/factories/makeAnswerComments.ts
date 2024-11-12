import { AnswerComment } from '@/domain/forum/enterprise/entities/answerComment'
import { UniqueEntityId } from '@/core/entities/uniqueEntityId'
import { faker } from '@faker-js/faker'

export function makeAnswerComment(
  override: Partial<AnswerComment> = {},
  id?: UniqueEntityId,
) {
  const answerComment = AnswerComment.create(
    {
      authorId: new UniqueEntityId(),
      answerId: new UniqueEntityId(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return answerComment
}
