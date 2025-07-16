<script lang="ts">
  import { Wrapper, BookCardList, CreateBookDrawer } from '$lib/components'
  import type { ActionData, PageData } from './$types'

  export let data: PageData
  export let form: ActionData

  $: books = data.fetchedBooks

  //TODO: Refactor
  let search = ''
  let isDrawerOpen = false

  $: filteredBooks =
    search.trim().length === 0
      ? books
      : books.filter(book => book.title.toLowerCase().includes(search.trim().toLowerCase()))

  function handleSearch(event: Event) {
    search = (event.target as HTMLInputElement).value
  }

  console.log({ data, form })
</script>

<Wrapper>
  <h1 class="mb-6 text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">Books</h1>

  <!-- Page header -->
  <div class="mb-6 flex flex-col items-stretch justify-between gap-4 sm:flex-row sm:items-center">
    <div class="flex-1">
      <input
        type="text"
        placeholder="Search book..."
        class="w-full rounded border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500
          focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        bind:value={search}
        on:input={handleSearch}
      />
    </div>

    <button
      class="rounded bg-blue-600 px-6 py-2 font-semibold text-white transition hover:bg-blue-700"
      on:click={() => (isDrawerOpen = true)}
    >
      + Book
    </button>
  </div>

  <BookCardList books={filteredBooks} />

  <CreateBookDrawer {form} isOpen={isDrawerOpen} handleClose={() => (isDrawerOpen = false)} />
</Wrapper>
