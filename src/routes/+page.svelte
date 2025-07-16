<script>
  //FIXME:
  // @ts-nocheck

  import { enhance } from '$app/forms'
  import { goto } from '$app/navigation'
  import { Wrapper } from '$lib/components'
  import { localStorageHelper, cookieHelpers } from '$lib/utils'
  import toast from 'svelte-french-toast'

  let email = ''
  let password = ''
  let success = ''
  let error = ''

  function handleSignIn(event) {
    event.preventDefault()
    error = ''
    success = ''

    if (!email || !password) {
      error = 'Fill in all fields!'
      return
    }

    const users = localStorageHelper.get('@book-manager_users') || []
    const findedUser = users.find(u => u.email === email)

    if (!findedUser) {
      error = 'User not found!'
      toast.error(error)
      return
    }

    const cookieAge = 60 * 60 * 24 * 7
    document.cookie = `${cookieHelpers.keys.authUser}=${encodeURIComponent(JSON.stringify({ ...findedUser, password: null }))}; path=/; max-age=${cookieAge}`

    success = 'SignIn successfully!'
    email = ''
    password = ''
  }

  $: if (success) {
    toast.success(success)
    setTimeout(() => goto('/dashboard'), 1200)
  }
</script>

<Wrapper>
  <div class="mt-8 flex flex-col items-center justify-center py-8">
    <div class="mb-8">
      <img src="/favicon.svg" alt="Logo" class="mx-auto h-16 w-16" />
      <h1 class="mt-2 text-center text-3xl font-bold">Book Manager</h1>
    </div>

    <form on:submit={handleSignIn} class="flex w-full max-w-sm flex-col gap-4 rounded-lg bg-gray-800 p-8 shadow-md">
      <label class="flex flex-col gap-1">
        <span class="text-sm text-gray-300">Email</span>

        <input
          type="email"
          name="email"
          bind:value={email}
          class="rounded border border-gray-600 bg-gray-900 px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
          placeholder="Type your email"
          required
        />
      </label>

      <label class="flex flex-col gap-1">
        <span class="text-sm text-gray-300">Password</span>

        <input
          type="password"
          name="password"
          bind:value={password}
          class="rounded border border-gray-600 bg-gray-900 px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
          placeholder="Type your password"
          required
        />
      </label>

      <button
        type="submit"
        class="mt-4 w-full cursor-pointer rounded bg-blue-600 px-6 py-2 font-semibold text-white transition hover:bg-blue-700"
        >Sign In</button
      >

      <a href="/register" class="mt-2 text-center text-blue-400 hover:underline">Register</a>
    </form>
  </div>
</Wrapper>
