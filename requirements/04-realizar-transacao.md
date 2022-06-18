# Realizar uma transfêrencia de recursos entre contas

Como cliente, gostaria de realizar e receber transferências de recursos na minha conta.

> ## Caso de sucesso

1. ✅ Recebe uma requisição do tipo **POST** na rota **/api/**
2. ✅ Valida o token de acesso do usuário.
3. ✅ Valida se o usuário de origem possui saldo
4. ✅ Valida se o usuário de destino é valido
5. ✅ A operação de transferência deve ser uma transação o (ou seja, revertida em qualquer caso de inconsistência) e o dinheiro deve voltar para a carteira do usuário que envia.
6. ✅ Retorna **200**.

> ## Exceções

1. ✅ Retorna o erro **403** caso o token não seja valido.
2. ✅ Retorna o erro **400** caso o usuário de destino seja invalido.
3. ✅ Retorna o erro **400** caso o usuário de origem não possua saldo.