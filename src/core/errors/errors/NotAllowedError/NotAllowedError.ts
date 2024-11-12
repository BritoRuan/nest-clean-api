import { UseCaseError } from '@/core/errors/UseCaseError/UseCaseError'

export class NotAllowedError extends Error implements UseCaseError {
  constructor() {
    super('Not allowed')
  }
}
