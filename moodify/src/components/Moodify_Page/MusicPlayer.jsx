// MusicPlayer.jsx
import React from "react";
import { PauseCircle, PlayCircle, ExternalLink } from "lucide-react";

const MusicPlayer = ({ track, isPlaying, togglePlay }) => {
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-md border border-white/20 shadow-lg rounded-xl px-6 py-4 flex items-center gap-4 w-[90%] max-w-xl z-50">
      {track?.album?.images?.[0] && (
        <img src={track.album.images[0].url} alt={track.name} className="w-14 h-14 rounded-lg" />
      )}
      <div className="flex-1 overflow-hidden">
        <div className="font-semibold truncate">{track.name}</div>
        <div className="text-sm text-gray-300 truncate">
          {track.artists.map((a) => a.name).join(", ")}
        </div>
      </div>

      {track.preview_url ? (
        <button onClick={togglePlay} className="text-green-400 hover:text-green-500">
          {isPlaying ? <PauseCircle size={36} /> : <PlayCircle size={36} />}
        </button>
      ) : (
        <a
          href={track.external_urls.spotify}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:underline flex items-center gap-1"
        >
          <ExternalLink size={20} />
          Open
        </a>
      )}

      {/* Hidden Audio element */}
      {track.preview_url && (
        <audio id="audio-player" src={track.preview_url} autoPlay loop />
      )}
    </div>
  );
};

export default MusicPlayer;
