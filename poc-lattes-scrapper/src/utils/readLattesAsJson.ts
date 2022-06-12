import fs from "fs";
import parser from "xml2json";

const readLattesAsJson = (): Record<string, any> => {
  const data = fs.readFileSync("temp/curriculo.xml", "latin1");

  const dataAsJson = parser.toJson(data, { object: true });

  return dataAsJson;
};

export default readLattesAsJson;