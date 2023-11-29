import { render } from "@testing-library/react";
import Sidenav from "../components/ui/sidenav";
import "@testing-library/jest-dom";

describe("Sidenav", () => {
  test("renders Sidenav", () => {
    const { getByTestId } = render(<Sidenav />);
    const buttonElement = getByTestId("sidenav");
    expect(buttonElement).toBeInTheDocument();
  });
});
