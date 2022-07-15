import {
  filterByCoorientador,
  filterByOrientador,
  filterByTime,
} from "@FacomNormCred/filters";

import type { TMentorshipWork } from "@FacomLattesExtractor/types";
import type { TFormModule } from "@FacomNormCred/types";

class FormModule {
  public infos = {} as TFormModule;

  constructor(private mentorshipWork: TMentorshipWork) {}

  public getICConcluida() {
    const concludedMentorships = this.mentorshipWork.concluded;
    const concludedIC = concludedMentorships.ic;

    const concludedICValid = concludedIC
      .filter(filterByOrientador)
      .filter(filterByTime);

    this.infos = { ...this.infos, ic_concluida: concludedICValid };

    return this;
  }

  public getPosDocSup() {
    const concludedMentorships = this.mentorshipWork.concluded;
    const concludedPosDocSup = concludedMentorships.postdoctoral;

    const concludedPosDocSupValid = concludedPosDocSup
      .filter(filterByOrientador)
      .filter(filterByTime);

    this.infos = { ...this.infos, pos_doc_sup: concludedPosDocSupValid };

    return this;
  }

  public getMestresFor() {
    const concludedMentorships = this.mentorshipWork.concluded;
    const concludedMestresForm = concludedMentorships.master;

    const concludedMestresFormValid = concludedMestresForm
      .filter(filterByOrientador)
      .filter(filterByTime);

    this.infos = { ...this.infos, mestres_for: concludedMestresFormValid };

    return this;
  }

  public getDoutoresFor() {
    const concludedMentorships = this.mentorshipWork.concluded;
    const concludedDoutoresFor = concludedMentorships.doctoral;

    const concludedDoutoresForValid = concludedDoutoresFor
      .filter(filterByOrientador)
      .filter(filterByTime);

    this.infos = { ...this.infos, doutores_for: concludedDoutoresForValid };

    return this;
  }

  private getCoorMest(): TFormModule["coor_mest_dout"] {
    const concludedMentorships = this.mentorshipWork.concluded;
    const concludedMestres = concludedMentorships.master;

    return concludedMestres;
  }

  private getCoorDout(): TFormModule["coor_mest_dout"] {
    const concludedMentorships = this.mentorshipWork.concluded;
    const concludedDout = concludedMentorships.doctoral;

    return concludedDout;
  }

  public getCoorMestDout() {
    const coorMestDout = [...this.getCoorMest(), ...this.getCoorDout()];
    const coorMestDoutValid = coorMestDout
      .filter(filterByCoorientador)
      .filter(filterByTime);

    this.infos = {
      ...this.infos,
      coor_mest_dout: coorMestDoutValid,
    };
    return this;
  }

  public getOriMest() {
    const currentMentorships = this.mentorshipWork.current;
    const currentOriMest = currentMentorships.master;

    const currentOriMestValid = currentOriMest
      .filter(filterByOrientador)
      .filter(filterByTime);

    this.infos = { ...this.infos, ori_mest: currentOriMestValid };

    return this;
  }

  public getOriDout() {
    const currentMentorships = this.mentorshipWork.current;
    const currentOriDout = currentMentorships.doctoral;

    const currentOriDoutValid = currentOriDout
      .filter(filterByOrientador)
      .filter(filterByTime);

    this.infos = { ...this.infos, ori_dout: currentOriDoutValid };

    return this;
  }

  public build() {
    return this.infos;
  }
}

export default FormModule;
