import readLattesAsJson from "@utils/readLattesAsJson";

import {
  getMentorshipWork,
  getName,
  getProdBib,
  getResearchesFields,
} from "./getters";

import type { TLattes } from "./types";

class FacomLattesExtractor {
  private lattes: TLattes;

  constructor() {
    this.lattes = readLattesAsJson();
  }

  public getName() {
    const name = getName(this.lattes);

    return name ?? "";
  }

  public getFieldOfSearch() {
    const researchesFields = getResearchesFields(this.lattes);

    return researchesFields ?? [];
  }

  public getMentorshipWork() {
    const mentorshipWork = getMentorshipWork(this.lattes);

    return mentorshipWork;
  }

  public async getProdBib() {
    const prodBib = await getProdBib(this.lattes);

    return prodBib;
  }
}

export default FacomLattesExtractor;
