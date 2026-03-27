import { act, render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";

import { getDefaultAppState } from "../../appState";
import { ExcalidrawAPIContext } from "../App";
import { AppStateObserver } from "../AppStateObserver";
import { SelectedElementCoordinates } from "./SelectedElementCoordinates";

import type { ExcalidrawImperativeAPI, AppState } from "../../types";

const createAppState = (): AppState => ({
  ...getDefaultAppState(),
  width: 0,
  height: 0,
  offsetLeft: 0,
  offsetTop: 0,
});

const createMockAPI = ({
  initialState,
  elements,
}: {
  initialState: AppState;
  elements: { id: string; x: number; y: number; width: number; height: number }[];
}) => {
  let state = initialState;
  const observer = new AppStateObserver(() => state);

  return {
    api: {
      isDestroyed: false,
      getAppState: () => state,
      onStateChange: observer.onStateChange,
      getSceneElements: () => elements,
    } as Pick<
      ExcalidrawImperativeAPI,
      "isDestroyed" | "getAppState" | "onStateChange" | "getSceneElements"
    > as ExcalidrawImperativeAPI,
    updateAppState: (partial: Partial<AppState>) => {
      const prevState = state;
      state = { ...state, ...partial };
      observer.flush(prevState);
    },
  };
};

describe("SelectedElementCoordinates", () => {
  it("rerenders when selection changes and shows x/y/w/h", () => {
    const { api, updateAppState } = createMockAPI({
      initialState: createAppState(),
      elements: [
        { id: "a", x: 10, y: 20, width: 30, height: 40 },
        { id: "b", x: 100, y: 200, width: 300, height: 400 },
      ],
    });

    render(
      <ExcalidrawAPIContext.Provider value={api}>
        <SelectedElementCoordinates />
      </ExcalidrawAPIContext.Provider>,
    );

    // initially no selection -> nothing rendered
    expect(screen.queryByTestId("element-coordinates")).toBeNull();

    act(() => {
      updateAppState({
        selectedElementIds: { a: true },
      });
    });

    const root = screen.getByTestId("element-coordinates");
    expect(root).toHaveTextContent("X");
    expect(root).toHaveTextContent("Y");
    expect(root).toHaveTextContent("W");
    expect(root).toHaveTextContent("H");
    expect(root).toHaveTextContent("10");
    expect(root).toHaveTextContent("20");
    expect(root).toHaveTextContent("30");
    expect(root).toHaveTextContent("40");

    act(() => {
      updateAppState({
        selectedElementIds: { b: true },
      });
    });

    expect(root).toHaveTextContent("100");
    expect(root).toHaveTextContent("200");
    expect(root).toHaveTextContent("300");
    expect(root).toHaveTextContent("400");
  });
});

