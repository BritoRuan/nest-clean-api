import { UseCaseError } from '@/core/errors/UseCaseError/UseCaseError'

export class ResourceNotFoundError extends Error implements UseCaseError {
  constructor() {
    super('Resource not found')
  }
}
