import React, { useRef, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LinearProgress } from "@mui/material";


const PlayGround = () => {
  const { infoHash } = useParams(); // Get movie ID from URL
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
const [mounted, setMounted] = useState('');
  const [src , setSrc] = useState(null);




const handleApiStream = async () => {
  try {
    const response = await axios.get(
      `http://localhost:5001/stream/${infoHash}`
    );
    const streamUrl = response.data.streamUrl;
    // console.log("Stream URL:", streamUrl); // Log the stream URL

    if (streamUrl) {
      setSrc(streamUrl); // ✅ Set video source
    }
    //http://localhost:5001/stream/${infoHash}
  } catch (error) {
    console.error("Error fetching movie torrents:", error);
  }
};

const handleTorrent = async () => {
  try {
    const response = await axios.get(
      `http://localhost:5001/remove/${infoHash}`
    );
    
    // console.log("Stream URL:", streamUrl); // Log the stream URL

    setMounted(response.data.message);
    //http://localhost:5001/stream/${infoHash}
  } catch (error) {
    console.error("Error fetching movie torrents:", error);
  }
};

// const handleApiStream = async () => {
//   try {
//     const response = await axios.get(
//       `http://localhost:5001/stream/${infoHash}`
//     );
//     const streamUrl = response.data.streamUrl;

//     if (streamUrl) {
//       setSrc(streamUrl);
//       console.log("Stream URL:", streamUrl); // Log the stream URL
//       if (videoRef.current) {
//         videoRef.current.load(); // Force reload
//         videoRef.current.play(); // Auto-play
//       }
//     }
//   } catch (error) {
//     console.error("Error fetching movie torrents:", error);
//   }
// };



  return (
    <div className="flex flex-col items-center bg-black w-full h-screen  pb-6 sm:h-full justify-center mb-16 sm:mb-0 relative">
      {/* <iframe
      className="w-full h-screen"
      allow="autoplay; encrypted-media; picture-in-picture; gyroscope"
      allowFullScreen
      src={movieUrl}
      >

      
      </iframe> */}
      {!src && ( // ✅ Hide overlay when streaming starts
        <div className="absolute w-full h-full flex  justify-center items-center text-white z-10 bg-[#0b0909d9]">
          <button
            onClick={handleApiStream}
            className="p-4 bg-blue-400 rounded-full hover:bg-blue-500 cursor-pointer"
          >
            <FaPlay />
          </button>
        </div>
      )}
      <video
        controlsList="nodownload"
        src={src}
        className="w-full sm:h-screen"
        controls
        autoPlay
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onVolumeChange={(e) => setVolume(e.target.volume)}
        onTimeUpdate={(e) => setProgress(e.target.currentTime)}
      />
      <div className="flex gap-4 items-center mt-4">
<h3 className="text-white">Facing any issue click on unmount and refresh the page and play again</h3>
      <button onClick={handleTorrent} className="p-4  cursor-pointer bg-red-600 text-white rounded-md">Unmount</button>
      </div>
      {mounted && <h1 className="text-red-600 ">{mounted}</h1>}
    </div>
  );
};

export default PlayGround;
