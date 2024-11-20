import { UseCaseError } from '@/core/errors/UseCaseError/UseCaseError'

export class StudentAlreadyExistsError extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(`Student "${identifier}" already exists.`)
  }
}
