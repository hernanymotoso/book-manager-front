<script lang="ts">
  import { goto } from '$app/navigation'
  import { Wrapper } from '$lib/components'
  import type { UserAuthenticated } from '$lib/models/user'
  import { cookieHelpers } from '$lib/utils'

  export let user: UserAuthenticated | null = null

  async function handleSignOut() {
    document.cookie = `${cookieHelpers.keys.authUser}=; path=/; max-age=0`
    goto('/', { invalidateAll: true })
  }
</script>

<header class="w-full bg-gray-800 shadow">
  <Wrapper>
    <div class="mx-auto flex flex-col gap-2 px-2 py-2 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
      <div class="mb-6 flex w-full items-center justify-center space-x-2 sm:mb-0 sm:w-auto sm:justify-start">
        <button
          class="flex cursor-pointer items-center space-x-2"
          on:click={() => goto('/', { invalidateAll: true })}
          type="button"
        >
          <img src="/favicon.svg" alt="Logo" class="h-8 w-8" />

          <span class="text-xl font-bold text-white">Book Manager</span>
        </button>
      </div>

      <div class="flex flex-col items-center gap-2 sm:flex-row sm:gap-4">
        {#if user}
          <div class="flex flex-col-reverse items-center gap-2 sm:flex-row sm:gap-4">
            <a href="/profile" class="text-blue-300 hover:underline" title="See profile">{user.email}</a>

            <span class="text-gray-200">Hello, {user.name}</span>
          </div>

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
