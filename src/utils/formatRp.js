// mengubah agar berformat ke mata uang Indonesia
export const formatRp = (nominal) => {
  const price = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  })
    .format(nominal)
    .replace(/(\.|,)00$/g, "");
  return price;
};
