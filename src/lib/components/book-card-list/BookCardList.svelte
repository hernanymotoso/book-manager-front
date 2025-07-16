<script lang="ts">
  import type { BookModel } from '$lib/models/book'
  import BookCard from '../book-card/BookCard.svelte'
  export let books: BookModel[] = []
</script>

{#if books.length === 0}
  <div class="w-full py-8 text-center text-gray-400">No data found</div>
{:else}
  <div class="grid w-full gap-6 sm:grid-cols-2 md:grid-cols-3">
    {#each books as book (book.id)}
      <BookCard {book} />
    {/each}
  </div>
{/if}
