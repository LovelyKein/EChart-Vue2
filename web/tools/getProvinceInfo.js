import pinyin from "pinyin";
export default (provinceName) => {
  const name = pinyin(provinceName, {
    style: pinyin.STYLE_NORMAL,
  }).join("");
  return {
    name: name,
    url: "province/" + name + ".json",
  };
};
