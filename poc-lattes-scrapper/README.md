## Instalação

#

### #1 - Clone esse repositório

### #2 - Instale nodejs na sua máquina

💡 utilize a ferramenta [asdf](https://asdf-vm.com/) para fazer a instalação com as versões disponíveis no arquivo `.tool-version`.

### #3 - Instale as dependências do projeto

- `npm install`

### #4 - Instale [docker](https://docs.docker.com/engine/install/) e [docker-compose](https://docs.docker.com/compose/install/)

### #5 - Crie uma imagem postgress com o docker-cli

- `docker run --name cred-doc-db -e POSTGRES_PASSWORD=12345 -p 5432:5432 -d postgres`
- O comando acima irá criar um container de nome cred-doc-db postgres com o usuário `postgres` e senha `12345` na porta 5432
- Verifique se o processo do container está rodando com `docker ps`
- Caso o passo anterior não retorne nada, utilize `docker start cred-doc-db` para levantar o serviço postgres

🔨 utilize o [DBeaver](https://dbeaver.io/download/) para se conectar ao postgres e poder ver os dados e diagrama ER.

🔨 como o DBeaver tem uma inicialização lenta o [Beekeeper](https://www.beekeeperstudio.io/) pode ser utilizado apesar de não fornecer diagrama ER

### #6 Crie um banco de dados

- Usando SQL crie um banco de dados com o mesmo nome listado do arquivo `data-source.ts`

### #7 Criando e semeando tabelas

- Esse repositório utiliza o ORM [TypeORM](https://typeorm.io/). Além de permitir a execução de querys pela aplicação, ele permite o versionamento das alterações do banco por meio da criação e execução de migrations. Por isso, o uso de QUERYS SQL para alterações **NÃO É RECOMENDADO** para garantir a sincronia entre o banco local e o de produção.

- Para executar as migrations utilize o script `npm run migration:run`, outros scripts também estão disponíveis no arquivo `package.json`.

- Certifique se as tabelas foram criadas.

- 🤔 O arquivo `typeorm/migrations` contém a implementação de todas as migrations executadas, caso fique com dúvida do que foi gerado basta consultar a implementação dos métodos `up`

### #8 Executando servidor da aplicação

- Existem 2 formas de levantar o servidor utilizadas para o desenvolvimento e produção.

- Utilize o script `npm run dev:server` para executar em ambiente de desenvolvimento, o script irá executar direto via typescript e possuí hot reload, assim mudanças executadas não precisaram reiniciar o servidor da aplicação.

- Utilize o script `npm run prod:server` para executar em produção, como o node não executa typescript por padrão será necessário transpirar o código primeiro utilizando `npm run build`.

- Após utilizar o comando de execução as mensagens `🗂️ Db connected!` e `🚀 Running app on ...` são um log indicando que tudo ocorreu bem.
