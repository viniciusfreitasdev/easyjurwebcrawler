# EasyJurWebCrawler

Um web crawler desenvolvido para extrair informações dos 10 primeiros filmes em cartaz no site **Rotten Tomatoes**, gerando resultados estruturados em JSON. Ideal para integração com aplicações que necessitam de dados atualizados sobre filmes em exibição.

---

## Objetivo

Este projeto tem como objetivo acessar a página de filmes em cartaz do [Rotten Tomatoes](https://www.rottentomatoes.com/browse/movies_in_theaters/), extrair os 10 primeiros filmes listados e retornar um JSON contendo detalhes como título, sinopse, data de lançamento (em formato ISO 8601), diretor, produtor e outras informações relevantes.

---

## Funcionalidades

- **Web Crawling Automatizado:** Acessa a página do Rotten Tomatoes e coleta dados em tempo real.
- **Extração de Dados Estruturados:** Captura informações como título, data de lançamento, sinopse, diretor, gênero e mais.
- **Formato Padronizado:** Retorna os dados em JSON, com datas no padrão ISO 8601.
- **API Simples:** Disponibiliza os resultados via endpoint HTTP para fácil integração.

---

## Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/easyjurwebcrawler.git
   cd easyjurwebcrawler
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor:**
   ```bash
   node index.js
   ```

---

## Como Usar

1. Após iniciar o servidor, acesse o endpoint via:
   ```
   http://localhost:3000/
   ```

2. A resposta será um JSON contendo os 10 primeiros filmes, por exemplo:
   ```json
   {
     "results": [
       {
         "title": "Duna: Parte Dois",
         "synopsis": "Uma jornada épica pelo deserto...",
         "director": "Denis Villeneuve",
         "releaseDate": "2024-03-01T00:00:00.000Z",
         "genre": "Action, Adventure",
         ...
       },
       ...
     ]
   }
   ```

---

## Estrutura do JSON

Cada filme inclui os seguintes campos:

| Campo               | Descrição                              | Exemplo                          |
|----------------------|----------------------------------------|----------------------------------|
| `title`              | Nome do filme                          | "Duna: Parte Dois"              |
| `synopsis`           | Sinopse do filme                       | "Uma jornada épica..."          |
| `releaseDate`        | Data de lançamento (ISO 8601)          | "2024-03-01T00:00:00.000Z"      |
| `director`           | Diretor(es) do filme                   | "Denis Villeneuve"              |
| `producer`           | Produtor(es)                           | "Mary Parent, Cale Boyter"      |
| `genre`              | Gênero(s)                              | "Action, Adventure"             |
| `runtime`            | Duração do filme                       | "2h 46m"                        |
| ...*(outros campos)* | ...                                    | ...                              |

---

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript.
- **Express**: Framework para criação da API.
- **Axios**: Cliente HTTP para fazer requisições às páginas.
- **Cheerio**: Biblioteca para análise e extração de dados HTML.

---

## Disclaimer

- Este projeto é **para fins demonstrativos**.
- O web scraping pode violar os termos de serviço de alguns sites.
- Verifique as políticas do Rotten Tomatoes antes de usar este código em produção.
- O desenvolvedor não se responsabiliza por qualquer uso indevido.
