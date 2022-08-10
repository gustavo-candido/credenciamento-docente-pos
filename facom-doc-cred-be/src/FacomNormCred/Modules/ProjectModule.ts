import { TProject } from "@FacomLattesExtractor/types";
import { filterByQuadrennial, filterByTime } from "@FacomNormCred/filters";

import { TFacomNormCred } from "@FacomNormCred/types";
import { CURRENT_QUADRENNIAL } from "src/constants";

class ProjectModule {
  public infos = [] as TFacomNormCred["project"];

  constructor(private projects: TProject[], private lattesId: string) {}

  public getParticipatedProjects() {
    const participatedProjects = this.projects
      .filter(filterByQuadrennial)
      .filter((item) => item.has_sponsor)
      .filter(
        (item) => item.kind === "PESQUISA" || item.kind === "DESENVOLVIMENTO"
      )
      .filter((item) => item.responsible_id !== this.lattesId);

    this.infos = [...this.infos, ...participatedProjects];

    return this;
  }

  public getCoordinatedProjects() {
    const coordinatedProjects = this.projects
      .filter(filterByQuadrennial)
      .filter((item) => item.has_sponsor)
      .filter(
        (item) => item.kind === "PESQUISA" || item.kind === "DESENVOLVIMENTO"
      )
      .filter((item) => item.responsible_id === this.lattesId);

    this.infos = [...this.infos, ...coordinatedProjects];

    return this;
  }

  public build() {
    return this.infos;
  }
}

export default ProjectModule;
