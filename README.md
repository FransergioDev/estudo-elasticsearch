
# Estudo-elasticsearch

Estudo da ferramenta Elasticsearch.
Realizando registros de logs e requisição/busca de logs via aplicação.
Utilização do Kibana para visualização de dados de forma visual.
Utilização do framework Fastify, para criação da aplicação/servidor.




## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`ELASTIC_PASSWORD`

`KIBANA_PASSWORD`

`STACK_VERSION`

`MEM_LIMIT`

`ELASTIC_USER`

`ELASTIC_HOST`


## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/FransergioDev/estudo-elasticsearch
```

Entre no diretório do projeto

```bash
  cd estudo-elasticsearch
```

Instale as dependências

```bash
  npm install
```

Crie um arquivo .env, utilize o exemplo .env.example para criar e atribuir valores as variáveis necessárias, para o .env


Instale o docker e docker compose caso não tenha instalado.
Rode o arquivo docker-compose para criar as instâncias de Elasticsearch e Kibana necessárias, utilizando o arquivo .env

```bash
docker compose --env-file .env up -d
```

Acesse:

Elasticsearch: http://localhost:9200

Kibana: http://localhost:5601


Inicie o servidor

```bash
  npm run start
```


## Stack utilizada

**API:**  Node, Fastify, Axios

**Outros:** ElasticSearch, Kibana, Docker 


## Autor

- [@FransergioDev](https://github.com/FransergioDev)

