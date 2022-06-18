# Cadastrar um novo usuário na plataforma

Como cliente, gostaria de poder acessar a plataforma dev-pay e realizar a abertura da minha conta.

> ## Caso de sucesso

1. ✅ Recebe uma requisição do tipo **POST** na rota **/api/user**
2. ✅ Valida dados obrigatórios **name**, **email**, **password**, **cpf**.
3. ✅ **Cria** um usuário e uma conta para o novo investidor
4. ✅ Retorna **201**, com dados

> ## Exceções

1. ✅ Retorna erro **400** se não houver algum dos campos citado acima. 
2. ✅ Retorna erro **409** se o investidor já possuir uma conta naquele email\cpf.