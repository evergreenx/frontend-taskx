import React from "react";
import { render } from "@testing-library/react";
import AvailableBalance from "../components/ui/revenue/available-balance";
import "@testing-library/jest-dom";

describe("AvailableBalance", () => {
  test("renders with the provided balance", () => {
    const balance = 100; // Set the balance value for the test

    const { getByText } = render(
      <AvailableBalance balance={balance} data={[]} />
    );

    const availableBalanceText = getByText(`USD ${balance}`);
    expect(availableBalanceText).toBeInTheDocument();
  });

  test("does not render when balance is undefined", () => {
    const { container } = render(
      <AvailableBalance balance={undefined} data={[]} />
    );
    expect(container.firstChild).toBeNull();
  });
});
