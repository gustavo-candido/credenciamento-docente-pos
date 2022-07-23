import fs from "fs";
import parser from "xml2json";

const readLattesAsJson = (lattesPath: string): Record<string, any> => {
  const data = fs.readFileSync(lattesPath, "latin1");

  const dataAsJson = parser.toJson(data, { object: true });

  return dataAsJson;
};

export default readLattesAsJson;
