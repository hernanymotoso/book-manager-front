<script lang="ts">
  import type { BookModel } from '$lib/models/book'
  import BookCard from '../book-card/BookCard.svelte'
  export let books: BookModel[] = []
</script>

<div class="grid w-full gap-6 sm:grid-cols-2 md:grid-cols-3">
  {#each books as book (book.id)}
    <BookCard {book} />
  {/each}
</div>
