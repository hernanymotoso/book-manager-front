<script>
  import '../app.css'
  import { Toaster } from 'svelte-french-toast'

  import { Header } from '$lib/components'
</script>

<div class="min-h-screen bg-gray-900 text-white">
  <Header />
  <slot />
</div>

<Toaster />
