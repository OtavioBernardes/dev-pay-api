"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt_adapter_1 = require("../../../src/external/cryptography/bcrypt-adapter");
var account_repository_in_memory_1 = require("../../../src/external/database/inMemory/account-repository-in-memory");
var user_repository_in_memory_1 = require("../../../src/external/database/inMemory/user-repository-in-memory");
var new_account_1 = require("../../../src/use-cases/new-account");
var input = {
    name: 'Otávio Bernardes',
    cpf: '11111111111',
    email: 'test@test.com',
    password: 'password0123'
};
var Output = {
    name: 'Otávio Bernardes',
    cpf: '11111111111',
    email: 'test@test.com',
};
describe('UseCase: New Account', function () {
    var inMemoryDatabaseRepositoryUser = new user_repository_in_memory_1.UserRepositoryInMemory();
    var inMemoryDatabaseAccount = new account_repository_in_memory_1.AccountRepositoryInMemory();
    var hasher = new bcrypt_adapter_1.BcryptAdapter(8);
    var usecase = new new_account_1.NewAccount(inMemoryDatabaseRepositoryUser, inMemoryDatabaseAccount, hasher);
    it('Deve criar um usuário e uma conta na plataforma', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result, _a, account_id, data;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, usecase.execute(input)];
                case 1:
                    result = _b.sent();
                    _a = result.value, account_id = _a.account_id, data = __rest(_a, ["account_id"]);
                    expect(typeof account_id).toEqual('number');
                    expect(data).toEqual(Output);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Deve retornar um exception pois o usuário já está cadastrado', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, usecase.execute(input)];
                case 1:
                    result = _a.sent();
                    expect(result.isLeft()).toEqual(true);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Deve retornar uma expection pois o cpf do usuário é invalido', function () { return __awaiter(void 0, void 0, void 0, function () {
        var usecase, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    usecase = new new_account_1.NewAccount(inMemoryDatabaseRepositoryUser, inMemoryDatabaseAccount, hasher);
                    return [4 /*yield*/, usecase.execute({
                            name: 'Otávio Bernardes',
                            cpf: '111111111',
                            email: 'test@test.com',
                            password: 'password0123'
                        })];
                case 1:
                    result = _a.sent();
                    expect(result.isLeft()).toEqual(true);
                    expect(result.value).toEqual('Invalid cpf');
                    return [2 /*return*/];
            }
        });
    }); });
});