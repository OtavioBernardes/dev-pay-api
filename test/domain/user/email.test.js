"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var value_object_1 = require("../../../src/domain/entity/user/value-object");
test('Não deve criar um e-mail', function () {
    var email = value_object_1.Email.create('otavio.teste.com');
    expect(email.isLeft()).toBe(true);
});
test('Deve criar um e-mail', function () {
    var email = value_object_1.Email.create('otavio@teste.com');
    expect(email.isRight()).toBe(true);
});
