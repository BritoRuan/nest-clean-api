import { CreateAccountController } from './controllers/accountControllers/create-account.controller'
import { AuthenticateController } from './controllers/authenticateControllers/authenticate.controller'
import { CreateQuestionController } from './controllers/questionControllers/create-question.controller'
import { PrismaService } from './prisma/prisma.service'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { Module } from '@nestjs/common'
import { envSchema } from './env'
import { FetchRecentQuestionsController } from './controllers/questionControllers/fetch-recent-questions.controller'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
  ],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
    FetchRecentQuestionsController,
  ],
  providers: [PrismaService],
})
export class AppModule {}
