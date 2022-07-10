import FacomLattesExtractor from "@FacomLattesExtractor/index";
import {
  filterByCoorientador,
  filterByOrientador,
} from "@FacomLattesExtractor/filters";

import { TFacomLattesExtractor } from "@FacomLattesExtractor/types";
import { TFacomNormCred } from "./types";

export const filterByTime = (data: { ANO: number }) => 2017 <= data.ANO;

class FacomNormCred {
  private extractedLattesInfo: TFacomLattesExtractor;
  public infos = {} as TFacomNormCred;

  constructor() {
    this.extractedLattesInfo = new FacomLattesExtractor()
      .getMentorshipWork()
      .build();
  }

  private getCoorMest(): TFacomNormCred["coorMestDout"] {
    const concludedMentorships =
      this.extractedLattesInfo["Orientacao"].concluded;

    const concludedMestres = concludedMentorships.master;

    return concludedMestres;
  }

  private getCoorDout(): TFacomNormCred["coorMestDout"] {
    const concludedMentorships =
      this.extractedLattesInfo["Orientacao"].concluded;

    const concludedDout = concludedMentorships.doctoral;

    return concludedDout;
  }

  public getICConcluida() {
    const concludedMentorships =
      this.extractedLattesInfo["Orientacao"].concluded;

    const concludedIC = concludedMentorships.ic;

    const concludedICValid = concludedIC
      .filter(filterByOrientador)
      .filter(filterByTime);

    this.infos = { ...this.infos, iCConcluida: concludedICValid };

    return this;
  }

  public getPosDocSup() {
    const concludedMentorships =
      this.extractedLattesInfo["Orientacao"].concluded;

    const concludedPosDocSup = concludedMentorships.postdoctoral;

    const concludedPosDocSupValid = concludedPosDocSup
      .filter(filterByOrientador)
      .filter(filterByTime);

    this.infos = { ...this.infos, posDocSup: concludedPosDocSupValid };

    return this;
  }

  public getMestresFor() {
    const concludedMentorships =
      this.extractedLattesInfo["Orientacao"].concluded;

    const concludedMestresForm = concludedMentorships.master;

    const concludedMestresFormValid = concludedMestresForm
      .filter(filterByOrientador)
      .filter(filterByTime);

    this.infos = { ...this.infos, mestresFor: concludedMestresFormValid };

    return this;
  }

  public getDoutoresFor() {
    const concludedMentorships =
      this.extractedLattesInfo["Orientacao"].concluded;

    const concludedDoutoresFor = concludedMentorships.doctoral;

    const concludedDoutoresForValid = concludedDoutoresFor
      .filter(filterByOrientador)
      .filter(filterByTime);

    this.infos = { ...this.infos, doutoresFor: concludedDoutoresForValid };

    return this;
  }

  public getCoorMestDout() {
    const coorMestDout = [...this.getCoorMest(), ...this.getCoorDout()];

    const coorMestDoutValid = coorMestDout
      .filter(filterByCoorientador)
      .filter(filterByTime);

    this.infos = {
      ...this.infos,
      coorMestDout: coorMestDoutValid,
    };
    return this;
  }

  public getOriMest() {
    const currentMentorships = this.extractedLattesInfo["Orientacao"].current;
    const currentOriMest = currentMentorships.master;

    const currentOriMestValid = currentOriMest
      .filter(filterByOrientador)
      .filter(filterByTime);

    this.infos = { ...this.infos, oriMest: currentOriMestValid };

    return this;
  }

  public getOriDout() {
    const currentMentorships = this.extractedLattesInfo["Orientacao"].current;
    const currentOriDout = currentMentorships.doctoral;

    const currentOriDoutValid = currentOriDout
      .filter(filterByOrientador)
      .filter(filterByTime);

    this.infos = { ...this.infos, oriDout: currentOriDoutValid };

    return this;
  }

  public build() {
    return this.infos;
  }
}

export default FacomNormCred;
