import { Either, left, right } from '@/core/either/either'
import { Injectable } from '@nestjs/common'
import { Student } from '@/domain/forum/enterprise/entities/student'
import { StudentsRepository } from '../../../repositories/contracts/studentsRepository'
import { HashGenerator } from '../../../cryptography/contracts/hashGenerator'
import { StudentAlreadyExistsError } from '../../errors/student/studentAlreadyExistsError/studentAlreadyExistsError'

interface RegisterStudentUseCaseRequest {
  name: string
  email: string
  password: string
}

type RegisterStudentUseCaseResponse = Either<
  StudentAlreadyExistsError,
  {
    student: Student
  }
>
@Injectable()
export class RegisterStudentUseCase {
  constructor(
    private studentsRepository: StudentsRepository,
    private hashGenerater: HashGenerator,
  ) {}

  async execute({
    name,
    email,
    password,
  }: RegisterStudentUseCaseRequest): Promise<RegisterStudentUseCaseResponse> {
    const studentWithSameEmail =
      await this.studentsRepository.findByEmail(email)

    if (studentWithSameEmail) {
      return left(new StudentAlreadyExistsError(email))
    }

    const hashedPassword = await this.hashGenerater.hash(password)

    const student = Student.create({
      name,
      email,
      password: hashedPassword,
    })

    await this.studentsRepository.create(student)

    return right({
      student,
    })
  }
}
