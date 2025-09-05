import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { StopCard } from "../StopCard";
import { StopEntity } from "@/domain/entities/Stop";

describe("StopCard", () => {
  const mockStop = new StopEntity(
    "1",
    "Central Station",
    48.8566,
    2.3522,
    ["A", "B", "C"],
    "CS01",
  );

  const mockOnPress = jest.fn();

  beforeEach(() => {
    mockOnPress.mockClear();
  });

  it("renders stop information correctly", () => {
    const { getByText } = render(
      <StopCard stop={mockStop} onPress={mockOnPress} distance={0.5} />,
    );

    expect(getByText("Central Station")).toBeTruthy();
    expect(getByText("Stop CS01")).toBeTruthy();
    expect(getByText("500m")).toBeTruthy();
    expect(getByText("A")).toBeTruthy();
    expect(getByText("B")).toBeTruthy();
    expect(getByText("C")).toBeTruthy();
  });

  it("renders without distance when not provided", () => {
    const { queryByText } = render(
      <StopCard stop={mockStop} onPress={mockOnPress} />,
    );

    expect(queryByText("500m")).toBeNull();
  });

  it("renders without code when not provided", () => {
    const stopWithoutCode = new StopEntity("2", "City Hall", 48.8566, 2.3522, [
      "A",
    ]);

    const { queryByText } = render(
      <StopCard stop={stopWithoutCode} onPress={mockOnPress} />,
    );

    expect(queryByText(/Stop/)).toBeNull();
  });

  it("formats distance correctly", () => {
    const { getByText, rerender } = render(
      <StopCard stop={mockStop} onPress={mockOnPress} distance={1.5} />,
    );

    expect(getByText("1.5km")).toBeTruthy();

    rerender(<StopCard stop={mockStop} onPress={mockOnPress} distance={0.3} />);

    expect(getByText("300m")).toBeTruthy();
  });

  it("calls onPress when card is pressed", () => {
    const { getByTestId } = render(
      <StopCard stop={mockStop} onPress={mockOnPress} />,
    );

    const card = getByTestId("stop-card-1");
    fireEvent.press(card);

    expect(mockOnPress).toHaveBeenCalledWith(mockStop);
  });
});
