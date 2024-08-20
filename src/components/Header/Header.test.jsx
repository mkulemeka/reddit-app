import { render, screen } from "@testing-library/react";

import Header from "./Header";
import { Provider } from "react-redux";
import { describe } from "vitest";
import store from "../../app/store";

describe("Header", () => {
  it("renders Header", () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );
    screen.debug();
  });

  // Header renders without crashing
  it("should render without crashing", () => {
    const { container } = render(
      <Provider store={store}>
        <Header setIsMenuOpen={() => {}} />
      </Provider>
    );
    expect(container).toBeInTheDocument();
  });

  // setIsMenuOpen is not provided
  it("should render without setIsMenuOpen", () => {
    const { container } = render(
      <Provider store={store}>
        <Header />
      </Provider>
    );
    expect(container).toBeInTheDocument();
  });
});
