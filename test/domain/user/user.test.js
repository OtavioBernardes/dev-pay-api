"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = require("../../../src/domain/entity/user");
test('Não deve criar um usuario pois o e-mail é invalido', function () {
    var user = user_1.User.create({
        name: 'Otávio Bernardes',
        email: 'testegmail.com',
        password: 'password0123',
        cpf: '11834997654'
    });
    expect(user.isLeft()).toBe(true);
});
test('Não deve criar um usuario pois o cpf é invalido', function () {
    var user = user_1.User.create({
        name: 'Otávio Bernardes',
        email: 'testegmail.com',
        password: 'password0123',
        cpf: '11834997654'
    });
    expect(user.isLeft()).toBe(true);
});
test('Deve criar um usuario', function () {
    var data = {
        name: 'Otávio Bernardes',
        email: 'teste@gmail.com',
        password: 'password0123',
        cpf: '11834997654'
    };
    var user = user_1.User.create(data);
    expect(user.value).toEqual(data);
});
