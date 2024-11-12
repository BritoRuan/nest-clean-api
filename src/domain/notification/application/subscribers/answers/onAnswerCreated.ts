import { SendNotificationUseCase } from '../../usesCases/sendNotificationUseCase/sendNotificationUseCase'
import { IQuestionRepository } from '@/domain/forum/application/repositories/contracts/questionsRepository'
import { AnswerCreatedEvents } from '@/domain/forum/enterprise/events/answerCreatedEvents'
import { DomainEvents } from '@/core/events/domainEvents'
import { EventHandler } from '@/core/events/eventHandler'

export class OnAnswerCreated implements EventHandler {
  constructor(
    private questionsRepository: IQuestionRepository,
    private sendNotification: SendNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNewAnswerNotification.bind(this),
      AnswerCreatedEvents.name,
    )
  }

  private async sendNewAnswerNotification({ answer }: AnswerCreatedEvents) {
    const question = await this.questionsRepository.findById(
      answer.questionId.toString(),
    )

    if (question) {
      await this.sendNotification.execute({
        recipientId: question.authorId.toString(),
        title: `Nova resposta em "${question.title.substring(0, 40).concat('...')}"`,
        content: answer.except,
      })
    }
  }
}
