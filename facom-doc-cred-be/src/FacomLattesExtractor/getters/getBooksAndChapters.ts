import prioritizeLanguage from "@utils/prioritizeLanguage";
import jsonpath from "jsonpath";

import type { TLattes, TBooksChapter } from "@FacomLattesExtractor/types";

const getBooksAndChapters = (lattes: TLattes) => {
  const publishedBooks = jsonpath.query(
    lattes,
    "$..['LIVRO-PUBLICADO-OU-ORGANIZADO']"
  );

  let publishedAn = [] as TBooksChapter[];
  let publishedCol = [] as TBooksChapter[];

  for (let publishedBook of publishedBooks) {
    const basicData = publishedBook?.["DADOS-BASICOS-DO-LIVRO"];

    const kindArray = [
      "ANAIS",
      "COLETANEA",
      "CATALOGO",
      "ENCICLOPEDIA",
      "LIVRO",
    ];

    if (kindArray.includes(basicData?.["NATUREZA"])) {
      let arr =
        basicData?.["NATUREZA"] === "ANAIS" ? publishedAn : publishedCol;
      arr.push({
        title: prioritizeLanguage({
          "pt-br": basicData?.["TITULO-DO-LIVRO"],
          en: basicData?.["TITULO-DO-LIVRO-INGLES"],
        }),
        year: parseInt(basicData?.["ANO"]),
      });
    }
  }
  return {
    anais: publishedAn,
    books: publishedCol,
  };
};

export default getBooksAndChapters;
