import { round } from "@excalidraw/math";
import React from "react";

export type ElementCoordinatesProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  precision?: number;
  "data-testid"?: string;
};

export const ElementCoordinates = ({
  x,
  y,
  width,
  height,
  precision = 2,
  "data-testid": dataTestId = "element-coordinates",
}: ElementCoordinatesProps) => {
  const format = (value: number) => String(round(value, precision));

  return (
    <dl className="exc-element-coordinates" data-testid={dataTestId}>
      <div>
        <dt>X</dt>
        <dd>{format(x)}</dd>
      </div>
      <div>
        <dt>Y</dt>
        <dd>{format(y)}</dd>
      </div>
      <div>
        <dt>W</dt>
        <dd>{format(width)}</dd>
      </div>
      <div>
        <dt>H</dt>
        <dd>{format(height)}</dd>
      </div>
    </dl>
  );
};

