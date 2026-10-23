import { useState } from 'react'
import { youtubeWatchUrl } from '../../config/video'

export default function YouTubePlayer({ videoId, title }) {
  const [failed, setFailed] = useState(false)
  if (!videoId) return <p className="border border-white/10 p-4 text-sm text-mute">Vídeo não configurado.</p>
  return <div>
    <div className="aspect-video w-full overflow-hidden border border-white/10 bg-black">
      {!failed && <iframe className="h-full w-full" src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`} title={title || 'Vídeo-aula Altius Directio'} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen loading="lazy" referrerPolicy="strict-origin-when-cross-origin" onError={() => setFailed(true)} />}
      {failed && <div className="flex h-full flex-col items-center justify-center gap-3 px-4 text-center"><p className="text-sm text-snow">Não foi possível carregar o vídeo aqui</p><a className="text-sm text-accent underline underline-offset-4" href={youtubeWatchUrl(videoId)} target="_blank" rel="noreferrer">Assistir no YouTube</a></div>}
    </div>
    {!failed && <button className="mt-2 text-xs text-mute underline underline-offset-4" type="button" onClick={() => setFailed(true)}>O vídeo não carregou?</button>}
  </div>
}
