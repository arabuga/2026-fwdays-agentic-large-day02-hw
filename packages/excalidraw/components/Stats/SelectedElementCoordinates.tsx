import { getCommonBounds } from "@excalidraw/element";
import React, { useMemo } from "react";

import { useExcalidrawAPI } from "../App";
import { useAppStateValue } from "../../hooks/useAppStateValue";

import { ElementCoordinates } from "./ElementCoordinates";

export type SelectedElementCoordinatesProps = {
  precision?: number;
  "data-testid"?: string;
};

export const SelectedElementCoordinates = ({
  precision,
  "data-testid": dataTestId,
}: SelectedElementCoordinatesProps) => {
  const api = useExcalidrawAPI();
  const selectedElementIds = useAppStateValue("selectedElementIds");

  const coordinates = useMemo(() => {
    if (!api || api.isDestroyed) {
      return null;
    }

    const elements = api.getSceneElements();
    const selectedElements = elements.filter((el) => selectedElementIds[el.id]);

    if (selectedElements.length === 0) {
      return null;
    }

    if (selectedElements.length === 1) {
      const [element] = selectedElements;
      return {
        x: element.x,
        y: element.y,
        width: element.width,
        height: element.height,
      };
    }

    const [x1, y1, x2, y2] = getCommonBounds(selectedElements);
    return {
      x: x1,
      y: y1,
      width: x2 - x1,
      height: y2 - y1,
    };
  }, [api, selectedElementIds]);

  if (!coordinates) {
    return null;
  }

  return (
    <ElementCoordinates
      x={coordinates.x}
      y={coordinates.y}
      width={coordinates.width}
      height={coordinates.height}
      precision={precision}
      data-testid={dataTestId}
    />
  );
};

