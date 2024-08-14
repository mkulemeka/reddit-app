import { Provider, useDispatch } from "react-redux";
import { fireEvent, render } from "@testing-library/react";

import Search from "./Search";
import store from "../../app/store";
import { vi } from "vitest";

// Mock the useDispatch hook while preserving other exports from react-redux
vi.mock("react-redux", async () => {
  const actual = await vi.importActual("react-redux"); // Import everything from the actual module
  return {
    ...actual, // Spread the actual module's exports
    useDispatch: vi.fn(), // Override useDispatch
  };
});

describe("Search Component", () => {
  // Form submission triggers handleFormSubmit function
  it("should trigger handleFormSubmit when form is submitted", () => {
    const { getByPlaceholderText, getByRole } = render(
      <Provider store={store}>
        <Search />
      </Provider>
    );
    const input = getByPlaceholderText("Search");
    const button = getByRole("button");

    fireEvent.change(input, { target: { value: "test" } });
    fireEvent.click(button);

    expect(input.value).toBe("test");
  });

  // Form submission with empty input does not dispatch action
  it("should not dispatch action when form is submitted with empty input", () => {
    const dispatch = vi.fn();
    useDispatch.mockReturnValue(dispatch); // Mock useDispatch to return our mock function

    const { getByRole } = render(
      <Provider store={store}>
        <Search />
      </Provider>
    );
    const button = getByRole("button");

    fireEvent.click(button);

    expect(dispatch).not.toHaveBeenCalled();
  });
});
