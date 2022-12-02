import { Hasher } from '../../use-cases/ports'

export class FakeBcryptAdapter implements Hasher {
    constructor() { }

    async hash(plaintext: string): Promise<string> {
        return plaintext
    }

    async compare(plaintext: string, hash: string): Promise<boolean> {
        return plaintext === hash
    }
}