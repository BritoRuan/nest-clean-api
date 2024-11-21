import { HasherComparer } from '@/domain/forum/application/cryptography/contracts/hashComparer'
import { HashGenerator } from '@/domain/forum/application/cryptography/contracts/hashGenerator'

export class FakeHasher implements HashGenerator, HasherComparer {
  async hash(plain: string): Promise<string> {
    return plain.concat('-hashed')
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    return plain.concat('-hashed') === hash
  }
}
