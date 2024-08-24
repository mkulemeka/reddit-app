import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import SidePanel from "./SidePanel";
import SubReddits from "../../features/Subreddits/SubReddits";

// Mock the SubReddits component to isolate testing of SidePanel
vi.mock("../../features/Subreddits/SubReddits", () => {
  return {
    __esModule: true,
    default: () => <div data-testid="subreddits"><SubReddits /></div>,
  };
});

describe("SidePanel Component", () => {
  it("renders the SidePanel with SubReddits component", () => {
    render(<SidePanel />);
    
    // Check if the aside element is present
    const asideElement = screen.getByRole("complementary");
    expect(asideElement).toBeInTheDocument();
    
    // Check if the SubReddits component is present
    const subRedditsElement = screen.getByTestId("subreddits");
    expect(subRedditsElement).toBeInTheDocument();
  });
});
