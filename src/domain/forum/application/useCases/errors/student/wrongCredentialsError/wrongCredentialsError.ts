import { UseCaseError } from '@/core/errors/UseCaseError/UseCaseError'

export class WrongCredentialsError extends Error implements UseCaseError {
  constructor() {
    super('Credentials are not valid.')
  }
}
