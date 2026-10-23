const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}
const idPattern = /^[A-Za-z0-9_-]{11}$/
const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  if (request.method !== 'POST') return json({ error: 'method_not_allowed' }, 405)
  const { videoId } = await request.json().catch(() => ({}))
  if (typeof videoId !== 'string' || !idPattern.test(videoId)) return json({ error: 'invalid_video_id' }, 400)
  const apiKey = Deno.env.get('YOUTUBE_DATA_API_KEY')
  const oembedResponse = await fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(`https://www.youtube.com/watch?v=${videoId}`)}&format=json`)
  if (!oembedResponse.ok) return json({ title: '', thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`, verified: false, embeddable: false, reason: 'unavailable' })
  const metadata = await oembedResponse.json()
  if (!apiKey) return json({ title: metadata.title, thumbnail: metadata.thumbnail_url, verified: false, embeddable: null, reason: 'verification_not_configured' })
  const detailsResponse = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=status&id=${videoId}&key=${encodeURIComponent(apiKey)}`)
  if (!detailsResponse.ok) return json({ title: metadata.title, thumbnail: metadata.thumbnail_url, verified: false, embeddable: null, reason: 'verification_unavailable' })
  const { items = [] } = await detailsResponse.json()
  if (!items.length) return json({ title: metadata.title, thumbnail: metadata.thumbnail_url, verified: false, embeddable: false, reason: 'video_unavailable' })
  const status = items[0].status || {}
  const embeddable = status.embeddable === true
  const publicOrUnlisted = ['public', 'unlisted'].includes(status.privacyStatus)
  return json({ title: metadata.title, thumbnail: metadata.thumbnail_url, verified: embeddable && publicOrUnlisted, embeddable, privacyStatus: status.privacyStatus, reason: !embeddable ? 'embedding_disabled' : !publicOrUnlisted ? 'video_not_public_or_unlisted' : null })
})
