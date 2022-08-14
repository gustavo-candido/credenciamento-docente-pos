import {
  filterByCoorientador,
  filterByOrientador,
  filterByTime,
} from "@FacomNormCred/filters";

import { MENTORSHIP_DEGREE } from "src/constants";
import { TFacomNormCred } from "@FacomNormCred/types";
import { TMentorshipWork } from "@FacomLattesExtractor/types";

export function getICConcluida(mentorshipWork: TMentorshipWork): TFacomNormCred["mentorship"] {
  const concludedMentorships = mentorshipWork.concluded;
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

  return concludedICValid;
}

export function getPosDocSup(mentorshipWork: TMentorshipWork): TFacomNormCred["mentorship"] {
  const concludedMentorships = mentorshipWork.concluded;
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

  return concludedPosDocSupValid;
}

export function getMestresFor(mentorshipWork: TMentorshipWork): TFacomNormCred["mentorship"] {
  const concludedMentorships = mentorshipWork.concluded;
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

  return concludedMestresFormValid;
}

export function getDoutoresFor(mentorshipWork: TMentorshipWork): TFacomNormCred["mentorship"] {
  const concludedMentorships = mentorshipWork.concluded;
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

  return concludedDoutoresForValid;
}

function _getCoorMest(mentorshipWork: TMentorshipWork): TFacomNormCred["mentorship"] {
  const concludedMentorships = mentorshipWork.concluded;
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

function _getCoorDout(mentorshipWork: TMentorshipWork): TFacomNormCred["mentorship"] {
  const concludedMentorships = mentorshipWork.concluded;
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

export function getCoorMestDout(mentorshipWork: TMentorshipWork): TFacomNormCred["mentorship"] {
  const coorMestDout = [..._getCoorMest(mentorshipWork), ..._getCoorDout(mentorshipWork)];

  return coorMestDout;
}

export function getOriMest(mentorshipWork: TMentorshipWork): TFacomNormCred["mentorship"] {
  const currentMentorships = mentorshipWork.current;
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

  return currentOriMestValid;
}

export function getOriDout(mentorshipWork: TMentorshipWork): TFacomNormCred["mentorship"] {
  const currentMentorships = mentorshipWork.current;
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

  return currentOriDoutValid;
}
