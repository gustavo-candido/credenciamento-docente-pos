import FacomLattesExtractor from "@FacomLattesExtractor/index";
import { TProdTecModule } from "@FacomNormCred/types";

class ProdTecModule {
  public infos = {} as TProdTecModule;

  constructor() {}

  public getProdAnais() {
    const getBooksAndChapters =
      new FacomLattesExtractor().getBooksAndChapters();

    this.infos = { ...this.infos, prod_anais: getBooksAndChapters.anais };

    return this;
  }

  public getProdBooks() {
    const getBooksAndChapters =
      new FacomLattesExtractor().getBooksAndChapters();

    this.infos = { ...this.infos, prod_books: getBooksAndChapters.books };

    return this;
  }

  public build() {
    return this.infos;
  }
}

export default ProdTecModule;
