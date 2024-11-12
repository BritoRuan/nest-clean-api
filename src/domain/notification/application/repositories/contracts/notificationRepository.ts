import { Notification } from '@/domain/notification/enterprise/entitites/notification'

export interface INotificationRepository {
  findById(id: string): Promise<Notification | null>
  create(notification: Notification): Promise<void>
  save(notification: Notification): Promise<void>
}
