import { ResourceNotFoundError } from '@/core/errors/errors/ResourceNotFoundError/ResourceNotFoundError'
import { AnswerAttachmentList } from '@/domain/forum/enterprise/entities/answerAttachmentList'
import { AnswerAttachmentsRepository } from '../../../repositories/contracts/answerAttachmentsRepository'
import { NotAllowedError } from '@/core/errors/errors/NotAllowedError/NotAllowedError'
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answerAttachment'
import { AnswersRepository } from '../../../repositories/contracts/answersRepository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'
import { UniqueEntityId } from '@/core/entities/uniqueEntityId'
import { Either, left, right } from '@/core/either/either'

interface EditAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
  attachmentsIds: string[]
}

type EditAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    answer: Answer
  }
>

export class EditAnswerUseCase {
  constructor(
    private answerAttachmentsRepository: AnswerAttachmentsRepository,
    private answersRepository: AnswersRepository,
  ) {}

  async execute({
    authorId,
    answerId,
    content,
    attachmentsIds,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowedError())
    }
    const currentAnswerAttachments =
      await this.answerAttachmentsRepository.findManyByAnswerId(answerId)

    const answerAttachmentList = new AnswerAttachmentList(
      currentAnswerAttachments,
    )

    const answerAttachments = attachmentsIds.map((attachmentId) => {
      return AnswerAttachment.create({
        attachmentId: new UniqueEntityId(attachmentId),
        answerId: answer.id,
      })
    })

    answerAttachmentList.update(answerAttachments)

    answer.attachments = answerAttachmentList
    answer.content = content

    await this.answersRepository.save(answer)

    return right({
      answer,
    })
  }
}
