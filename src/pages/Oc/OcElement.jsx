import CLotheImage from "../../components/images/ClotheImage";
import Label from "../../components/labels/Label";
import Title from "../../components/labels/Title";

export default function OcElement({ item }) {
  return (
    <>
      <div className="flex border-b-1">
        <CLotheImage id={item.cltoheResponse.id} extraClass="w-72 h-auto" />
        <div className="p-8 w-full">
          <Title extraClassName={"!text-left"}>{item.cltoheResponse.title}</Title>
          <Label extraClassName="!text-xl block">
            {item.cltoheResponse.description}
          </Label>
          <Label extraClassName="!text-xl block w-full">
            Stock: {item.stock}
          </Label>
          <Label extraClassName="!text-xl block w-full">
            ${item.price}
          </Label>
        </div>
      </div>
    </>
  );
}

