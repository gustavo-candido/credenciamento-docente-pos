import { filterByTime } from "@FacomNormCred/filters";

import type { TProdBib } from "@FacomLattesExtractor/types";
import { TFacomNormCred } from "@FacomNormCred/types";

class ProdBibModule {
  public infos = [] as TFacomNormCred["prod_bib"];

  constructor(private prodBib: TProdBib) {}

  public getProdBibArticles() {
    const articlesValid = this.prodBib.article
      .filter(filterByTime)
      .map((item) => ({
        issn_or_sigla: item.issn,
        year: item.year,
        title: item.title,
      }));

    this.infos = [...this.infos, ...articlesValid];

    return this;
  }

  public getProdBibEvents() {
    const eventsValid = this.prodBib.event.filter(filterByTime).map((item) => ({
      issn_or_sigla: item.sigla,
      year: item.year,
      title: item.title,
      event_name: item.eventName,
    }));

    this.infos = [...this.infos, ...eventsValid];

    return this;
  }

  public build() {
    return this.infos;
  }
}

export default ProdBibModule;
