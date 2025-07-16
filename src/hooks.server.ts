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

  if (event.url.pathname === '/dashboard' && !event.locals?.user) {
    throw redirect(303, '/')
  }

  if (event.url.pathname === '/' && event.locals?.user) {
    throw redirect(303, '/dashboard')
  }

  if (event.url.pathname === '/register' && event.locals?.user) {
    throw redirect(303, '/dashboard')
  }

  return await resolve(event)
}
