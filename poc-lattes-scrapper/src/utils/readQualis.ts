import XLSX from "xlsx";

const readQualis = () => {
  const workbook = XLSX.readFile(process.env.QUALIS_PATH ?? "", {});
  const sheet_name_list = workbook.SheetNames;

  const qualisAnais = new Map();
  XLSX.utils
    .sheet_to_json<Record<string, string>>(workbook.Sheets[sheet_name_list[0]])
    .forEach((item: Record<string, string>, _): void => {
      if ("ISSN" in item) {
        qualisPer.set(item["SIGLA"], item["Qualis Final"]);
      }
    });

  const qualisPer = new Map();

  XLSX.utils
    .sheet_to_json<Record<string, string>>(workbook.Sheets[sheet_name_list[1]])
    .forEach((item: Record<string, string>, _): void => {
      if ("ISSN" in item) {
        qualisPer.set(item["ISSN"].replace("-", ""), item["ESTRATO FINAL"]);
      }
    });

  return {
    anais: qualisAnais,
    per: qualisPer,
  };
};

export default readQualis;
