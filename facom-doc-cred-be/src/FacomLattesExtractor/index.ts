import readLattesAsJson from "@utils/readLattesAsJson";

import {
  getMentorshipWork,
  getName,
  getProdBib,
  getResearchesFields,
  getBooksAndChapters,
  getArticleReview,
  getOpenSource,
  getProjects,
  getLattesId,
} from "./getters";

import type { TLattes } from "./types";

class FacomLattesExtractor {
  private lattes: TLattes;

  constructor(lattesPath: string) {
    this.lattes = readLattesAsJson(lattesPath);
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
    return getMentorshipWork(this.lattes);
  }

  public async getProdBib() {
    const prodBib = await getProdBib(this.lattes);

    return prodBib;
  }

  public getBooksAndChapters() {
    return getBooksAndChapters(this.lattes);
  }

  public getArticleReview() {
    return getArticleReview(this.lattes);
  }

  public getOpenSource() {
    return getOpenSource(this.lattes);
  }

  public getProjects() {
    return getProjects(this.lattes);
  }

  public getLattesId() {
    return getLattesId(this.lattes);
  }
}

export default FacomLattesExtractor;
