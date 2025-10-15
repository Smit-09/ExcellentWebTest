import React from "react";
// import axiosClient from "../api/axiosClient";
// import { useAuth } from "../context/AuthContext";
// import { useQuery } from "@tanstack/react-query";

// interface Product {
//   id: number;
//   name: string;
// }

// const fetchProducts = async (): Promise<User[]> => {
//   const { data } = await axiosClient.get("/products");
//   return data;
// };

const Dashboard: React.FC = () => {
    // const { logout } = useAuth();

  // const { data: products, isLoading, isError, error } = useQuery<User[], Error>({
  //   queryKey: ["products"],
  //   queryFn: fetchProducts,
  // });

  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-semibold mb-4">Dashboard</h1>

      <div className="mt-10">

      </div>
    </div>
  );
};

export default Dashboard;
