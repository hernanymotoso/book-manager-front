import type { BookModel } from '$lib/models/book'

export function filterBooks(books: BookModel[], search: string) {
  const term = search.trim().toLowerCase()
  if (!term) return books
  return books.filter(book => book.title.toLowerCase().includes(term))
}
