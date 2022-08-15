import isQualisRestrict from "@utils/isQualisRestrict";

import type {
  MentorshipWorkByDegreeDTO,
  ProdArticleDTO,
  TEventWork,
} from "@FacomLattesExtractor/types";
import { CURRENT_QUADRENNIAL } from "src/constants";

export const filterByTime = (data: { year?: number }) =>
  data.year &&
  CURRENT_QUADRENNIAL.start <= data.year &&
  data?.year <= CURRENT_QUADRENNIAL.end;

export const filterByQuadrennial = (data: {
  year_start: number;
  year_end?: number | null;
}) =>
  !(
    (typeof data.year_end === "number" &&
      data.year_end < CURRENT_QUADRENNIAL.start) ||
    CURRENT_QUADRENNIAL.end < data.year_start
  );

export const filterByOrientador = (data?: { role?: string }) =>
  data?.role === "ORIENTADOR_PRINCIPAL";

export const filterByCoorientador = (data?: { role?: string }) =>
  data?.role === "CO_ORIENTADOR";

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
