<script>
  import { getStringInitials } from '$lib/utils/string.helpers.js'

  export let data
  const user = data.user
</script>

<div class="mt-20 flex flex-col items-center justify-center">
  <div class="mb-6 flex items-center justify-center">
    <div class="flex h-20 w-20 items-center justify-center rounded-full bg-blue-600 text-3xl font-bold text-white">
      {getStringInitials(user?.name)}
    </div>
  </div>

  <div class="flex w-full max-w-sm flex-col items-center gap-4 rounded-lg bg-gray-800 p-8 shadow-md">
    <div class="text-2xl font-semibold text-white">{user?.name}</div>
    <div class="text-gray-300">{user?.email}</div>
  </div>
</div>
