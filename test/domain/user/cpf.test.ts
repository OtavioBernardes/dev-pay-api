import { Cpf } from "../../../src/domain/user"

test('Não deve criar o object value cpf, pois não possui 11 digitos', () => {
    const cpf = Cpf.create('1111111')
    expect(cpf).toBe(undefined)
})

test('Deve criar o cpf pois possui 11 digitos', () => {
    const cpf = Cpf.create('11111111111')
    expect(cpf.cpf).toBe('11111111111')
})