import consts from "../../consts";
import clsx from "clsx";

export default function CLotheImage({ id, extraClass = "" }) {
  return (
    <img
      className={clsx("p-8 rounded-t-lg", extraClass)}
      src={`${consts.api_url}v1/public/clothe/image/${id}`}
      alt="product image"
    />
  );
}
