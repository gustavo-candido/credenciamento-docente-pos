import { TProdTec } from "@FacomLattesExtractor/types";
import {
  filterByTime,
  filterByBrazil,
  filterByInternational,
} from "@FacomNormCred/filters";
import { TFacomNormCred, TProdTecModule } from "@FacomNormCred/types";
import { ProdTecKind } from "@typeorm/entity/ProdTecKind";

type Props = {
  booksAndChapters: {
    anais: Pick<TProdTec, "title" | "year">[];
    books: Pick<TProdTec, "title" | "year">[];
  };
  articleReview: Array<{
    year: number;
    title: string;
    country: string;
  }>;

  prodTecKind: ProdTecKind[];

  openSource: Pick<TProdTec, "title" | "year">[];
};

class ProdTecModule {
  public infos = [] as TFacomNormCred["prod_tec"];

  private booksAndChapters: Props["booksAndChapters"];
  private articleReview: Props["articleReview"];
  private prodTecKind: Props["prodTecKind"];
  private openSource: Props["openSource"];

  constructor({
    booksAndChapters,
    articleReview,
    prodTecKind,
    openSource,
  }: Props) {
    this.booksAndChapters = booksAndChapters;
    this.articleReview = articleReview;
    this.prodTecKind = prodTecKind;
    this.openSource = openSource;
  }

  public getProdAnais() {
    const orgAnais = this.prodTecKind.find((item) =>
      item.kind.includes(
        "Organização anais (incluindo editoria e corpo editorial)"
      )
    );

    const validAnais = this.booksAndChapters.anais
      .filter(filterByTime)
      .map((item) => ({
        ...item,
        score: orgAnais?.score ?? 0,
        prod_tec_kind: orgAnais?.kind ?? "none",
        quantity: 1,
      }));

    this.infos = [...this.infos, ...validAnais];

    return this;
  }

  public getProdBooks() {
    const orgBooks = this.prodTecKind.find((item) =>
      item.kind.includes(
        "Organização de livro, catálogo, coletânea e enciclopédia"
      )
    );

    const validBooks = this.booksAndChapters.books
      .filter(filterByTime)
      .map((item) => ({
        ...item,
        score: orgBooks?.score ?? 0,
        prod_tec_kind: orgBooks?.kind ?? "none",
        quantity: 1,
      }));

    this.infos = [...this.infos, ...validBooks];

    return this;
  }

  public getArticleReviewNational() {
    const revNat = this.prodTecKind.find((item) =>
      item.kind.includes(
        "Revisão de Artigo em evento Nacional Qualificado (por revisão)"
      )
    );
    const validReviews = this.articleReview
      .filter(filterByTime)
      .filter(filterByBrazil)
      .map((item) => ({
        ...item,
        score: revNat?.score ?? 0,
        prod_tec_kind: revNat?.kind ?? "none",
        quantity: 1,
      }));

    this.infos = [...this.infos, ...validReviews];

    return this;
  }

  public getArticleReviewInternational() {
    const revInter = this.prodTecKind.find((item) =>
      item.kind.includes(
        "Revisão de Artigo em evento Internacional Qualificado (por revisão)"
      )
    );
    const validReviews = this.articleReview
      .filter(filterByTime)
      .filter(filterByInternational)
      .map((item) => ({
        ...item,
        score: revInter?.score ?? 0,
        prod_tec_kind: revInter?.kind ?? "none",
        quantity: 1,
      }));

    this.infos = [...this.infos, ...validReviews];

    return this;
  }

  public getOpenSource() {
    const openSource = this.prodTecKind.find((item) =>
      item.kind.includes(
        "Software (programa de computador) disponível em repositório público (por repositório)"
      )
    );

    const validOpenSource = this.openSource
      .filter(filterByTime)
      .map((item) => ({
        ...item,
        score: openSource?.score ?? 0,
        prod_tec_kind: openSource?.kind ?? "none",
        quantity: 1,
      }));

    this.infos = [...this.infos, ...validOpenSource];

    return this;
  }
  public build() {
    return this.infos;
  }
}

export default ProdTecModule;
