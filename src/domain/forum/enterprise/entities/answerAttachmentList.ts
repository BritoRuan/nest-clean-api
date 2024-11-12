import { WatchedList } from '@/core/entities/watchedList/watchedList'
import { AnswerAttachment } from './answerAttachment'

export class AnswerAttachmentList extends WatchedList<AnswerAttachment> {
  compareItems(a: AnswerAttachment, b: AnswerAttachment): boolean {
    return a.attachmentId.equals(b.attachmentId)
  }
}
