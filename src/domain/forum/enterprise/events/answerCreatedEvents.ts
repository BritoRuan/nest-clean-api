import { UniqueEntityId } from '@/core/entities/uniqueEntityId'
import { DomainEvent } from '@/core/events/domainEvent'
import { Answer } from '../entities/answer'

export class AnswerCreatedEvents implements DomainEvent {
  public ocurredAt: Date
  public answer: Answer

  constructor(answer: Answer) {
    this.answer = answer
    this.ocurredAt = new Date()
  }

  getAggregateId(): UniqueEntityId {
    return this.answer.id
  }
}
