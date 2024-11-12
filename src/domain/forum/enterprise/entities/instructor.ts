import { UniqueEntityId } from '@/core/entities/uniqueEntityId'
import { Entity } from '@/core/entities/entities'

interface InstructorProps {
  name: string
}

export class Instructor extends Entity<InstructorProps> {
  static create(props: InstructorProps, id?: UniqueEntityId) {
    const instructor = new Instructor(props, id)

    return instructor
  }
}
