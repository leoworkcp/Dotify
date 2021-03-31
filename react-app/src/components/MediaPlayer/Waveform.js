import React, { useRef, useEffect, useState, useCallback } from "react";
import classes from "./Waveform.css";

import waveformAvgChunker from "./waveformAvgChunker";
import useSetTrackProgress from "./useSetTrackProgress";

const pointCoordinates = ({
  index,
  pointWidth,
  pointMargin,
  canvasHeight,
  amplitude,
}) => {
  const pointHeight = Math.round((amplitude / 100) * canvasHeight);
  const verticalCenter = Math.round((canvasHeight - pointHeight) / 2);
  return [
    index * (pointWidth + pointMargin), // x starting point
    canvasHeight - pointHeight - verticalCenter, // y starting point
    pointWidth, // width
    pointHeight, // height
  ];
};

const paintCanvas = ({
  canvasRef,
  waveformData,
  canvasHeight,
  pointWidth,
  pointMargin,
  playingPoint,
  hoverXCoord,
}) => {
  const ref = canvasRef.current;
  const ctx = ref.getContext("2d");
  // On every canvas update, erase the canvas before painting
  // If you don't do this, you'll end up stacking waveforms and waveform
  // colors on top of each other
  ctx.clearRect(0, 0, ref.width, ref.height);
  waveformData.forEach((p, i) => {
    ctx.beginPath();
    const coordinates = pointCoordinates({
      index: i,
      pointWidth,
      pointMargin,
      canvasHeight,
      amplitude: p,
    });
    ctx.rect(...coordinates);
    const withinHover = hoverXCoord >= coordinates[0];
    const alreadyPlayed = i < playingPoint;
    if (withinHover) {
      ctx.fillStyle = alreadyPlayed ? "#94b398" : "#badebf";
    } else if (alreadyPlayed) {
      ctx.fillStyle = "#228741";
    } else {
      ctx.fillStyle = "#88bf99";
    }
    ctx.fill();
  });
};

const Waveform = ({ waveformData, waveformMeta }) => {
  const canvasRef = useRef();
  const chunkedData = waveformAvgChunker(waveformData);
  const waveformWidth = 500;
  const canvasHeight = 56;
  const pointWidth = 4;
  const pointMargin = 1;
  const { trackDuration } = waveformMeta;
  const [trackProgress, setTrackProgress] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());
  const [trackPlaying, setTrackPlaying] = useState(true);
  const [hoverXCoord, setHoverXCoord] = useState();
  const playingPoint =
    (trackProgress * waveformWidth) / 100 / (pointWidth + pointMargin);
  const paintWaveform = useCallback(() => {
    paintCanvas({
      canvasRef,
      waveformData: chunkedData,
      canvasHeight,
      pointWidth,
      pointMargin,
      playingPoint,
      hoverXCoord,
    });
  }, [playingPoint]);

  useSetTrackProgress({
    trackProgress,
    setTrackProgress,
    trackDuration,
    startTime,
    trackPlaying,
  });

  useEffect(() => {
    if (canvasRef.current) {
      paintWaveform();
    }
  }, [canvasRef]);

  useEffect(() => {
    paintWaveform();
  }, [playingPoint]);

  const setDefaultX = useCallback(() => {
    setHoverXCoord();
  }, []);

  const handleMouseMove = useCallback((e) => {
    setHoverXCoord(e.clientX - canvasRef.current.getBoundingClientRect().left);
  }, []);

  const seekTrack = (e) => {
    const xCoord = e.clientX - canvasRef.current.getBoundingClientRect().left;
    const seekPerc = (xCoord * 100) / waveformWidth;
    const seekMs = (trackDuration * seekPerc) / 100;
    setStartTime(Date.now() - seekMs);
  };

  return (
    <div style={{ padding: 16 }}>
      <canvas
        className={classes.canvas}
        style={{ height: canvasHeight }}
        ref={canvasRef}
        height={canvasHeight}
        width={waveformWidth}
        onBlur={setDefaultX}
        onMouseOut={setDefaultX}
        onMouseMove={handleMouseMove}
        onClick={seekTrack}
      />
    </div>
  );
};

export default Waveform;
