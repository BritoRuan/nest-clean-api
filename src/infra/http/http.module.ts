import { Module } from '@nestjs/common'
import { AuthenticateStudentUseCase } from '@/domain/forum/application/useCases/student/authenticateStudentUseCase/authenticateStudentUseCase'
import { DatabaseModule } from '../database/database.module'
import { CreateAccountController } from './controllers/accountControllers/create-account.controller'
import { AuthenticateController } from './controllers/authenticateControllers/authenticate.controller'
import { CreateQuestionController } from './controllers/questionControllers/create-question.controller'
import { FetchRecentQuestionsController } from './controllers/questionControllers/fetch-recent-questions.controller'
import { RegisterStudentUseCase } from '@/domain/forum/application/useCases/student/registerStudentUseCase/registerStudentUseCase'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { CreateQuestionUseCase } from '@/domain/forum/application/useCases/question/createQuestionUseCase/createQuestionUseCase'
import { FetchRecentQuestionsUseCase } from '@/domain/forum/application/useCases/question/fetchRecentQuestionsUseCase/fetchRecentQuestionsUseCase'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
    FetchRecentQuestionsController,
  ],
  providers: [
    CreateQuestionUseCase,
    FetchRecentQuestionsUseCase,
    RegisterStudentUseCase,
    AuthenticateStudentUseCase,
  ],
})
export class HttpModule {}
