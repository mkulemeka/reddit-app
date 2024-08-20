import { Provider, useDispatch } from "react-redux";
import { fireEvent, render } from "@testing-library/react";

import Search from "./Search";
import store from "../../app/store";
import { vi } from "vitest";

// Mock the useDispatch hook
vi.mock("react-redux", async () => {
  const actual = await vi.importActual("react-redux"); // Import everything from the actual module
  return {
    ...actual, // Spread the actual module's exports
    useDispatch: vi.fn(), // Override useDispatch
  };
});

describe("Search Component", () => {
  let dispatch;

  beforeEach(() => {
    dispatch = vi.fn(); // Create a mock function for dispatch
    useDispatch.mockReturnValue(dispatch); // Mock useDispatch to return our mock dispatch
  });

  afterEach(() => {
    vi.clearAllMocks(); // Clear mock history between tests
  });

  // Test form submission triggers handleFormSubmit function
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

    // Check that the input value was updated
    expect(input.value).toBe("test");

    // Ensure dispatch was called
    expect(dispatch).toHaveBeenCalled();
  });

  // Test form submission with empty input does not dispatch action
  it("should not dispatch action when form is submitted with empty input", () => {
    const { getByRole } = render(
      <Provider store={store}>
        <Search />
      </Provider>
    );

    const button = getByRole("button");
    fireEvent.click(button);

    // Ensure dispatch was not called
    expect(dispatch).not.toHaveBeenCalled();
  });
});
