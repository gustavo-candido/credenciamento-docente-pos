import FacomLattesExtractor from "@FacomLattesExtractor/index";
import { AppDataSource } from "@typeorm/data-source";
import ProdTecKindRepository from "src/Modules/ProdTecKind/ProdTecKindRepository";
import { ProdBibModule, ProjectModule } from "./Modules";
import ProdTecModule from "./Modules/ProdTecModule";
import { ProdTecKind } from "@typeorm/entity/ProdTecKind";

import type { TFacomNormCred } from "./types";
import { getCoorMestDout, getDoutoresFor, getICConcluida, getMestresFor, getOriDout, getOriMest, getPosDocSup } from "./Modules/FormModule";

class FacomNormCred {
  private facomLattesExtractor;

  constructor(lattesPath: string) {
    this.facomLattesExtractor = new FacomLattesExtractor(lattesPath);
  }

  public getFormModule() {
    const mentorshipWork = this.facomLattesExtractor.getMentorshipWork();

    return [
      ...getICConcluida(mentorshipWork),
      ...getPosDocSup(mentorshipWork),
      ...getMestresFor(mentorshipWork),
      ...getDoutoresFor(mentorshipWork),
      ...getCoorMestDout(mentorshipWork),
      ...getOriMest(mentorshipWork),
      ...getOriDout(mentorshipWork)
    ]
  }

  public getRankVariables() {
    const mentorshipWork = this.facomLattesExtractor.getMentorshipWork();

    const rankVariables = {
      NICConcluida: getICConcluida(mentorshipWork).length,
      NPosDocSup: getPosDocSup(mentorshipWork).length,
      NMestresFor: getMestresFor(mentorshipWork).length,
      NCoorMestDout: getCoorMestDout(mentorshipWork).length,
      NDoutoresFor: getDoutoresFor(mentorshipWork).length,
      NroOriMest: getOriMest(mentorshipWork).length,
      NroOriDout: getOriDout(mentorshipWork).length
    }
    return rankVariables;
  }

  public async getProdBibModule() {
    const prodBib = await this.facomLattesExtractor.getProdBib();

    return new ProdBibModule(prodBib)
      .getProdBibArticles()
      .getProdBibEvents()
      .build();
  }

  public getProjectModule() {
    const projects = this.facomLattesExtractor.getProjects();
    const lattes_id = this.facomLattesExtractor.getLattesId() ?? "id not found";

    return new ProjectModule(projects, lattes_id)
      .getParticipatedProjects()
      .getCoordinatedProjects()
      .build();
  }

  public async getProdTecModule() {
    const prodTecKindRepository = new ProdTecKindRepository(
      AppDataSource.getRepository(ProdTecKind)
    );
    const prodTecKind = await prodTecKindRepository.findAll();
    const booksAndChapters = this.facomLattesExtractor.getBooksAndChapters();
    const articleReview = this.facomLattesExtractor.getArticleReview();
    const openSource = this.facomLattesExtractor.getOpenSource();

    return new ProdTecModule({
      booksAndChapters,
      articleReview,
      prodTecKind,
      openSource,
    })
      .getProdAnais()
      .getProdBooks()
      .getArticleReviewNational()
      .getArticleReviewInternational()
      .getOpenSource()
      .build();
  }

  public async getAllModules(): Promise<TFacomNormCred> {
    return {
      mentorship: this.getFormModule(),
      prod_bib: await this.getProdBibModule(),
      project: this.getProjectModule(),
      prod_tec: await this.getProdTecModule(),
    };
  }
}

export default FacomNormCred;
