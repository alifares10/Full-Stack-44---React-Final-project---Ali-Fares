import React, { useEffect } from "react";
import useFetchAll from "@/hooks/useFetchAll ";
import AnimatedNumbers from "react-animated-numbers";

const PurchasedAmount = () => {
  const { data, getData } = useFetchAll();

  useEffect(() => {
    getData("purchases");
  }, []);

  // useEffect(() => {
  //   callback(data);
  // }, [data]);

  return (
    <div
      className="flex flex-col justify-center items-center mx-auto p-5 border rounded-lg shadow-md
                     dark:shadow-gray-700 shadow-slate-600 font-bold tracking-wider m-2"
    >
      <h1 className="uppercase">Total Amount Of Purchashed products</h1>
      <AnimatedNumbers
        includeComma
        className=""
        transitions={(index) => ({
          type: "spring",
          duration: index + 0.2,
        })}
        animateToNumber={data.length}
        fontStyle={{
          fontSize: 30,
          color: "red",
        }}
      />
    </div>
  );
};

export default PurchasedAmount;
