import FacomLattesExtractor from "@FacomLattesExtractor/index";
import { FormModule, ProdBibModule } from "./Modules";

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

  public async getAllModules(): Promise<TFacomNormCred> {
    return {
      ...this.getFormModule(),
      ...(await this.getProdBibModule()),
    };
  }
}

export default FacomNormCred;
