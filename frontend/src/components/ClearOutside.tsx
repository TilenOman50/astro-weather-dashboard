import React from "react";

interface ClearOutsideProps {
  lat: number;
  lon: number;
  width?: string | number;
  height?: string | number;
}

export default function ClearOutside({
  lat,
  lon,
  width = "100%",
  height = 600,
}: ClearOutsideProps) {
  const url = `https://clearoutside.com/forecast/${lat}/${lon}`;

  return (
    <iframe
      src={url}
      width={width}
      height={height}
      frameBorder={0}
      scrolling="auto"
      title="Clear Outside Forecast"
      style={{ border: "none" }}
    />
  );
}
