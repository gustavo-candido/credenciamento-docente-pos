import { TProject } from "@FacomLattesExtractor/types";
import { filterByQuadrennial } from "@FacomNormCred/filters";

export function getParticipatedProjects(
  projects: TProject[],
  lattesId: string
) {
  return projects
    .filter(filterByQuadrennial)
    .filter((item) => item.has_sponsor)
    .filter(
      (item) => item.kind === "PESQUISA" || item.kind === "DESENVOLVIMENTO"
    )
    .filter((item) => item.responsible_id !== lattesId);
}

export function getCoordinatedProjects(projects: TProject[], lattesId: string) {
  return projects
    .filter(filterByQuadrennial)
    .filter((item) => item.has_sponsor)
    .filter(
      (item) => item.kind === "PESQUISA" || item.kind === "DESENVOLVIMENTO"
    )
    .filter((item) => item.responsible_id === lattesId);
}
