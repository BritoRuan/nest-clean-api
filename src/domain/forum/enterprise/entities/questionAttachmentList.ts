import { WatchedList } from '@/core/entities/watchedList/watchedList'
import { QuestionAttachment } from './questionAttachment'

export class QuestionAttachmentList extends WatchedList<QuestionAttachment> {
  compareItems(a: QuestionAttachment, b: QuestionAttachment): boolean {
    return a.attachmentId.equals(b.attachmentId)
  }
}
