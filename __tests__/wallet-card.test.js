import React from 'react';
import { render } from '@testing-library/react';
import WalletCard from '../components/ui/revenue/wallet-card';
import "@testing-library/jest-dom";


describe('WalletCard', () => {
  test('renders with provided props', () => {
    const mockTitle = 'Ledger Balance';
    const mockAmount = 500;
    const mockLabel = 'Represents the current balance as per the ledger records';

    const { getByText } = render(
      <WalletCard title={mockTitle} amount={mockAmount} label={mockLabel} />
    );

    expect(getByText(mockTitle)).toBeInTheDocument();
    expect(getByText(`USD ${mockAmount.toFixed(2)}`)).toBeInTheDocument();
    expect(getByText(mockLabel)).toBeInTheDocument();
  });
});
