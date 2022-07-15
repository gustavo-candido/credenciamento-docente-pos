import {
  filterByIGeneral,
  filterByIRestrict,
  filterByTime,
} from "@FacomNormCred/filters";

import type { TProdBib } from "@FacomLattesExtractor/types";
import type { TProdBibModule } from "@FacomNormCred/types";

class ProdBibModule {
  public infos = {} as TProdBibModule;

  constructor(private prodBib: TProdBib) {}

  public getIRestrito() {
    const articlesValid = this.prodBib.article
      .filter(filterByTime)
      .filter(filterByIRestrict);

    const eventsValid = this.prodBib.event
      .filter(filterByTime)
      .filter(filterByIRestrict);

    this.infos = {
      ...this.infos,
      i_restrict: { article: articlesValid, event: eventsValid },
    };

    return this;
  }

  public getIGeral() {
    const articlesValid = this.prodBib.article
      .filter(filterByTime)
      .filter(filterByIGeneral);

    const eventsValid = this.prodBib.event
      .filter(filterByTime)
      .filter(filterByIGeneral);

    this.infos = {
      ...this.infos,
      i_general: { article: articlesValid, event: eventsValid },
    };

    return this;
  }

  public build() {
    return this.infos;
  }
}

export default ProdBibModule;
