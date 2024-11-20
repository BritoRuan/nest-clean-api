import { Notification } from '@/domain/notification/enterprise/entitites/notification'

export abstract class NotificationRepository {
  abstract findById(id: string): Promise<Notification | null>
  abstract create(notification: Notification): Promise<void>
  abstract save(notification: Notification): Promise<void>
}
