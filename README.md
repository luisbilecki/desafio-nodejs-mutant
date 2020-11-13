# Backend Node JS - Mutant

O Desafio foi desenvolvido utilizando Node.JS, Express e Typescript.

O SGBDR solicitado foi o MySQL e utilizei o TypeORM como biblioteca ORM.

A API desenvolvida está documentada com o Swagger.

## Requerimentos

- Docker;
- Docker Compose.


## Como rodar?

1. Você deve estar na pasta do projeto.

2. Copie o arquivo de exemplo das variáveis de ambiente e edite se necessário.

```
  cp .env.example .env
```

3. Inicialize o docker-compose:

```
  docker-compose up --build
```

4. Nas próximas execuções somente é necessário rodar:

```
  docker-compose up
```

Obs.: No primeiro uso é normal demorar, pois é feito o download das imagens necessárias e o container é configurado.

5. Para parar a execução da API, pressione CTRL+C ou CTRL+D.

6. Crie os schemas do BD usando os comandos abaixo:

```
  docker exec -it mutant-db mysql -u root -pHRrUdp9f -e "CREATE SCHEMA mutant_development"
```

```
  docker exec -it mutant-db mysql -u root -pHRrUdp9f -e "CREATE SCHEMA mutant_test"
```

_Atenção_: Para rodar o comando acima é necessário que os containers estejam rodando (passo 4)

7. Após criar os schemas, reinicie os containers usando:

```
  docker-compose stop
```
```
  docker-compose start
```

8. Para rodar os testes utilize:


```
  docker exec -it mutant-api npm run test
```

9. Para acessar a documentação do swagger, abra a URL abaixo no seu navegador:

```
  localhost:8000/docs
```

## Comentários sobre decisões e ideias de trabalhos futuros

- Optei por utilizar um relacionamento 1 para 1 entre `User` e `Address` e `User` e `Company`. Entre `User` e `Company` poderiamos ter 1:N, porém com os dados fornecidos não houve uma forma de identificar unicamente (e.g. CNPJ) uma `Company`;

- Não foi implementado nenhum tipo de restrição para a importação dos mesmos registros. O motivo é que na descrição do teste solicitou-se que os dados fossem salvos de forma ordenada pelo nome. Se mantivermos o valor de `id` do JSON como chave primaria, a ordenação seguirá o `id`;

- Talvez uma outra forma não seja inserir ordenado e sim criar uma `VIEW`  ou algum método na entidade que retorne os dados ordenados pelo `nome`;

- No endpoint `/users/export` poderá ser implementado um esquema de `cache` usando o Redis evitar consultas desnecessárias a API externa.
