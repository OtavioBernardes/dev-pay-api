# Visualizar o histórico de transfêrencias.

Como cliente, gostaria de visualizar o historico de transferências.

> ## Caso de sucesso

1. ✅ Recebe uma requisição do tipo **Get** na rota **/api/**
2. ✅ Valida o token de acesso do usuário.
3. ✅ Valida se o usuário de origem possui saldo
4. ✅ Retorna **200**, com os dados.

> ## Exceções

1. ✅ Retorna o erro **403** caso o token não seja valido.
