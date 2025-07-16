<script>
  // @ts-nocheck

  import { goto } from '$app/navigation'
  import { Wrapper } from '$lib/components'
  import { localStorageHelper, generateRandomString, cookieHelpers } from '$lib/utils'
  import toast from 'svelte-french-toast'

  let name = ''
  let email = ''
  let password = ''
  let success = ''
  let error = ''

  function handleRegister(event) {
    event.preventDefault()
    error = ''
    success = ''

    if (!name || !email || !password) {
      error = 'Fill in all fields!'
      return
    }

    const users = localStorageHelper.get('@book-manager_users') || []

    if (users.some(u => u.email === email)) {
      error = 'User already exists!'
      return
    }

    const user = { id: generateRandomString(), name, email, password, token: generateRandomString() }
    users.push(user)
    localStorageHelper.save('@book-manager_users', users)

    const cookieAge = 60 * 60 * 24 * 7
    document.cookie = `${cookieHelpers.keys.authUser}=${encodeURIComponent(JSON.stringify({ ...user, password: null }))}; path=/; max-age=${cookieAge}`

    success = 'User created successfully!'
    name = ''
    email = ''
    password = ''
  }

  $: if (success) {
    toast.success(success)
    setTimeout(() => goto('/dashboard'), 1200)
  }
</script>

<Wrapper>
  <div class="mt-8 flex flex-col items-center justify-center">
    <div class="mb-8">
      <img src="/favicon.svg" alt="Logo" class="mx-auto h-16 w-16" />
      <h1 class="mt-2 text-center text-3xl font-bold">Book Manager</h1>
    </div>

    <form class="flex w-full max-w-sm flex-col gap-4 rounded-lg bg-gray-800 p-8 shadow-md" on:submit={handleRegister}>
      <label class="flex flex-col gap-1">
        <span class="text-sm text-gray-300">Name</span>

        <input
          type="text"
          bind:value={name}
          class="rounded border border-gray-600 bg-gray-900 px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
          placeholder="Type your name"
          required
        />
      </label>

      <label class="flex flex-col gap-1">
        <span class="text-sm text-gray-300">Email</span>

        <input
          type="email"
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
          bind:value={password}
          class="rounded border border-gray-600 bg-gray-900 px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
          placeholder="Type your password"
          required
        />
      </label>

      <button
        type="submit"
        class="mt-4 w-full rounded bg-blue-600 px-6 py-2 font-semibold text-white transition hover:bg-blue-700"
        >Register</button
      >
      {#if error}
        <div class="text-center text-red-400">{error}</div>
      {/if}
    </form>
  </div>
</Wrapper>
