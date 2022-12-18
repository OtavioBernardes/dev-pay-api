# Visualizar saldo da conta

Como cliente gostaria de visualizar o dinheiro em caixa.
> ## Caso de sucesso

1. ✅ Recebe uma requisição do tipo **Get** na rota **/api/account/accountId/balance**
2. ✅ Retorna **200**, com o saldo da conta.

> ## Exceções

1. ✅ Retorna o **403** caso o token não seja valido.