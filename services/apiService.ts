import axios from "axios";

// API use url
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const fetchData = async <T>(path: string): Promise<T> => {
  try {
    const response = await axios.get<T>(`${baseUrl}/${path}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch data");
  }
};

const API = {
  getUserData: async () => {
    return await fetchData<UserDataInterface>("user");
  },

  getWalletDetails: async () => {
    return await fetchData<WalletDetailsInterface>("wallet");
  },


  getTransactionlList: async () => {
    return await fetchData<TransactioniInterface[]>("transactions");
  },
};

export default API;
