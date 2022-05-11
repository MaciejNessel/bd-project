export enum Genders{
  men, women, kids
}
export const gendersArray = Object.keys(Genders).filter((v) => isNaN(Number(v)));
