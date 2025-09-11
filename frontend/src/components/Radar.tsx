import React from "react";

export default function Radar() {
  return (
    <iframe
      className="radar-iframe"
      src="https://www.vremeradar.si/vremenski-radar?center=45.9,14.56&zoom=9&layer=wr&period=periodCurrentHighRes"
      title="Weather Radar"
    />
  );
}
