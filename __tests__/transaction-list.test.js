import React from "react";
import { render } from "@testing-library/react";
import TransactionList from "../components/ui/revenue/transaction-list";
import "@testing-library/jest-dom";

const mockTransactionsData = [

  {
    type: "deposit",
    metadata: {
      product_name: "Some Product",
      type: "some_type",
      name: "Some Name",
    },
    status: "successful",
    amount: 100,
    date: new Date().toISOString(),
  },

];

describe("TransactionList", () => {
  test("renders transaction list with provided data", () => {
    const { getByText, getAllByRole } = render(
      <TransactionList
        setFilterTransactionsData={() => {}}
        filtertransactionsData={mockTransactionsData}
        transactionsData={mockTransactionsData}
      />
    );

    // Check for specific transaction information
    mockTransactionsData.forEach((transaction) => {
      const productName =
        transaction.metadata?.product_name || "Cash withdrawal";
      const formattedDate = new Date(transaction.date).toLocaleDateString(
        "en-US",
        {
          year: "numeric",
          month: "short",
          day: "numeric",
        }
      );

      // Check for rendered transaction details like product name, amount, and date
      expect(getByText(productName)).toBeInTheDocument();
      expect(getByText(`USD ${transaction.amount}`)).toBeInTheDocument();
      expect(getByText(formattedDate)).toBeInTheDocument();
    });

    // Check for the filter button
    expect(getByText("Filter")).toBeInTheDocument();


    // Check for the presence of list items
    const listItems = getAllByRole("listitem");
    expect(listItems.length).toBe(mockTransactionsData.length);
  });

  test("renders empty state when no transactions are available", () => {
    const { getByText } = render(
      <TransactionList
        setFilterTransactionsData={() => {}}
        filtertransactionsData={[]}
        transactionsData={mockTransactionsData}
      />
    );

    // Check for the empty state message
    expect(
      getByText("No matching transaction found for the selected filter")
    ).toBeInTheDocument();


  });
});
