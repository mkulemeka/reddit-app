import * as actualReactRedux from "react-redux"; // Import the actual react-redux module synchronously

import { vi } from "vitest";

// Mock the useDispatch hook
export const useDispatch = vi.fn();

// Optionally mock other hooks or use the actual implementations
export const useSelector = actualReactRedux.useSelector;

// Export everything from the actual react-redux module, overriding only what you mock
export default {
  ...actualReactRedux,
  useDispatch,
};
