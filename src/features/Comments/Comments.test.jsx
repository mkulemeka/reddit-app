import { render, screen } from "@testing-library/react";
import { useDispatch, useSelector } from "../../__mocks__/react-redux";

import Comments from "./Comments";
import { Provider } from "react-redux";
import { fetchComments } from "./commentsSlice";
import { vi } from "vitest";

// Mocks are automatically imported from the separate mock file

describe("Comments Component", () => {
  let dispatchMock;

  beforeEach(() => {
    dispatchMock = vi.fn();
    useDispatch.mockReturnValue(dispatchMock); // Mock dispatch
  });

  afterEach(() => {
    vi.clearAllMocks(); // Clear mocks after each test
  });

  test("should dispatch fetchComments on mount", () => {
    const permalink = "/r/test/comments/1";

    // Mock selectors
    useSelector
      .mockReturnValueOnce(false) // isLoadingComments
      .mockReturnValueOnce(false) // hasError
      .mockReturnValueOnce([]); // comments

    render(
      <Provider store={{}}>
        <Comments permalink={permalink} />
      </Provider>
    );

    expect(dispatchMock).toHaveBeenCalledWith(fetchComments(permalink));
  });

  test("should show loading when isLoadingComments is true", () => {
    // Mock selectors
    useSelector
      .mockReturnValueOnce(true) // isLoadingComments
      .mockReturnValueOnce(false) // hasError
      .mockReturnValueOnce([]); // comments

    render(
      <Provider store={{}}>
        <Comments permalink="/r/test/comments/1" />
      </Provider>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test("should show error message when hasError is true", () => {
    // Mock selectors
    useSelector
      .mockReturnValueOnce(false) // isLoadingComments
      .mockReturnValueOnce(true) // hasError
      .mockReturnValueOnce([]); // comments

    render(
      <Provider store={{}}>
        <Comments permalink="/r/test/comments/1" />
      </Provider>
    );

    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });

  test("should render comments when available", () => {
    const mockComments = [
      { id: "1", body: "Comment 1" },
      { id: "2", body: "Comment 2" },
      { id: "3", body: "Comment 3" },
    ];

    // Mock selectors
    useSelector
      .mockReturnValueOnce(false) // isLoadingComments
      .mockReturnValueOnce(false) // hasError
      .mockReturnValueOnce(mockComments); // comments

    render(
      <Provider store={{}}>
        <Comments permalink="/r/test/comments/1" />
      </Provider>
    );

    expect(screen.getByText("Comment 3")).toBeInTheDocument();
    expect(screen.queryByText("Comment 1")).not.toBeInTheDocument(); // Sliced out
    expect(screen.queryByText("Comment 2")).not.toBeInTheDocument(); // Sliced out
  });
});
