import { CategoryResponse } from './category-response';
export interface ProductResponse {
    id: number,
    title: string,
    subTitle: string,
    keyInformation: string,
    price: number,
    imageBase64: string,
    description: string,
    country: string,
    categories: CategoryResponse[]
}
