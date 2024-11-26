import { hash, compare } from 'bcryptjs'

import { HasherComparer } from '@/domain/forum/application/cryptography/contracts/hashComparer'
import { HashGenerator } from '@/domain/forum/application/cryptography/contracts/hashGenerator'

export class BcryptHasher implements HashGenerator, HasherComparer {
  private HASH_SALT_LENGTH = 8

  hash(plain: string): Promise<string> {
    return hash(plain, this.HASH_SALT_LENGTH)
  }

  compare(plain: string, hash: string): Promise<boolean> {
    return compare(plain, hash)
  }
}
