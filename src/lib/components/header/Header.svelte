<script lang="ts">
  import { goto, invalidateAll } from '$app/navigation'
  import { Wrapper } from '$lib/components'
  import type { UserAuthenticated } from '$lib/models/user'
  import { cookieHelpers } from '$lib/utils'

  export let user: UserAuthenticated | null = null

  async function handleSignOut() {
    document.cookie = `${cookieHelpers.keys.authUser}=; path=/; max-age=0`
    await invalidateAll()
    goto('/', { replaceState: true })
  }
</script>

<header class="w-full bg-gray-800 shadow">
  <Wrapper>
    <div class="mx-auto flex items-center justify-between">
      <div class="flex items-center space-x-2">
        <img src="/favicon.svg" alt="Logo" class="h-8 w-8" />
        <span class="text-xl font-bold text-white">Book Manager</span>
      </div>

      <div class="flex items-center space-x-4">
        {#if user}
          <a href="/profile" class="mr-2 text-blue-300 hover:underline" title="See profile">{user.email}</a>

          <span class="text-gray-200">Hello, {user.name}</span>

          <button
            class="cursor-pointer rounded bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
            on:click={handleSignOut}
          >
            Sign Out
          </button>
        {:else}
          <button
            class="cursor-pointer rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
            on:click={() => goto('/')}
          >
            Sign In
          </button>
        {/if}
      </div>
    </div>
  </Wrapper>
</header>
