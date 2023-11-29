"use client";
import React, { useEffect, useState } from "react";

import API from "@/services/apiService";
import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Text } from "@chakra-ui/react";

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

export default function Chart({
  data,
}: {
  data: TransactioniInterface[] | undefined;
}) {
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

  const formattedDates = data?.map((transaction: TransactioniInterface) => {
    const date = new Date(transaction.date);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  });

  const amounts = data?.map(
    (transaction: TransactioniInterface) => transaction.amount
  );

  const dataChart = {
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


  return (
    <Box
      initial="hidden"
      animate="visible"
      variants={chartVariants}
      as={motion.div}
      w={["100%", "765px"]}
    >

      {
        data?.length === 0 ?   <Text color="brand.100" mt={'100px'} textAlign="center" fontSize="18px">
        No data available for the chart.
      </Text> : (
      <Line options={options} data={dataChart} />

        )
      }
    </Box>
  );
}
