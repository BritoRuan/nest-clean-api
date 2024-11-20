import { Either, left, right } from '@/core/either/either'
import { Injectable } from '@nestjs/common'
import { StudentsRepository } from '../../../repositories/contracts/studentsRepository'
import { HasherComparer } from '../../../cryptography/contracts/hashComparer'
import { Encrypter } from '../../../cryptography/contracts/encrypter'
import { WrongCredentialsError } from '../../errors/student/wrongCredentialsError/wrongCredentialsError'

interface AuthenticateStudentUseCaseRequest {
  email: string
  password: string
}

type AuthenticateStudentUseCaseResponse = Either<
  WrongCredentialsError,
  {
    accessToken: string
  }
>
@Injectable()
export class AuthenticateStudentUseCase {
  constructor(
    private studentsRepository: StudentsRepository,
    private hashComparer: HasherComparer,
    private encrypter: Encrypter,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateStudentUseCaseRequest): Promise<AuthenticateStudentUseCaseResponse> {
    const student = await this.studentsRepository.findByEmail(email)

    if (!student) {
      return left(new WrongCredentialsError())
    }

    const isPasswordValid = await this.hashComparer.compare(
      password,
      student.password,
    )

    if (!isPasswordValid) {
      throw new WrongCredentialsError()
    }

    const accessToken = await this.encrypter.encrypt({
      sub: student.id.toString(),
    })

    return right({
      accessToken,
    })
  }
}
