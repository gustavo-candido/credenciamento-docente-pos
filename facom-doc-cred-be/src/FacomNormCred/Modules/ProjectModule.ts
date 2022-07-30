import { TProjects } from "@FacomLattesExtractor/types";
import { filterByTime } from "@FacomNormCred/filters";

import { TFacomNormCred } from "@FacomNormCred/types";

class ProjectModule {
  public infos = [] as TFacomNormCred["prod_bib"];

  constructor(private projects: TProjects[]) {}

  public getParticipatedProjects() {
    const projectsWithSponsor = this.projects
      .filter(filterByTime)
      .filter((item) => item.has_sponsor);
    // TODO: .filter((item) => item.responsible_id);

    this.infos = [...this.infos, ...projectsWithSponsor];

    return this;
  }

  public build() {
    return this.infos;
  }
}

export default ProjectModule;
