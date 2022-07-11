import isQualisRestrict from "@utils/isQualisRestrict";

import type {
  MentorshipWorkByDegree,
  TArticleProd,
  TEventWork,
} from "@FacomLattesExtractor/types";

export const filterByTime = (data: Pick<MentorshipWorkByDegree, "year">) =>
  2017 <= data.year;

export const filterByOrientador = (
  data: Pick<MentorshipWorkByDegree, "role">
) => data.role === "ORIENTADOR_PRINCIPAL";

export const filterByCoorientador = (
  data: Pick<MentorshipWorkByDegree, "role">
) => data.role === "CO_ORIENTADOR";

export const filterByIRestrict = (
  data: Pick<TArticleProd | TEventWork, "qualis">
) => isQualisRestrict(data.qualis);

export const filterByIGeneral = (
  data: Pick<TArticleProd | TEventWork, "qualis">
) => !isQualisRestrict(data.qualis);
