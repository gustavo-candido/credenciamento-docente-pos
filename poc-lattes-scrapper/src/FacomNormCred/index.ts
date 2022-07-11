import { FormModule, ProdBibModule } from "./Modules";

import type { TFacomNormCred } from "./types";

class FacomNormCred {
  constructor() {}

  public getFormModule() {
    const formModule = new FormModule()
      .getICConcluida()
      .getPosDocSup()
      .getMestresFor()
      .getDoutoresFor()
      .getCoorMestDout()
      .getOriMest()
      .getOriDout()
      .build();

    return formModule;
  }

  public getProdBibModule() {
    const prodBibModule = new ProdBibModule()
      .getIRestrito()
      .getIGeral()
      .build();

    return prodBibModule;
  }

  public build(): TFacomNormCred {
    return {
      ...this.getFormModule(),
      ...this.getProdBibModule(),
    };
  }
}

export default FacomNormCred;
