<script lang="ts">
  import { enhance } from '$app/forms'
  import type { SubmitFunction } from '@sveltejs/kit'
  import type { ActionData } from '../../../routes/dashboard/$types'

  import { Spinner } from '$lib/components'

  export let isOpen: boolean
  export let form: ActionData
  export let handleClose: () => void

  let isLoading = false

  const saveBook: SubmitFunction = () => {
    isLoading = true
    return async ({ update }) => {
      isLoading = false
      await update()
    }
  }

  $: if (form?.success) handleClose()
</script>

{#if isOpen}
  <!-- Overlay -->
  <div class="fixed inset-0 z-40 bg-black/50 transition-opacity" on:click={handleClose}></div>

  <aside
    class="fixed top-0 right-0 z-50 h-full w-full max-w-md translate-x-0 transform bg-gray-800 text-white shadow-xl transition-transform duration-300"
  >
    <div class="flex items-center justify-between border-b border-gray-700 p-6">
      <h2 class="text-2xl font-bold">New book</h2>

      <button class="text-2xl text-gray-400 hover:text-white" on:click={handleClose} aria-label="Fechar">&times;</button
      >
    </div>

    <form method="POST" action="?/saveBook" use:enhance={saveBook} class="flex flex-col gap-4 p-6">
      <label class="flex flex-col gap-1">
        <span class="text-sm text-gray-300">Title</span>

        <input
          name="title"
          class="rounded border border-gray-600 bg-gray-900 px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
          placeholder="Type the title"
        />

        {#if form?.missingFields?.title}
          <span class="text-red-400">Title is required</span>
        {/if}
      </label>

      <label class="flex flex-col gap-1">
        <span class="text-sm text-gray-300">Author</span>

        <input
          name="author"
          class="rounded border border-gray-600 bg-gray-900 px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
          placeholder="Type the author's name"
        />

        {#if form?.missingFields?.author}
          <span class="text-red-400">Author is required</span>
        {/if}
      </label>

      <div class="mt-6 flex justify-end gap-3">
        <button
          disabled={isLoading}
          type="button"
          class="w-[120px] rounded bg-gray-700 px-6 py-2 text-white hover:bg-gray-600"
          on:click={handleClose}>Cancel</button
        >

        <button
          disabled={isLoading}
          type="submit"
          class="w-[120px] rounded bg-blue-600 px-6 py-2 font-semibold text-white transition hover:bg-blue-700"
        >
          {#if isLoading}
            <Spinner />
          {:else}
            Save
          {/if}
        </button>
      </div>
    </form>
  </aside>
{/if}
