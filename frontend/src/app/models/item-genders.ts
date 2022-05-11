export enum Genders{
  man, woman, kid
}
export const gendersArray = Object.keys(Genders).filter((v) => isNaN(Number(v)));
