import XLSX from "xlsx";

const readQualis = () => {
  const workbook = XLSX.readFile(process.env.QUALIS_PATH ?? "", {});
  const sheet_name_list = workbook.SheetNames;

  const qualisAnais = XLSX.utils
    .sheet_to_json(workbook.Sheets[sheet_name_list[0]])
    .map((item: any) => ({ ID: item["SIGLA"], QUALIS: item["Qualis Final"] }));

  const qualisPer = XLSX.utils
    .sheet_to_json(workbook.Sheets[sheet_name_list[1]])
    .map((item: any) => ({ ID: item["ISSN"], QUALIS: item["ESTRATO FINAL"] }));

  return {
    anais: qualisAnais,
    per: qualisPer,
  };
};

export default readQualis;
