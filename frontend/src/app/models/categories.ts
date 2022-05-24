export enum Categories{
  Koszule, Spodenki, Spodnie, Koszulki, Bluzy
}

export const categoriesArray = Object.keys(Categories).filter((v) => isNaN(Number(v)));
