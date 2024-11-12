import { InMemoryAnswerRepository } from 'test/repositories/InMemoryRepository/InMemoryAnswersRepository/InMemoryAnswersRepository'
import { InMemoryAnswerAttachmentRepository } from 'test/repositories/InMemoryRepository/InMemoryAnswerAttachmentsRepository/InMemoryAnswerAttachmentsRepository'
import { InMemoryQuestionsRepository } from 'test/repositories/InMemoryRepository/InMemoryQuestionsRepository/InMemoryQuestionsRepository'
import { InMemoryQuestionAttachmentRepository } from 'test/repositories/InMemoryRepository/InMemoryQuestionAttachmentsRepository/InMemoryQuestionAttachmentsRepository'
import { SendNotificationUseCase } from '../../usesCases/sendNotificationUseCase/sendNotificationUseCase'
import { InMemoryNotificationsRepository } from 'test/repositories/InMemoryRepository/InMemoryNotificationsRepository/InMemoryNotificationsRepository'
import { OnQuestionBestAnswerChosen } from './onQuestionBestAnswerChosen'
import { makeQuestion } from 'test/factories/makeQuestion'
import { makeAnswer } from 'test/factories/makeAnswer'

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentRepository
let inMemoryAnswerRepository: InMemoryAnswerRepository
let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let sendNotificationUseCase: SendNotificationUseCase

describe('On Question Best Answer Chosen', () => {
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

    new OnQuestionBestAnswerChosen(
      inMemoryAnswerRepository,
      sendNotificationUseCase,
    )
  })

  it('should send a notification when an question has best answer chosen', () => {
    const question = makeQuestion()
    const answer = makeAnswer({ questionId: question.id })

    inMemoryQuestionsRepository.create(question)
    inMemoryAnswerRepository.create(answer)

    question.bestAnswerId = answer.id

    inMemoryQuestionsRepository.save(question)
  })
})
