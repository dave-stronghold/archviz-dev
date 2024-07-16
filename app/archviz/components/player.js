export default function Player() {
  return (
    <>
      <div className="absolute w-full aspect-video ">
        <video
          muted
          key={"foreground"}
          className="w-full"
          src={vdo.path}
          autoPlay={true}
          loop={vdo.loop}
          preload="auto"
          onCanPlay={() => setShowFg(false)}
          onPlay={handleVideoStart}
          onEnded={handleVideoEnd}
        ></video>
      </div>
      <div className="w-full aspect-video">
        <video
          preload="auto"
          onLoadedMetadata={(e) => setVideoDuration(e.target.duration)}
          onPlay={(e) => handlePause(e)}
          muted
          key={"background"}
          className="w-full"
          src={vdo_b.path}
          autoPlay={true}
          loop={vdo_b.loop}
        ></video>
      </div>
    </>
  );
}
