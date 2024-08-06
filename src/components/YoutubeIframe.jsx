import React from 'react'

const YoutubeIframe = ({videoid}) => {
    const embedUrl = `https://www.youtube.com/embed/${ videoid}`;
  return (
    <div className="youtube-embed">
            <iframe
                width="560"
                height="315"
                src={embedUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        </div>
  )
}

export default YoutubeIframe