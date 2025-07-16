export function generateRandomString(length = 32) {
  return Array.from(crypto.getRandomValues(new Uint8Array(length)))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}

export function getStringInitials(str?: string) {
  if (!str) return ''
  return str
    .split(' ')
    .map(n => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}
