import FacomLattesExtractor from "@FacomLattesExtractor/index";

import {
  filterByIGeneral,
  filterByIRestrict,
  filterByTime,
} from "@FacomNormCred/filters";

import type { TFacomLattesExtractor } from "@FacomLattesExtractor/types";
import type { TProdBibModule } from "@FacomNormCred/types";

class ProdBibModule {
  private extractedLattesInfo: TFacomLattesExtractor;
  public infos = {} as TProdBibModule;

  constructor() {
    this.extractedLattesInfo = new FacomLattesExtractor().getProdBib().build();
  }

  public getIRestrito() {
    const prodBib = this.extractedLattesInfo["PROD-BIB"];
    const articlesValid = prodBib.article
      .filter(filterByTime)
      .filter(filterByIRestrict);

    const eventsValid = prodBib.event
      .filter(filterByTime)
      .filter(filterByIRestrict);

    this.infos = {
      ...this.infos,
      irestrict: { article: articlesValid, event: eventsValid },
    };

    return this;
  }

  public getIGeral() {
    const prodBib = this.extractedLattesInfo["PROD-BIB"];
    const articlesValid = prodBib.article
      .filter(filterByTime)
      .filter(filterByIGeneral);

    const eventsValid = prodBib.event
      .filter(filterByTime)
      .filter(filterByIGeneral);

    this.infos = {
      ...this.infos,
      igeneral: { article: articlesValid, event: eventsValid },
    };

    return this;
  }

  public build() {
    return this.infos;
  }
}

export default ProdBibModule;
