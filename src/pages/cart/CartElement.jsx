import CLotheImage from "../../components/images/ClotheImage";
import Label from "../../components/labels/Label";
import Title from "../../components/labels/Title";
import { MdDelete } from "react-icons/md";
import { deleteFromCart } from "../../services/deleteFromCart";

export default function CartElement({ item, price, setPrice, items, setItems }) {
  const deleteItem = async (item) => {
    const [errors, data] = await deleteFromCart(item.id);

    if(errors)
      alert(errors.message);

    if(data.status == "OK") {
      setItems(items.filter(cart => cart.id != item.id))
      setPrice(price - item.totalPrice);
    }
  };

  return (
    <>
      <div className="flex border-b-1">
        <CLotheImage id={item.clothe.id} extraClass="w-72 h-auto" />
        <div className="p-8 w-full">
          <Title extraClassName={"!text-left"}>{item.clothe.title}</Title>
          <Label extraClassName="!text-xl block">
            {item.clothe.description}
          </Label>
          <Label extraClassName="!text-xl block w-full">
            Stock: {item.stock} ({item.stockId.size})
          </Label>
          <Label extraClassName="!text-xl block w-full">
            ${item.totalPrice}
          </Label>
          <Label
            onClick={() => deleteItem(item)}
            extraClassName="!text-xl block w-full"
          >
            
            <MdDelete className="text-3xl"/>
          </Label>
        </div>
      </div>
    </>
  );
}
