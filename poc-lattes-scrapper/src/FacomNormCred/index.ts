import FacomLattesExtractor from "@FacomLattesExtractor/index";
import { FormModule, ProdBibModule } from "./Modules";
import ProdTecModule from "./Modules/ProdTecModule";

import type { TFacomNormCred } from "./types";

class FacomNormCred {
  private facomLattesExtractor;

  constructor() {
    this.facomLattesExtractor = new FacomLattesExtractor();
  }

  public getFormModule() {
    const mentorshipWork = this.facomLattesExtractor.getMentorshipWork();

    return new FormModule(mentorshipWork)
      .getICConcluida()
      .getPosDocSup()
      .getMestresFor()
      .getDoutoresFor()
      .getCoorMestDout()
      .getOriMest()
      .getOriDout()
      .build();
  }

  public async getProdBibModule() {
    const prodBib = await this.facomLattesExtractor.getProdBib();

    return new ProdBibModule(prodBib).getIRestrito().getIGeral().build();
  }

  public getProdTecModule() {
    const prodTec = this.facomLattesExtractor.getBooksAndChapters();

    return new ProdTecModule().getProdAnais().getProdBooks().build();
  }

  public async getAllModules(): Promise<any> {
    // public async getAllModules(): Promise<TFacomNormCred> {
    return {
      // ...this.getFormModule(),
      // ...(await this.getProdBibModule()),
      ...this.getProdTecModule(),
    };
  }
}

export default FacomNormCred;
