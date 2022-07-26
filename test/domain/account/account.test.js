"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var account_1 = require("../../../src/domain/entity/account/account");
var user_1 = require("../../../src/domain/entity/user");
var user = user_1.User.create({
    name: 'Otávio Bernardes',
    password: 'teste01',
    email: 'teste01@gmail.com',
    cpf: '11111111111'
});
test('Deve criar uma conta com saldo zerado', function () {
    var account = account_1.Account.create(user).value;
    expect(account.getBalance()).toBe(0);
});
test('Deve creditar 100 reais em uma conta', function () {
    var account = account_1.Account.create(user).value;
    account.credit(100);
    expect(account.getBalance()).toBe(100);
});
test('Não deve ser possivel creditar um valor negativo na conta', function () {
    var account = account_1.Account.create(user).value;
    account.credit(-100);
    expect(account.getBalance()).toBe(0);
});
test('Deve debitar um valor na conta', function () {
    var account = account_1.Account.create(user).value;
    account.credit(100);
    account.debit(50);
    expect(account.getBalance()).toBe(50);
});
test('Não deve debitar um valor negativo na conta', function () {
    var account = account_1.Account.create(user).value;
    account.credit(100);
    account.debit(-50);
    expect(account.getBalance()).toBe(100);
});
