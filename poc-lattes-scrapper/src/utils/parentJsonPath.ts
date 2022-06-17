import jsonpath from "jsonpath";

const parentJsonPath = (
  json: Record<string, any>,
  path: string
): Record<string, any>[] => {
  return jsonpath
    .nodes(json, path)
    .map((item) => {
      let fullPath = [...item.path];
      fullPath.splice(-1);
      return jsonpath.stringify([...fullPath]);
    })
    .map((sanitizedPath) => jsonpath.query(json, sanitizedPath)?.[0]);
};

export default parentJsonPath;
