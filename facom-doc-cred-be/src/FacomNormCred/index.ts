import FacomLattesExtractor from "@FacomLattesExtractor/index";
import { AppDataSource } from "@typeorm/data-source";
import ProdTecKindRepository from "src/Modules/ProdTecKind/ProdTecKindRepository";
import { ProdBibModule } from "./Modules";
import ProdTecModule from "./Modules/ProdTecModule";
import { ProdTecKind } from "@typeorm/entity/ProdTecKind";

import type { TFacomNormCred } from "./types";
import {
  getCoorMestDout,
  getDoutoresFor,
  getICConcluida,
  getMestresFor,
  getOriDout,
  getOriMest,
  getPosDocSup,
} from "./Modules/FormModule";

import {
  getIGeralTotal,
  getIRestritoTotal,
  getPontDoc,
  getPontProdTec,
} from "./functions";

import {
  getCoordinatedProjects,
  getParticipatedProjects,
} from "./Modules/ProjectModule";
import { getPQDTSponsorInRepository } from "@FacomLattesExtractor/getters/getPQDTSponsorInRepository";

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
      ...getOriDout(mentorshipWork),
    ];
  }

  public async getRankVariables() {
    const mentorshipWork = this.facomLattesExtractor.getMentorshipWork();
    const prodBib = await this.facomLattesExtractor.getProdBib();
    const prodTecKindRepository = new ProdTecKindRepository(
      AppDataSource.getRepository(ProdTecKind)
    );

    const projects = this.facomLattesExtractor.getProjects();
    const lattes_id = this.facomLattesExtractor.getLattesId() ?? "id not found";

    const rankVariables = {
      NICConcluida: getICConcluida(mentorshipWork).length,
      NPosDocSup: getPosDocSup(mentorshipWork).length,
      NMestresFor: getMestresFor(mentorshipWork).length,
      NCoorMestDout: getCoorMestDout(mentorshipWork).length,
      NDoutoresFor: getDoutoresFor(mentorshipWork).length,
      NroOriMest: getOriMest(mentorshipWork).length,
      NroOriDout: getOriDout(mentorshipWork).length,
      IRestritoTot: getIRestritoTotal(prodBib),
      IGeralTot: getIGeralTotal(prodBib),
      PontProdTec: getPontProdTec(
        await this.getProdTecModule(),
        await prodTecKindRepository.findAll()
      ),
      CoordProjeto: getCoordinatedProjects(projects, lattes_id).length,
      PartProjeto: getParticipatedProjects(projects, lattes_id).length,
      PQDT: await getPQDTSponsorInRepository(lattes_id),
      NMeses: 0,
    };
    return getPontDoc(rankVariables);
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

    return [
      ...getParticipatedProjects(projects, lattes_id),
      ...getCoordinatedProjects(projects, lattes_id),
    ];
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
