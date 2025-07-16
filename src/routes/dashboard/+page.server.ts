import { books } from '$lib/server/services/http/books/index.js'
import { fail } from '@sveltejs/kit'
import type { PageServerLoad } from './$types.js'

export const actions = {
  saveBook: async ({ request, locals }) => {
    try {
      const user = locals.user!
      const formData = await request.formData()
      const title: string = String(formData.get('title'))
      const author: string = String(formData.get('author'))
      const missingFields: Record<string, boolean> = {}
      if (!title) missingFields.title = true
      if (!author) missingFields.author = true
      if (!!Object.keys(missingFields)?.length) return fail(400, { missingFields })
      const book = await books.create({ title, author }, user.token!)
      return { success: true, book }
    } catch (err: any) {
      return { error: err?.message || 'Something went wrong, try again' }
    }
  }
}

export const load: PageServerLoad = async ({ locals }) => {
  try {
    const user = locals.user!
    const fetchedBooks = (await books.load(user.token)) || []
    return { fetchedBooks }
  } catch (err: any) {
    return { fetchedBooks: [], error: err?.message || 'Internal server error' }
  }
}
