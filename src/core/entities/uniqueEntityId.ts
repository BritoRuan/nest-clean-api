import { randomUUID } from 'node:crypto'

export class UniqueEntityId {
  private value: string

  constructor(value?: string) {
    this.value = value ?? randomUUID()
  }

  toString() {
    return this.value
  }

  toValue() {
    return this.value
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  equals(id: UniqueEntityId) {
    return id.toValue() === this.value
  }
}
