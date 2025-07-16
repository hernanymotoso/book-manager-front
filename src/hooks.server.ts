import type { UserAuthenticated } from '$lib/models/user'
import { cookieHelpers } from '$lib/utils'
import { redirect } from '@sveltejs/kit'

export async function handle({ event, resolve }) {
  const authUser = event.cookies.get(cookieHelpers.keys.authUser)

  if (authUser) {
    try {
      event.locals.user = JSON.parse(decodeURIComponent(authUser)) as UserAuthenticated
    } catch {
      event.locals.user = null
    }
  } else {
    event.locals.user = null
  }

  const path = event.url.pathname
  const isPublicPath = path === '/' || path === '/register'
  const user = event.locals?.user

  if (isPublicPath && user) throw redirect(303, '/dashboard')
  if (!isPublicPath && !user) throw redirect(303, '/')

  return await resolve(event)
}
