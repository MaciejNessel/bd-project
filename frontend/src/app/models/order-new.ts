export interface OrderNew {
  user_id: string,
  products: {
      id_: string,
      quantity: number,
      size: string
    }[]
}
