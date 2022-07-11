import { FormModule, ProdBibModule } from "./Modules";

import { TFacomNormCred } from "./types";

class FacomNormCred {
  public infos = {} as TFacomNormCred;

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

  public build() {
    return {
      ...this.getFormModule(),
      ...this.getProdBibModule(),
    };
  }
}

export default FacomNormCred;
