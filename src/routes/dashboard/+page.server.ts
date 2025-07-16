import { books } from '$lib/server/services/http/books/index.js'
import { fail } from '@sveltejs/kit'
export const actions = {
  saveBook: async ({ request }) => {
    const formData = await request.formData()
    const title: string = String(formData.get('title'))
    const author: string = String(formData.get('author'))
    const missingFields: Record<string, boolean> = {}
    if (!title) missingFields.title = true
    if (!author) missingFields.author = true
    if (!!Object.keys(missingFields)?.length) return fail(400, { missingFields })
    const book = await books.create({ title, author })
    return { success: true, book }
  }
}

