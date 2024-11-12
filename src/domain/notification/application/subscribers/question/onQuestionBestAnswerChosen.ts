import { QuestionBestAnswerChosenEvent } from '@/domain/forum/enterprise/events/questionBestAnswerChosenEvent'
import { SendNotificationUseCase } from '../../usesCases/sendNotificationUseCase/sendNotificationUseCase'
import { IAnswerRepository } from '@/domain/forum/application/repositories/contracts/answersRepository'
import { DomainEvents } from '@/core/events/domainEvents'
import { EventHandler } from '@/core/events/eventHandler'

export class OnQuestionBestAnswerChosen implements EventHandler {
  constructor(
    private answersRepository: IAnswerRepository,
    private sendNotification: SendNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendQuestionBestAnswerNotification.bind(this),
      QuestionBestAnswerChosenEvent.name,
    )
  }

  private async sendQuestionBestAnswerNotification({
    question,
    bestAnswerId,
  }: QuestionBestAnswerChosenEvent) {
    const answer = await this.answersRepository.findById(
      bestAnswerId.toString(),
    )
    if (answer) {
      await this.sendNotification.execute({
        recipientId: answer.authorId.toString(),
        title: `Sua resposta foi escolhida!`,
        content: `A resposta que você enviou em "${question.title.substring(0, 20)} foi escolhida pelo autor!"`,
      })
    }
  }
}
