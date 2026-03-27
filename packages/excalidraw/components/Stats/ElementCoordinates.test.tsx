import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";

import { ElementCoordinates } from "./ElementCoordinates";

describe("ElementCoordinates", () => {
  it("renders x, y, width, height (rounded by default)", () => {
    render(<ElementCoordinates x={1.111} y={2.222} width={3.333} height={4.444} />);

    const root = screen.getByTestId("element-coordinates");
    expect(root).toHaveTextContent("X");
    expect(root).toHaveTextContent("Y");
    expect(root).toHaveTextContent("W");
    expect(root).toHaveTextContent("H");

    expect(root).toHaveTextContent("1.11");
    expect(root).toHaveTextContent("2.22");
    expect(root).toHaveTextContent("3.33");
    expect(root).toHaveTextContent("4.44");
  });

  it("supports custom precision", () => {
    render(
      <ElementCoordinates
        x={10.555}
        y={20.555}
        width={30.555}
        height={40.555}
        precision={0}
      />,
    );

    const root = screen.getByTestId("element-coordinates");
    expect(root).toHaveTextContent("11");
    expect(root).toHaveTextContent("21");
    expect(root).toHaveTextContent("31");
    expect(root).toHaveTextContent("41");
  });
});

