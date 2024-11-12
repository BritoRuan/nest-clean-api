import { InMemoryAnswerRepository } from 'test/repositories/InMemoryRepository/InMemoryAnswersRepository/InMemoryAnswersRepository'
import { InMemoryAnswerAttachmentRepository } from 'test/repositories/InMemoryRepository/InMemoryAnswerAttachmentsRepository/InMemoryAnswerAttachmentsRepository'
import { InMemoryQuestionsRepository } from 'test/repositories/InMemoryRepository/InMemoryQuestionsRepository/InMemoryQuestionsRepository'
import { InMemoryQuestionAttachmentRepository } from 'test/repositories/InMemoryRepository/InMemoryQuestionAttachmentsRepository/InMemoryQuestionAttachmentsRepository'
import { SendNotificationUseCase } from '../../usesCases/sendNotificationUseCase/sendNotificationUseCase'
import { InMemoryNotificationsRepository } from 'test/repositories/InMemoryRepository/InMemoryNotificationsRepository/InMemoryNotificationsRepository'
import { makeQuestion } from 'test/factories/makeQuestion'
import { makeAnswer } from 'test/factories/makeAnswer'
import { OnAnswerCreated } from './onAnswerCreated'

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentRepository
let inMemoryAnswerRepository: InMemoryAnswerRepository
let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let sendNotificationUseCase: SendNotificationUseCase

describe('On Answer Created', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
    )
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentRepository()
    inMemoryAnswerRepository = new InMemoryAnswerRepository(
      inMemoryAnswerAttachmentsRepository,
    )
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
    sendNotificationUseCase = new SendNotificationUseCase(
      inMemoryNotificationsRepository,
    )

    vi.spyOn(sendNotificationUseCase, 'execute')

    new OnAnswerCreated(inMemoryQuestionsRepository, sendNotificationUseCase)
  })

  it('should send a notification when an answer is created', () => {
    const question = makeQuestion()
    const answer = makeAnswer({ questionId: question.id })

    inMemoryQuestionsRepository.create(question)
    inMemoryAnswerRepository.create(answer)
  })
})
