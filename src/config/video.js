export const YOUTUBE_HOSTS = ['youtube.com', 'www.youtube.com', 'm.youtube.com', 'youtu.be', 'www.youtu.be']
const ID_PATTERN = /^[A-Za-z0-9_-]{11}$/
export function extractYouTubeId(value) {
  try {
    const url = new URL(value)
    if (!YOUTUBE_HOSTS.includes(url.hostname.toLowerCase())) return null
    let id = ''
    if (url.hostname.toLowerCase().endsWith('youtu.be')) id = url.pathname.split('/').filter(Boolean)[0] || ''
    else if (url.pathname === '/watch') id = url.searchParams.get('v') || ''
    else if (/^\/(shorts|embed)\//.test(url.pathname)) id = url.pathname.split('/')[2] || ''
    return ID_PATTERN.test(id) ? id : null
  } catch { return null }
}
export function youtubeWatchUrl(id) { return ID_PATTERN.test(id || '') ? `https://www.youtube.com/watch?v=${id}` : '' }
export async function lookupYouTube(value) {
  const id = extractYouTubeId(value)
  if (!id) throw new Error('Cole um link válido do YouTube.')
  const apiUrl = import.meta.env.VITE_SUPABASE_URL?.replace(/\/$/, '')
  const apiKey = import.meta.env.VITE_SUPABASE_ANON_KEY
  if (apiUrl && apiKey) {
    try {
      const session = JSON.parse(localStorage.getItem('altius-directio-auth-session') || 'null')
      const response = await fetch(`${apiUrl}/functions/v1/verify-youtube`, { method: 'POST', headers: { 'Content-Type': 'application/json', apikey: apiKey, Authorization: `Bearer ${session?.access_token || apiKey}` }, body: JSON.stringify({ videoId: id }) })
      if (response.ok) return { id, ...(await response.json()) }
    } catch { /* Fallback para metadados públicos via oEmbed. */ }
  }
  const oembed = `https://www.youtube.com/oembed?url=${encodeURIComponent(youtubeWatchUrl(id))}&format=json`
  try {
    const response = await fetch(oembed)
    if (!response.ok) throw new Error('Consulta indisponível')
    const info = await response.json()
    return { id, title: info.title, thumbnail: info.thumbnail_url, verified: false, embeddable: null }
  } catch {
    return { id, title: '', thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`, verified: false, embeddable: null }
  }
}
