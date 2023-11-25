"use client";
import React, { useEffect, useState } from "react";

import API from "@/services/apiService";
import { Box } from "@chakra-ui/react";
import { motion } from 'framer-motion';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

export const options = {
  responsive: true,
  scales: {
    x: {
      border: {
        display: false,
      },
      grid: {
        display: false,
      },
    },

    y: {
      display: false,
      border: {
        display: false,
      },
      grid: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: false,
    },
  },
};
const transactionData = [
  {
    amount: 500,
    metadata: {
      name: "John Doe",
      type: "digital_product",
      email: "johndoe@example.com",
      quantity: 1,
      country: "Nigeria",
      product_name: "Rich Dad Poor Dad",
    },
    payment_reference: "c3f7123f-186f-4a45-b911-76736e9c5937",
    status: "successful",
    type: "deposit",
    date: "2022-03-03",
  },
  {
    amount: 400,
    metadata: {
      name: "Fibi Brown",
      type: "coffee",
      email: "fibibrown@example.com",
      quantity: 8,
      country: "Ireland",
    },
    payment_reference: "d28db158-0fc0-40cd-826a-4243923444f7",
    status: "successful",
    type: "deposit",
    date: "2022-03-02",
  },
  {
    amount: 350.56,
    metadata: {
      name: "Delvan Ludacris",
      type: "webinar",
      email: "johndoe@example.com",
      quantity: 1,
      country: "Kenya",
      product_name: "How to build an online brand",
    },
    payment_reference: "73f45bc0-8f41-4dfb-9cae-377a32b71d1e",
    status: "successful",
    type: "deposit",
    date: "2022-03-01",
  },
  {
    amount: 300,
    status: "successful",
    type: "withdrawal",
    date: "2022-03-01",
  },
  {
    amount: 300,
    metadata: {
      name: "Shawn kane",
      type: "webinar",
      email: "shawnkane@example.com",
      quantity: 1,
      country: "United Kingdom",
      product_name: "Support my outreach",
    },
    payment_reference: "c22055e5-8f47-4059-a1e9-51124d325992",
    status: "successful",
    type: "deposit",
    date: "2022-02-28",
  },
  {
    amount: 200,
    status: "successful",
    type: "withdrawal",
    date: "2022-03-01",
  },
  {
    amount: 200,
    metadata: {
      name: "Ada Eze",
      type: "webinar",
      email: "adaeze1@example.com",
      quantity: 1,
      country: "Nigeria",
      product_name: "Learn how to pitch your idea",
    },
    payment_reference: "5b2988d9-395e-4a91-984b-8b02f0d12df9",
    status: "successful",
    type: "deposit",
    date: "2022-02-20",
  },
];

const formattedDates = transactionData.map((transaction) => {
  const date = new Date(transaction.date);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});

const amounts = transactionData.map((transaction) => transaction.amount);

export const data = {
  labels: formattedDates,
  datasets: [
    {
      label: "Transaction Amounts",
      data: amounts,

      borderColor: "#FF5403",
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      borderWidth: 1,
      pointRadius: 1,
      pointBackgroundColor: "rgba(75, 192, 192, 1)",
      pointBorderColor: "rgba(75, 192, 192, 1)",
      pointHoverRadius: 6, // Adjust hover point size
      pointHoverBackgroundColor: "rgba(75, 192, 192, 1)",
      pointHoverBorderColor: "rgba(75, 192, 192, 1)",
      tension: 0.4, // Adjust line curve
    },
  ],
};

export default function Chart() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [walletDetails, setWalletDetails] = useState<
    WalletDetailsInterface | undefined
  >(undefined);

  useEffect(() => {
    const fetchWalletDetails = async () => {
      try {
        const response = await API.getWalletDetails();

        setWalletDetails(response);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    fetchWalletDetails();
  }, []);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip
  );


  const chartVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1.5 } },
  };

  if (isLoading) {
    return "loading";
  }

  return (
    <Box
    initial="hidden"
    animate="visible"
    variants={chartVariants}
    as={motion.div}
    w={["100%", "765px"]}>
      <Line options={options} data={data} />
    </Box>
  );
}
