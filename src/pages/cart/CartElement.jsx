import CLotheImage from "../../components/images/ClotheImage";
import Label from "../../components/labels/Label";
import Title from "../../components/labels/Title";

export default function CartElement({ item }) {
  return (
    <>
      <div className="flex border-b-1">
        <CLotheImage id={item.clothe.id} extraClass="w-72 h-auto" />
        <div className="p-8 w-full">
          <Title extraClassName={"!text-left"}>{item.clothe.title}</Title>
          <Label extraClassName="!text-xl block">{item.clothe.description}</Label>
          <Label extraClassName="!text-xl block w-full">Stock: {item.stock} ({item.stockId.size})</Label>
          <Label extraClassName="!text-xl block w-full">Eliminar</Label>
        </div>
      </div>
    </>
  );
}
