import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { PrismaAnswersAttachmentsRepository } from './prisma/repositories/prisma-answer-attachments-repository'
import { PrismaAnswersCommentsRepository } from './prisma/repositories/prisma-answer-comments-repository'
import { PrismaAnswersRepository } from './prisma/repositories/prisma-answers-repository'
import { PrismaQuestionsRepository } from './prisma/repositories/prisma-questions-repository'
import { PrismaQuestionsCommentsRepository } from './prisma/repositories/prisma-question-comments-repository'
import { PrismaQuestionAttachmentsRepository } from './prisma/repositories/prisma-question-attachments-repository'
import { QuestionsRepository } from '@/domain/forum/application/repositories/contracts/questionsRepository'
import { StudentsRepository } from '@/domain/forum/application/repositories/contracts/studentsRepository'
import { PrismaStudentsRepository } from './prisma/repositories/prisma-students-repository'

@Module({
  providers: [
    PrismaService,

    {
      provide: QuestionsRepository,
      useClass: PrismaQuestionsRepository,
    },

    {
      provide: StudentsRepository,
      useClass: PrismaStudentsRepository,
    },

    PrismaAnswersRepository,
    PrismaAnswersCommentsRepository,
    PrismaAnswersAttachmentsRepository,
    PrismaQuestionsRepository,
    PrismaQuestionsCommentsRepository,
    PrismaQuestionAttachmentsRepository,
  ],
  exports: [
    PrismaService,
    QuestionsRepository,
    StudentsRepository,
    PrismaAnswersRepository,
    PrismaAnswersCommentsRepository,
    PrismaAnswersAttachmentsRepository,
    PrismaQuestionsRepository,
    PrismaQuestionsCommentsRepository,
    PrismaQuestionAttachmentsRepository,
  ],
})
export class DatabaseModule {}
