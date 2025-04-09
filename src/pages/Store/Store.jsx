import { useEffect, useState } from "react";
import allClothes from "../../services/allclothes";
import ClotheCard from "./ClotheCard";
import clsx from "clsx";
import Pagination from "../../components/Pagination/Pagination";

export default function Store() {
  const [clothes, setClothes] = useState(null);
  const [page, setPage] = useState(1);

  const getClothes = async () => {
    const [serviceError, data] = await allClothes(page - 1);
    setClothes(data.data);
  };

  useEffect(() => {
    getClothes();
  }, [page]);

  return (
    <>
      <div className="h-40"></div>
      <div className="w-9/10 m-auto grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 grid-rows-auto gap-4">
        {clothes?.content?.map((data) => {
          return <ClotheCard data={data} key={data.id} />;
        })}
      </div>
      {clothes && (
        <Pagination
          currentPage={page}
          totalCount={clothes.totalElements}
          pageSize={clothes.size}
          totalPageCount={clothes.totalPages}
          onPageChange={setPage}
        />
      )}
      <div className="h-10"></div>
    </>
  );
}
