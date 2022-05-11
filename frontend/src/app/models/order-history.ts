export enum StatusEnum{
  zrealizowane, w_drodze, przygotowywanie, anulowane
}

export interface OrderHistory {
  order_id: string,
  date: string,
  resultPrice: number,
  status: number,
  products: {
      id_: string,
      name: string,
      quantity: number,
      price: number
    }[]
}
