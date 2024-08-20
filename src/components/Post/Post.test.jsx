import { render, screen } from "@testing-library/react";

import Post from "./Post";
import { describe } from "vitest";

describe("Post", () => {
  it("renders Post", () => {
    render(<Post />);
    screen.debug();
  });

  // Renders correctly with all props provided
  it("should render correctly with all props provided", () => {
    const { getByText, getByAltText } = render(
      <Post
        title="Sample Title"
        author="Author Name"
        thumbnail="sample-thumbnail.jpg"
        num_comments={10}
        ups={100}
      />
    );

    expect(getByText("Sample Title")).toBeInTheDocument();
    expect(getByAltText("Sample Title")).toBeInTheDocument();
    expect(getByText("100")).toBeInTheDocument();
    expect(getByText("10")).toBeInTheDocument();
    expect(getByText("Author Name")).toBeInTheDocument();
  });

  // Renders correctly with missing thumbnail
  it("should render correctly with missing thumbnail", () => {
    const { getByText, queryByAltText } = render(
      <Post title="Sample Title" author="Author Name" num_comments={10} ups={100} />
    );

    expect(getByText("Sample Title")).toBeInTheDocument();
    expect(queryByAltText("Sample Title")).toBeNull();
    expect(getByText("100")).toBeInTheDocument();
    expect(getByText("10")).toBeInTheDocument();
    expect(getByText("Author Name")).toBeInTheDocument();
  });
});
