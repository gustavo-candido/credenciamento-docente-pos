import FacomLattesExtractor from "@FacomLattesExtractor/index";
import { FormModule, ProdBibModule } from "./Modules";

import type { TFacomNormCred } from "./types";

class FacomNormCred {
  private facomLattesExtractor;

  constructor() {
    this.facomLattesExtractor = new FacomLattesExtractor();
  }

  public getFormModule() {
    const formModule = new FormModule(
      this.facomLattesExtractor.getMentorshipWork()
    )
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

  public async getProdBibModule() {
    const prodBibModule = new ProdBibModule(
      await this.facomLattesExtractor.getProdBib()
    )
      .getIRestrito()
      .getIGeral()
      .build();

    return prodBibModule;
  }

  public async getAllModules(): Promise<TFacomNormCred> {
    return {
      ...this.getFormModule(),
      ...(await this.getProdBibModule()),
    };
  }
}

export default FacomNormCred;
