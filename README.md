# Frontend da Gestão de Ativos

## Descrição

Este é o frontend desenvolvido para a aplicação de gestão de ativos financeiros. A interface permite aos usuários visualizar, adicionar, atualizar e deletar ativos financeiros. Além disso, exibe o somatório do valor alocado em todos os ativos.

## Funcionalidades

- **Visualizar Ativos**: Exibe uma tabela com a lista de ativos financeiros.
- **Adicionar Ativo**: Formulário para adicionar um novo ativo à lista.
- **Atualizar Ativo**: Editar a quantidade de um ativo existente.
- **Deletar Ativo**: Remover um ativo da lista.
- **Total Alocado**: Exibe o somatório do valor alocado em todos os ativos.

## Tecnologias Utilizadas

- HTML
- CSS (Bootstrap)
- JavaScript (jQuery)
- Docker

## Pré-requisitos

- Docker instalado
- Backend da API de Gestão de Ativos em execução (veja o [README do backend](https://github.com/FelipyPenhaBotega/MVP_gestao_ativos_backend.git))

## Configuração e Execução

1. Clone o repositório para sua máquina local:
    ```sh
    git clone https://github.com/FelipyPenhaBotega/MVP_gestao_ativos_frontend.git
    cd MVP_gestao_ativos_frontend
    ```

2. Construa a imagem Docker:
    ```sh
    docker build -t frontend .
    ```

3. Execute o contêiner Docker:
    ```sh
    docker run -p 8080:80 -it frontend
    ```

4. Acesse a aplicação no navegador:
    ```
    http://localhost:8080
    ```

## Estrutura do Projeto

- **public/index.html**: Arquivo principal HTML que contém a estrutura da página.
- **src/css/styles.css**: Arquivo CSS para estilização adicional.
- **src/js/app.js**: Arquivo JavaScript que contém a lógica para manipulação do DOM e interação com a API.

## Exemplos de Uso

### Visualizar Ativos

A tabela na página inicial exibe todos os ativos cadastrados, com suas respectivas quantidades e valores. O somatório do valor alocado em todos os ativos é exibido na parte inferior esquerda da tabela.

### Adicionar Ativo

Preencha o formulário com o nome do ativo e a quantidade, e clique em "Salvar". O novo ativo será adicionado à tabela com o valor coletado no momento através da API Alphavantage.

### Atualizar Ativo

Clique no botão "Editar" ao lado do ativo que deseja atualizar. O formulário será preenchido com os dados do ativo selecionado. Após fazer as alterações desejadas, clique em "Salvar".

### Deletar Ativo

Clique no botão "Deletar" ao lado do ativo que deseja remover. O ativo será removido da tabela.

## Exemplo de Requisições

As interações com a API do backend são feitas através de chamadas AJAX no arquivo `app.js`. Abaixo estão exemplos de como essas requisições são realizadas:

### Obter a Lista de Ativos

```javascript
$.get('http://localhost:5000/ativos', function(data) {
    // Manipulação dos dados recebidos
});
