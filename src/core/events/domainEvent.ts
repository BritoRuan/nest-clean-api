import { UniqueEntityId } from '../entities/uniqueEntityId'

export interface DomainEvent {
  ocurredAt: Date
  getAggregateId(): UniqueEntityId
}
