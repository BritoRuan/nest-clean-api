import { AuthenticateStudentUseCase } from './authenticateStudentUseCase'
import { InMemoryStudentsRepository } from 'test/repositories/InMemoryRepository/inMemoryStudentsRepository/inMemoryStudentsRepository'
import { FakeHasher } from 'test/cryptography/fakeHasher'
import { FakeEncrypter } from 'test/cryptography/fakeEncrypter'
import { makeStudent } from 'test/factories/makeStudent'

let inMemoryStudentsRepository: InMemoryStudentsRepository
let fakeHasher: FakeHasher
let fakeEncrypter: FakeEncrypter

let sut: AuthenticateStudentUseCase

describe('Authenticate Student', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    fakeHasher = new FakeHasher()
    fakeEncrypter = new FakeEncrypter()
    sut = new AuthenticateStudentUseCase(
      inMemoryStudentsRepository,
      fakeHasher,
      fakeEncrypter,
    )
  })

  it('should be able to authenticate a student', async () => {
    const student = makeStudent({
      email: 'johndoe@example.com',
      password: await fakeHasher.hash('bolinha123456'),
    })

    inMemoryStudentsRepository.create(student)

    const result = await sut.execute({
      email: 'johndoe@example.com',
      password: 'bolinha123456',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    })
  })
})
