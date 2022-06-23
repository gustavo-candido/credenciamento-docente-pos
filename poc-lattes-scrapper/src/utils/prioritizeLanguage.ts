import isFilledString from "@utils/isFilledString";

const prioritizeLanguage = (item: any): string => {
  const ptContent = item?.["pt-br"];

  if (isFilledString(ptContent)) {
    return ptContent;
  }

  return item?.["en"] ?? "";
};

export default prioritizeLanguage;
