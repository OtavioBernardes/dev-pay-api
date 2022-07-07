import { Encrypter, Decrypter } from '../../use-cases/ports'
import jwt from 'jsonwebtoken'

export class JsonwebtokenAdapter implements Encrypter, Decrypter {

    constructor(private readonly secret: string) { }

    async encrypt(plaintext: string): Promise<string> {
        return jwt.sign({ id: plaintext }, this.secret)
    }

    async decrypt(ciphertext: string): Promise<string> {
        return jwt.verify(ciphertext, this.secret) as any
    }
}