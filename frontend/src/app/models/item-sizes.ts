export enum Sizes{
  XS,S,M,L,XL, XXL
}
export const sizesArray = Object.keys(Sizes).filter((v) => isNaN(Number(v)));
