import { AppDataSource } from "@typeorm/data-source";
import { MentorshipWork } from "@typeorm/entity/MentorshipWork";
import { ProdBib } from "@typeorm/entity/ProdBib";
import { ProdTec } from "@typeorm/entity/ProdTec";
import { ProdTecKind } from "@typeorm/entity/ProdTecKind";
import { Professor } from "@typeorm/entity/Professor";
import { Project } from "@typeorm/entity/Project";
import { MENTORSHIP_DEGREE } from "src/constants";
import MentorshipWorkRepository from "src/Modules/MentorshipWork/MentorshipWorkRepository";
import ProdBibRepository from "src/Modules/ProdBib/ProdBibRepository";
import ProdTecRepository from "src/Modules/ProdTec/ProdTecRepository";
import ProdTecKindRepository from "src/Modules/ProdTecKind/ProdTecKindRepository";
import ProfessorRepository from "src/Modules/Professor/ProfessorRepository";
import ProjectRepository from "src/Modules/Project/ProjectRepository";
import {
  filterByCoorientador,
  filterByOrientador,
  filterByTime,
} from "./filters";

import { getPontDoc } from "src/FacomNormCred/functions";

class Rank {
  constructor(private professorId: string) {}

  public async getNICConcluida() {
    const mentorshipRepository = new MentorshipWorkRepository(
      AppDataSource.getRepository(MentorshipWork)
    );

    const mentorshipWork = await mentorshipRepository.findByProfessor(
      this.professorId
    );

    const concludedICValid = mentorshipWork
      .filter(filterByTime)
      .filter(filterByOrientador)
      .filter((item) => item.is_concluded)
      .filter((item) => item.degree === MENTORSHIP_DEGREE.IC);
    return concludedICValid.length;
  }

  public async NPosDocSup() {
    const mentorshipRepository = new MentorshipWorkRepository(
      AppDataSource.getRepository(MentorshipWork)
    );

    const mentorshipWork = await mentorshipRepository.findByProfessor(
      this.professorId
    );

    const concludedPosDocSup = mentorshipWork
      .filter((item) => item.is_concluded)
      .filter((item) => item.degree === MENTORSHIP_DEGREE.POS)
      .filter(filterByOrientador)
      .filter(filterByTime);

    return concludedPosDocSup.length;
  }

  public async NMestresFor() {
    const mentorshipRepository = new MentorshipWorkRepository(
      AppDataSource.getRepository(MentorshipWork)
    );

    const mentorshipWork = await mentorshipRepository.findByProfessor(
      this.professorId
    );

    const concludedMast = mentorshipWork
      .filter((item) => item.is_concluded)
      .filter((item) => item.degree === MENTORSHIP_DEGREE.MAS)
      .filter(filterByOrientador)
      .filter(filterByTime);

    return concludedMast.length;
  }

  public async NCoorMestDout() {
    const mentorshipRepository = new MentorshipWorkRepository(
      AppDataSource.getRepository(MentorshipWork)
    );

    const mentorshipWork = await mentorshipRepository.findByProfessor(
      this.professorId
    );

    const coorMestDout = mentorshipWork
      .filter((item) => item.is_concluded)
      .filter(
        (item) =>
          item.degree === MENTORSHIP_DEGREE.MAS ||
          item.degree === MENTORSHIP_DEGREE.DOU
      )
      .filter(filterByCoorientador)
      .filter(filterByTime);

    return coorMestDout.length;
  }

  public async NDoutoresFor() {
    const mentorshipRepository = new MentorshipWorkRepository(
      AppDataSource.getRepository(MentorshipWork)
    );

    const mentorshipWork = await mentorshipRepository.findByProfessor(
      this.professorId
    );

    const formDout = mentorshipWork
      .filter((item) => item.is_concluded)
      .filter((item) => item.degree === MENTORSHIP_DEGREE.DOU)
      .filter(filterByOrientador)
      .filter(filterByTime);

    return formDout.length;
  }

  public async NroOriMest() {
    const mentorshipRepository = new MentorshipWorkRepository(
      AppDataSource.getRepository(MentorshipWork)
    );

    const mentorshipWork = await mentorshipRepository.findByProfessor(
      this.professorId
    );

    const orMest = mentorshipWork
      .filter((item) => !item.is_concluded)
      .filter((item) => item.degree === MENTORSHIP_DEGREE.MAS)
      .filter(filterByOrientador)
      .filter(filterByTime);

    return orMest.length;
  }

  public async NroOriDout() {
    const mentorshipRepository = new MentorshipWorkRepository(
      AppDataSource.getRepository(MentorshipWork)
    );

    const mentorshipWork = await mentorshipRepository.findByProfessor(
      this.professorId
    );

    const orMest = mentorshipWork
      .filter((item) => !item.is_concluded)
      .filter((item) => item.degree === MENTORSHIP_DEGREE.DOU)
      .filter(filterByOrientador)
      .filter(filterByTime);

    return orMest.length;
  }

  public async IRestritoTot() {
    const prodBibRepository = new ProdBibRepository(
      AppDataSource.getRepository(ProdBib)
    );

    const prodBib = await prodBibRepository.findByProfessor(this.professorId);

    return parseFloat(
      prodBib
        .reduce((acc, item) => acc + parseFloat(item?.i_restrito ?? "0"), 0)
        .toFixed(2)
    );
  }

  public async IGeralTot() {
    const prodBibRepository = new ProdBibRepository(
      AppDataSource.getRepository(ProdBib)
    );

    const prodBib = await prodBibRepository.findByProfessor(this.professorId);

    return parseFloat(
      prodBib
        .reduce((acc, item) => acc + parseFloat(item?.i_geral ?? "0"), 0)
        .toFixed(2)
    );
  }

  public async PontProdTec() {
    const prodTecRepository = new ProdTecRepository(
      AppDataSource.getRepository(ProdTec)
    );

    const prodTec = (await prodTecRepository.findByProfessor(
      this.professorId
    )) as ProdTec[];

    return parseFloat(
      prodTec
        .reduce((acc, item) => {
          // @ts-expect-error
          return acc + item.quantity * parseFloat(item.score);
        }, 0)
        .toFixed(2)
    );
  }

  public async CoordProjeto() {
    const projectRepository = new ProjectRepository(
      AppDataSource.getRepository(Project)
    );

    const professorRepository = new ProfessorRepository(
      AppDataSource.getRepository(Professor)
    );

    const professor = await professorRepository.findById(this.professorId);

    const projects = (await projectRepository.findByProfessor(
      this.professorId
    )) as Project[];

    const coordProjects = projects.filter(
      (item) => item.responsible_id === professor?.lattes_id
    );

    return coordProjects.length;
  }

  public async ParticProjeto() {
    const projectRepository = new ProjectRepository(
      AppDataSource.getRepository(Project)
    );

    const professorRepository = new ProfessorRepository(
      AppDataSource.getRepository(Professor)
    );

    const professor = await professorRepository.findById(this.professorId);

    const projects = (await projectRepository.findByProfessor(
      this.professorId
    )) as Project[];

    const particProjects = projects.filter(
      (item) => item.responsible_id !== professor?.lattes_id
    );

    return particProjects.length;
  }

  public async PQDT() {
    const professorRepository = new ProfessorRepository(
      AppDataSource.getRepository(Professor)
    );

    const professor = await professorRepository.findById(this.professorId);

    return professor?.has_pq_or_dt_sponsor;
  }

  public async getRankVariables() {
    return {
      NICConcluida: await this.getNICConcluida(),
      NPosDocSup: await this.NPosDocSup(),
      NMestresFor: await this.NMestresFor(),
      NCoorMestDout: await this.NCoorMestDout(),
      NDoutoresFor: await this.NDoutoresFor(),
      NroOriMest: await this.NroOriMest(),
      NroOriDout: await this.NroOriDout(),
      IRestritoTot: await this.IRestritoTot(),
      IGeralTot: await this.IGeralTot(),
      PontProdTec: await this.PontProdTec(),
      CoordProjeto: await this.CoordProjeto(),
      PartProjeto: await this.ParticProjeto(),
      PQDT: (await this.PQDT()) ? 10 : 0,
      NMeses: 0,
    };
  }

  public async getPontDoc() {
    const rankVariables = await this.getRankVariables();
    return getPontDoc(rankVariables).toFixed(2);
  }
}

export default Rank;
