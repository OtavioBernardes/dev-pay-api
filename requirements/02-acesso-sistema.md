# Acesso a plataforma bancaria

Como cliente gostaria de acessar a plataforma usando minhas credenciais de usuario e senha.

> ## Caso de sucesso

1. ✅ Recebe uma requisição do tipo **POST** na rota **/api/user/login**
2. ✅ Valida dados obrigatórios **user** e **password**
3. ✅ **Gera** um token de acesso para o login
4. ✅ Retorna **200**, com dados

> ## Exceções

1. ✅ Retorna erro **400** se o usuario e senha forem invalidos.