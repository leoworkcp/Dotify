import { useEffect } from "react";

const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

export default ({
  trackProgress,
  trackDuration,
  startTime,
  setTrackProgress,
  trackPlaying,
}) => {
  useEffect(() => {
    let animation;
    if (trackPlaying) {
      animation = window.requestAnimationFrame(() => {
        const trackProgressPerc =
          ((Date.now() - startTime) * 100) / trackDuration;
        setTrackProgress(clamp(trackProgressPerc, 0, 100));
      });
    }
    return () => {
      window.cancelAnimationFrame(animation);
    };
  }, [trackPlaying, trackDuration, startTime, trackProgress]);
};
