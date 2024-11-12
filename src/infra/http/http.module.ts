import { DatabaseModule } from '../database/database.module'
import { CreateAccountController } from './controllers/accountControllers/create-account.controller'
import { AuthenticateController } from './controllers/authenticateControllers/authenticate.controller'
import { CreateQuestionController } from './controllers/questionControllers/create-question.controller'
import { FetchRecentQuestionsController } from './controllers/questionControllers/fetch-recent-questions.controller'
import { Module } from '@nestjs/common'

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
    FetchRecentQuestionsController,
  ],
})
export class HttpModule {}
