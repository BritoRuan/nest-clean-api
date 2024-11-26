import { Module } from '@nestjs/common'
import { Encrypter } from '@/domain/forum/application/cryptography/contracts/encrypter'
import { HasherComparer } from '@/domain/forum/application/cryptography/contracts/hashComparer'
import { HashGenerator } from '@/domain/forum/application/cryptography/contracts/hashGenerator'
import { BcryptHasher } from './crypto/bcrypt-hasher'
import { JwtEncrypter } from './crypto/jwt-encrypter'

@Module({
  providers: [
    { provide: Encrypter, useClass: JwtEncrypter },
    { provide: HasherComparer, useClass: BcryptHasher },
    { provide: HashGenerator, useClass: BcryptHasher },
  ],
  exports: [Encrypter, HasherComparer, HashGenerator],
})
export class CryptographyModule {}
