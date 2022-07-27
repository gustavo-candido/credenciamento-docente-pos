import isFilledString from "@utils/isFilledString";

type TLocales = {
  "pt-br"?: string;
  en?: string;
};

const prioritizeLanguage = (item: TLocales): string => {
  const ptContent = item?.["pt-br"];

  if (isFilledString(ptContent)) {
    return ptContent;
  }

  return item?.["en"] ?? "";
};

export default prioritizeLanguage;
