"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var value_object_1 = require("../../../src/domain/entity/user/value-object");
test('Não deve criar o object value cpf, pois não possui 11 digitos', function () {
    var cpf = value_object_1.Cpf.create('1111111');
    expect(cpf.isLeft()).toBe(true);
});
test('Deve criar o cpf pois possui 11 digitos', function () {
    var cpf = value_object_1.Cpf.create('11111111111');
    expect(cpf.isRight()).toBe(true);
});
