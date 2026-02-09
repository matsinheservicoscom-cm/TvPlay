
import React, { useEffect, useRef, useState } from 'react';
import { Maximize, Minimize, Play, Pause, Volume2, VolumeX, RefreshCw } from 'lucide-react';

interface VideoPlayerProps {
  src: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const Hls = (window as any).Hls;
    const isHls = src.includes('.m3u8');

    if (isHls && Hls && Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setIsLoading(false);
      });
      
      hls.on(Hls.Events.ERROR, (event: any, data: any) => {
        if (data.fatal) {
          switch (data.type) {
            case 'networkError':
              hls.startLoad();
              break;
            case 'mediaError':
              hls.recoverMediaError();
              break;
            default:
              hls.destroy();
              break;
          }
        }
      });

      return () => hls.destroy();
    } else {
      // Fallback para MP4 direto ou navegadores com suporte nativo a HLS (Safari)
      video.src = src;
      video.onloadedmetadata = () => {
        setIsLoading(false);
      };
      video.onerror = () => {
        setIsLoading(false);
      };
    }
  }, [src]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-2xl group border border-zinc-800"
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-20">
          <RefreshCw className="w-12 h-12 text-red-600 animate-spin" />
        </div>
      )}

      <video 
        ref={videoRef}
        className="w-full h-full cursor-pointer object-contain"
        onClick={togglePlay}
        playsInline
      />

      {/* Overlay: Live Indicator */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
        <div className="flex items-center gap-1.5 bg-red-600 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider animate-pulse">
          <span className="w-2 h-2 bg-white rounded-full"></span>
          AO VIVO
        </div>
        <div className="bg-black/50 backdrop-blur-md px-3 py-1 rounded text-xs font-medium text-white">
          FULL HD
        </div>
      </div>

      {/* Custom Controls */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-between z-10">
        <div className="flex items-center gap-4">
          <button onClick={togglePlay} className="p-2 hover:bg-white/20 rounded-full transition text-white">
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 fill-current" />}
          </button>
          <button onClick={toggleMute} className="p-2 hover:bg-white/20 rounded-full transition text-white">
            {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
          </button>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={toggleFullscreen} className="p-2 hover:bg-white/20 rounded-full transition text-white">
            {isFullscreen ? <Minimize className="w-6 h-6" /> : <Maximize className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
