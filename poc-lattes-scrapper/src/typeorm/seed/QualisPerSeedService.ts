import isFilledString from "@utils/isFilledString";
import { QUALIS_PATH } from "src/constants";
import XLSX from "xlsx";

export default class QualisPerSeedService {
  constructor() {}

  public run() {
    const workbook = XLSX.readFile(QUALIS_PATH, {});
    const sheet_name_list = workbook.SheetNames;

    const seedsWithCopies = XLSX.utils
      .sheet_to_json<Record<string, string>>(
        workbook.Sheets[sheet_name_list[1]]
      )
      .filter(
        (item) =>
          isFilledString(item?.["ISSN"]) &&
          isFilledString(item?.["TITULO"]) &&
          isFilledString(item?.["ESTRATO FINAL"])
      )
      .map((item) => ({
        issn: item["ISSN"].replace("-", ""),
        title: item["TITULO"].toUpperCase(),
        qualis: item["ESTRATO FINAL"],
      }));

    const issnSet = new Set<string>();
    const seeds = [];

    for (let seedWithCopy of seedsWithCopies) {
      if (issnSet.has(seedWithCopy.issn)) continue;
      issnSet.add(seedWithCopy.issn);
      seeds.push(seedWithCopy);
    }

    return seeds;
  }
}
