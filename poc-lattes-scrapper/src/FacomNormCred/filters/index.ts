import isQualisRestrict from "@utils/isQualisRestrict";

import type {
  MentorshipWorkByDegreeDTO,
  TArticleProd,
  TEventWork,
} from "@FacomLattesExtractor/types";

export const filterByTime = (data: Pick<MentorshipWorkByDegreeDTO, "year">) =>
  2017 <= data.year;

export const filterByOrientador = (
  data: Pick<MentorshipWorkByDegreeDTO, "role">
) => data.role === "ORIENTADOR_PRINCIPAL";

export const filterByCoorientador = (
  data: Pick<MentorshipWorkByDegreeDTO, "role">
) => data.role === "CO_ORIENTADOR";

export const filterByIRestrict = (
  data: Pick<TArticleProd | TEventWork, "qualis">
) => isQualisRestrict(data.qualis);

export const filterByIGeneral = (
  data: Pick<TArticleProd | TEventWork, "qualis">
) => !isQualisRestrict(data.qualis);
