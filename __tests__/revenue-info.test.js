import React from "react";
import { render } from "@testing-library/react";
import RevenueInfo from "../components/ui/revenue/revenue-info";
import "@testing-library/jest-dom";

const mockData = {
  ledger_balance: 500,
  total_payout: 1000,
  total_revenue: 1500,
  pending_payout: 200,
};

describe("RevenueInfo", () => {
  test("renders wallet cards with provided data", () => {
    const { getByText } = render(<RevenueInfo data={mockData} />);

    expect(getByText("Ledger Balance")).toBeInTheDocument();
    expect(getByText("Total Payout")).toBeInTheDocument();
    expect(getByText("Total Revenue")).toBeInTheDocument();
    expect(getByText("Pending Payout")).toBeInTheDocument();

    expect(getByText("USD 500.00")).toBeInTheDocument();
    expect(getByText("USD 1000.00")).toBeInTheDocument();
    expect(getByText("USD 1500.00")).toBeInTheDocument();
    expect(getByText("USD 200.00")).toBeInTheDocument();
  });
});
