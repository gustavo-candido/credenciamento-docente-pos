import isFilledString from "@utils/isFilledString";
import { QUALIS_PATH } from "src/constants";
import XLSX from "xlsx";

export default class QualisAnaisSeedService {
  constructor() {}

  public run() {
    const workbook = XLSX.readFile(QUALIS_PATH, {});
    const sheet_name_list = workbook.SheetNames;

    const seedsWithCopies = XLSX.utils
      .sheet_to_json<Record<string, string>>(
        workbook.Sheets[sheet_name_list[0]]
      )
      .filter(
        (item) =>
          isFilledString(item?.["SIGLA"]) &&
          isFilledString(item?.["NOME PADRÃO"]) &&
          isFilledString(item?.["Qualis Final"])
      )
      .map((item) => ({
        sigla: item["SIGLA"],
        name: item["NOME PADRÃO"].toUpperCase(),
        qualis: item["Qualis Final"],
      }));

    const siglaSet = new Set<string>();
    const seeds = [];

    for (let seedWithCopy of seedsWithCopies) {
      if (siglaSet.has(seedWithCopy.sigla)) continue;
      siglaSet.add(seedWithCopy.sigla);
      seeds.push(seedWithCopy);
    }

    return seeds;
  }
}
