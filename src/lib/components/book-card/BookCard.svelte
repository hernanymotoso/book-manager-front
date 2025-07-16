<script lang="ts">
  export let book: { id: string; title: string; author: string; createdAt: number }

  function formatDate(dateStr: number) {
    const date = new Date(dateStr)
    return date.toLocaleDateString()
  }
</script>

<div
  class="flex max-w-[220px] flex-col gap-2 rounded-lg border border-gray-700 bg-gray-800 p-4 shadow
         transition-all duration-200 hover:-translate-y-2 hover:shadow-xl"
>
  <h2 class="text-xl font-bold text-white">{book.title}</h2>

  <p class="text-gray-300">
    Author:
    <span class="inline-block max-w-[120px] truncate align-bottom font-medium">{book.author}</span>
  </p>

  <p class="text-sm text-gray-400">Created at: {formatDate(book.createdAt)}</p>
</div>
