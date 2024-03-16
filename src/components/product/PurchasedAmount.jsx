import React, { useEffect } from "react";
import useFetchAll from "@/hooks/useFetchAll ";

const PurchasedAmount = () => {
  const { data, getData } = useFetchAll();

  useEffect(() => {
    getData("purchases");
  }, []);

  // useEffect(() => {
  //   callback(data);
  // }, [data]);

  return (
    <div className="flex flex-col justify-center items-center mx-auto p-5">
      <h1>Purchased Amount</h1>
      <p>{data.length}</p>
    </div>
  );
};

export default PurchasedAmount;
