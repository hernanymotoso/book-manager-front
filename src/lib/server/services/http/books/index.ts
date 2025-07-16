import type { BookModel } from '$lib/models/book'
import { api } from '../http-helpers'

type CreateBookDTO = {
  title: string
  author: string
}

export const books = {
  create: async (dto: CreateBookDTO, authToken: string) => {
    const response = await api.post<BookModel>('/books', dto, { headers: { 'x-access-token': authToken } })
    return response.data
  },
  load: async (authToken: string) => {
    const response = await api.get<BookModel[]>('/books', { headers: { 'x-access-token': authToken } })
    return response.data
  }
}
