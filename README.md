# Serverless - AWS Node.js Typescript

Projeto serverless para salvar e-mails em uma base dynamodb. 
Roda na AWS Lambda e utiliza dynamodb.

## Dependências

- `yarn` para instalar dependências

## Execução
- `docker-compose up -d` para rodar dynamodb local
- `yarn dev` para rodar offline

## Deploy
- `serverless deploy` para executar o deploy


## Requisição HTTP

### Exemplo request:
```js
// POST http://localhost:3000/dev/registerEmail
{
	"id": "ba0f37fa-80a9-11ec-a8a3-0242ac120002",
	"name": "Adriano",
	"email": "contato@a2dev.com.br"
}
```

### Exemplo resposta:
```js
{
  "message": "Email registered successfully!"
}
```

## Instruções execução e deploy

> **Requirements**: NodeJS `lts/fermium (v.14.18.1)`. If you're using [nvm](https://github.com/nvm-sh/nvm), run `nvm use` to ensure you're using the same Node version in local and in your lambda's runtime.
