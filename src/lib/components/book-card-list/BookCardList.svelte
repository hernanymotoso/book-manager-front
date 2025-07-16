<script lang="ts">
  import type { BookModel } from '$lib/models/book'
  import BookCard from '../book-card/BookCard.svelte'
  export let books: BookModel[] = []
</script>

<div
  class="grid justify-items-center gap-4 lg:justify-items-start"
  style="grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));"
>
  {#each books as book (book.id)}
    <BookCard {book} />
  {/each}
</div>
