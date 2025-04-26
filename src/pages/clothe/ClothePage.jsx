import { useParams } from "react-router-dom";
import Title from "../../components/labels/Title";
import Label from "../../components/labels/Label";
import DefaultButton from "../../components/buttons/DefaultButton";
import clsx from "clsx";
import { useEffect, useState } from "react";
import getClotheApi from "../../services/getClothe";
import Input from "../../components/inputs/Input";

import consts from "../../consts";

const sizes = {
  s: "Chico", 
  m: "Mediana", 
  b: "Grande", 
};

const stocks = {
  s: 0, 
  m: 0, 
  b: 0, 
};

export default function ClothePage() {
  const params = useParams();
  const [clothe, setClothe] = useState(null);
  const [stock, setStock] = useState(0);
  const [stockLimit, setStockLimit] = useState(0);

  const getClothe = async () => {
    const [serviceError, data] = await getClotheApi(params.id);
    setClothe(data.data);
    console.log(data.data);

    data.data.stocks.forEach(item => {
      stocks[item.size] = item.stock;
    })
    
    setStockLimit(stocks['s']);
  };

  const handleStockLimitChange = (e) => {
    setStockLimit(stocks[e.target.value]);
  }

  const handleStockChange = (e) => {
    setStock(e.target.value);
  }

  useEffect(() => {
    getClothe();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center h-full justify-center ">
        <div className="block lg:flex rounded-lg w-full w-full items-center ">
          <div
            className={
              "flex lg:w-4/6 h-screen w-full h-full lg:relative top-0 left-0 justify-center items-center"
            }
          >
            <img
              src={`${consts.api_url}v1/public/clothe/image/${clothe?.id}`}
              className="w-3/5 h-3/5 bg-red-700 rounded-xl"
            />
          </div>
          <div className="flex items-center justify-center w-1/2 mx-auto lg:w-2/6 h-full px-6 left-0 right-0 mb-24 lg:mb-0">
            <div
              className={clsx(
                "space-y-6 rounded-xl w-full shadow-xl opacity-95  p-6 sm:p-10",
                "dark:bg-gray-800 shadow-gray-700 lg:bg-white/5",
                "shadow-gray-400 bg-white"
              )}
            >
              <Title>{clothe?.title}</Title>

              <Label>{clothe?.description}</Label>
              <br />
              <div className="flex">
                <div className="w-4/5 h-12">
                  <select
                    id=""
                    className={clsx(
                      "border-2 block h-full w-full p-2.5 text-sm rounded-l-lg",
                      "bg-gray-50 border border-gray-300 text-gray-900 border-s-gray-100 focus:ring-blue-500 focus:border-blue-500",
                      "dark:border-s-gray-700  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    )}
                    onChange={handleStockLimitChange}
                  >
                    {clothe?.stocks.map((item) => (
                      <>
                        <option value={item.size}>{sizes[item.size]}</option>
                      </>
                    ))}
                  </select>
                </div>
                <div className="w-1/5 h-12">
                  <Input
                    type={"number"}
                    value={stock}
                    extraClass="!rounded-r-lg !rounded-l-none !mt-0 h-full !p-2.5 border"
                    onChange={handleStockChange}
                    maxValue={stockLimit}
                    minValue={0}
                  />
                </div>
                <div className="flex items-center justify-center align-middle h-12 ml-3">
                  <Label extraClassName="!text-xl">/{stockLimit}</Label>
                </div>
              </div>
              <DefaultButton type={"submit"}>Add to cart</DefaultButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
