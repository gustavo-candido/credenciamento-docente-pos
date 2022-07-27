import {
  filterByCoorientador,
  filterByOrientador,
  filterByTime,
} from "@FacomNormCred/filters";

import type { TMentorshipWork } from "@FacomLattesExtractor/types";
import { MENTORSHIP_DEGREE } from "src/constants";
import { TFacomNormCred } from "@FacomNormCred/types";

class FormModule {
  public infos = [] as TFacomNormCred["mentorship"];

  constructor(private mentorshipWork: TMentorshipWork) {}

  public getICConcluida() {
    const concludedMentorships = this.mentorshipWork.concluded;
    const concludedIC = concludedMentorships.ic;

    const concludedICValid = concludedIC
      .filter(filterByOrientador)
      .filter(filterByTime)
      .map((item) => ({
        is_concluded: true,
        role: item.role,
        title: item.title,
        year: item.year,
        student_name: item.student_name,
        degree: MENTORSHIP_DEGREE.IC,
        sponsor_code: item.sponsor_code,
        sponsor_name: item.sponsor_name,
      }));

    this.infos = [...this.infos, ...concludedICValid];

    return this;
  }

  public getPosDocSup() {
    const concludedMentorships = this.mentorshipWork.concluded;
    const concludedPosDocSup = concludedMentorships.postdoctoral;

    const concludedPosDocSupValid = concludedPosDocSup
      .filter(filterByOrientador)
      .filter(filterByTime)
      .map((item) => ({
        is_concluded: true,
        role: item.role,
        title: item.title,
        year: item.year,
        student_name: item.student_name,
        degree: MENTORSHIP_DEGREE.POS,
        sponsor_code: item.sponsor_code,
        sponsor_name: item.sponsor_name,
      }));

    this.infos = [...this.infos, ...concludedPosDocSupValid];

    return this;
  }

  public getMestresFor() {
    const concludedMentorships = this.mentorshipWork.concluded;
    const concludedMestresForm = concludedMentorships.master;

    const concludedMestresFormValid = concludedMestresForm
      .filter(filterByOrientador)
      .filter(filterByTime)
      .map((item) => ({
        is_concluded: true,
        role: item.role,
        title: item.title,
        year: item.year,
        student_name: item.student_name,
        degree: MENTORSHIP_DEGREE.MAS,
        sponsor_code: item.sponsor_code,
        sponsor_name: item.sponsor_name,
      }));

    this.infos = [...this.infos, ...concludedMestresFormValid];

    return this;
  }

  public getDoutoresFor() {
    const concludedMentorships = this.mentorshipWork.concluded;
    const concludedDoutoresFor = concludedMentorships.doctoral;

    const concludedDoutoresForValid = concludedDoutoresFor
      .filter(filterByOrientador)
      .filter(filterByTime)
      .map((item) => ({
        is_concluded: true,
        role: item.role,
        title: item.title,
        year: item.year,
        student_name: item.student_name,
        degree: MENTORSHIP_DEGREE.DOU,
        sponsor_code: item.sponsor_code,
        sponsor_name: item.sponsor_name,
      }));

    this.infos = [...this.infos, ...concludedDoutoresForValid];

    return this;
  }

  private getCoorMest() {
    const concludedMentorships = this.mentorshipWork.concluded;
    const concludedMestres = concludedMentorships.master;

    const concludedMestresValid = concludedMestres
      .filter(filterByCoorientador)
      .filter(filterByTime)
      .map((item) => ({
        is_concluded: true,
        role: item.role,
        title: item.title,
        year: item.year,
        student_name: item.student_name,
        degree: MENTORSHIP_DEGREE.MAS,
        sponsor_code: item.sponsor_code,
        sponsor_name: item.sponsor_name,
      }));

    return concludedMestresValid;
  }

  private getCoorDout() {
    const concludedMentorships = this.mentorshipWork.concluded;
    const concludedDout = concludedMentorships.doctoral;

    const concludedDoutValid = concludedDout
      .filter(filterByCoorientador)
      .filter(filterByTime)
      .map((item) => ({
        is_concluded: true,
        role: item.role,
        title: item.title,
        year: item.year,
        student_name: item.student_name,
        degree: MENTORSHIP_DEGREE.DOU,
        sponsor_code: item.sponsor_code,
        sponsor_name: item.sponsor_name,
      }));

    return concludedDoutValid;
  }

  public getCoorMestDout() {
    const coorMestDout = [...this.getCoorMest(), ...this.getCoorDout()];

    this.infos = [...this.infos, ...coorMestDout];
    return this;
  }

  public getOriMest() {
    const currentMentorships = this.mentorshipWork.current;
    const currentOriMest = currentMentorships.master;

    const currentOriMestValid = currentOriMest
      .filter(filterByOrientador)
      .filter(filterByTime)
      .map((item) => ({
        is_concluded: false,
        role: item.role,
        title: item.title,
        year: item.year,
        student_name: item.student_name,
        degree: MENTORSHIP_DEGREE.MAS,
        sponsor_code: item.sponsor_code,
        sponsor_name: item.sponsor_name,
      }));

    this.infos = [...this.infos, ...currentOriMestValid];

    return this;
  }

  public getOriDout() {
    const currentMentorships = this.mentorshipWork.current;
    const currentOriDout = currentMentorships.doctoral;

    const currentOriDoutValid = currentOriDout
      .filter(filterByOrientador)
      .filter(filterByTime)
      .map((item) => ({
        is_concluded: false,
        role: item.role,
        title: item.title,
        year: item.year,
        student_name: item.student_name,
        degree: MENTORSHIP_DEGREE.DOU,
        sponsor_code: item.sponsor_code,
        sponsor_name: item.sponsor_name,
      }));

    this.infos = [...this.infos, ...currentOriDoutValid];

    return this;
  }

  public build() {
    return this.infos;
  }
}

export default FormModule;
