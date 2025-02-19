const express = require('express');
const axios   = require('axios'  );
const cheerio = require("cheerio");

const app = express();
const port = 3000

app.get('/', async (req, res) => {
  try {
    // Atribuições de variveis
    const url      = 'https://www.rottentomatoes.com/browse/movies_in_theaters/'; // URL que será realizdo a extração dos dados
    const urlMovie = 'https://www.rottentomatoes.com'                             // URL que será usada para fazer as requisições da paginas

    const { data } = await axios.get(url); // Atribuido somente o objeto 'data' da requisição do axios
    const $        = cheerio.load(data);   // Injetando conteúdo HTML no cheerio para analise

    let links   = []; // Array de controle para dos links
    let results = []; // Array que vai conter a estrutura do json

    // Estrutura de extração e registro dos 10 primeiro links
    $(".discovery-tiles__wrap").each((i, wrapElement) => {

      // Capturando os links da paginas
      $(wrapElement).find(".flex-container").each((j, flexElement ) => {
        if(j >= 10) return false; // Retorna falso assim que preencher os 10 primeiros

        // Populando o array de links
        pageLink = $(flexElement).find("a").attr("href");
        links.push(`${urlMovie}${pageLink}`)
      });
    
    });

    for (const link of links){
      const { data: pageData } = await axios.get(link); // Atribuindo conteudo das paginas
      const $page = cheerio.load(pageData);             // Injetando conteudo das paginas para o cheerio

      // Função que captura valor dentro do quadro "category"
      function getValue(value) {
        return $page(`.category-wrap:has(rt-text[data-qa='item-label']:contains('${value}'))`)
                .find("rt-text[data-qa='item-value'], rt-link[data-qa='item-value']")
                .map((_, el) => $(el).text().trim())
                .get()
                .join(", ");;
      }

      const title    = $page("rt-text[slot='title']").text().replace(/Welcome Back!\s*/, "").trim();
      const synopsis = $page("rt-text[data-qa='synopsis-value']").text().trim();

      // Tratando a data de lançamento
      const dateStr = getValue('Release Date (Theaters)').match(/[A-Za-z]+ \d{1,2}, \d{4}/)[0]; // Retirando dados extras em anexo com a data
      const newDate = new Date(dateStr);                                                        // Convertendo para um objeto Date
      const releaseDate = isNaN(newDate) ? '' : newDate.toISOString();                          // Verifica de a data é valida para converter para ISO


      results.push({
          title
        , synopsis
        , director         : getValue('Director')
        , producer         : getValue('Producer')
        , screenwriter     : getValue('Screenwriter')
        , distributor      : getValue('Distributor')
        , productionco     : getValue('Production Co')
        , rating           : getValue('Rating')
        , genre            : getValue('Genre')
        , originalLanguage : getValue('Original Language')
        , releaseDate
        , runtime          : getValue('Runtime')
      })

    }

    console.log('results.length :>> ', results.length);
    res.json({ results });
  } catch (error) {
    res.status(500).json( error.message )
  }
})


app.listen(port, () => console.log(`App rodando em http://localhost:${port}`));