<script lang="ts">
  import { Wrapper } from '$lib/components'
  // TODO: Implement auth
  export let user: { name: string } | null = null

  // TODO: Implement auth
  function handleSignIn() {
    alert('Sign In')
  }

  // TODO: Implement auth
  function handleSignOut() {
    alert('Sign Out')
  }
</script>

<header class="w-full bg-gray-800 shadow">
  <Wrapper>
    <div class="mx-auto flex items-center justify-between">
      <!-- Logo -->
      <div class="flex items-center space-x-2">
        <img src="/favicon.svg" alt="Logo" class="h-8 w-8" />
        <span class="text-xl font-bold text-white">Book Manager</span>
      </div>

      <!-- Sign In / Sign Out -->
      <div class="flex items-center space-x-4">
        {#if user}
          <span class="text-gray-200">Olá, {user.name}</span>
          <button class="rounded bg-red-500 px-4 py-2 text-white transition hover:bg-red-600" on:click={handleSignOut}>
            Sign Out
          </button>
        {:else}
          <button class="rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700" on:click={handleSignIn}>
            Sign In
          </button>
        {/if}
      </div>
    </div>
  </Wrapper>
</header>
