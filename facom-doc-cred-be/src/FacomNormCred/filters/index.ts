import isQualisRestrict from "@utils/isQualisRestrict";

import type {
  MentorshipWorkByDegreeDTO,
  ProdArticleDTO,
  TEventWork,
} from "@FacomLattesExtractor/types";

export const filterByTime = (data: { year: number }) => 2017 <= data.year;

export const filterByOrientador = (
  data: Pick<MentorshipWorkByDegreeDTO, "role">
) => data.role === "ORIENTADOR_PRINCIPAL";

export const filterByCoorientador = (
  data: Pick<MentorshipWorkByDegreeDTO, "role">
) => data.role === "CO_ORIENTADOR";

export const filterByIRestrict = (
  data: Pick<ProdArticleDTO | TEventWork, "qualis">
) => isQualisRestrict(data.qualis);

export const filterByIGeneral = (
  data: Pick<ProdArticleDTO | TEventWork, "qualis">
) => !isQualisRestrict(data.qualis);

export const filterByBrazil = (data: { country: string }) =>
  data.country.toUpperCase() === "BRAZIL" ||
  data.country.toUpperCase() === "BRASIL";

export const filterByInternational = (data: { country: string }) =>
  data.country.toUpperCase() !== "BRAZIL" ||
  data.country.toUpperCase() !== "BRASIL";
