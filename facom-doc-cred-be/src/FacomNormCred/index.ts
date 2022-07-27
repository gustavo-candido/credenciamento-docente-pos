import FacomLattesExtractor from "@FacomLattesExtractor/index";
import { FormModule, ProdBibModule } from "./Modules";
import ProdTecModule from "./Modules/ProdTecModule";

import type { TFacomNormCred } from "./types";

class FacomNormCred {
  private facomLattesExtractor;

  constructor(lattesPath: string) {
    this.facomLattesExtractor = new FacomLattesExtractor(lattesPath);
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

    return new ProdBibModule(prodBib)
      .getProdBibArticles()
      .getProdBibEvents()
      .build();
  }

  public async getProdTecModule() {
    // return new ProdTecModule().getOpenSource().build();
  }

  public async getAllModules(): Promise<TFacomNormCred> {
    return {
      mentorship: [], //this.getFormModule(),
      prod_bib: await this.getProdBibModule(),
      // ...this.getProdTecModule(),
    };
  }
}

export default FacomNormCred;
