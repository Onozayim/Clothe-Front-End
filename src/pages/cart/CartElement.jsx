import CLotheImage from "../../components/images/ClotheImage";
import Label from "../../components/labels/Label";
import Title from "../../components/labels/Title";
import { MdDelete } from "react-icons/md";
import { deleteFromCart } from "../../services/deleteFromCart";
import Modal from "../../components/modals/Modal";
import { useState } from "react";
import DefaultButton from "../../components/buttons/DefaultButton";
import Input from "../../components/inputs/Input";
import { updateFromCart } from "../../services/updateCart";

export default function CartElement({
  item,
  price,
  setPrice,
  items,
  setItems,
}) {
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [actualStock, setActualStock] = useState(item.stock);
  const [initialStock, setInitialStock] = useState(item.stock);
  const [limitStock, setLimitStock] = useState(item.stockId.stock);
  const [errorMessage, setErrorMessage] = useState("");
  const [individualPrice, setIndividualPrice] = useState(item.totalPrice);

  const totalStock = item.stock + item.stockId.stock;

  const deleteItem = async (item) => {
    const [serviceError, data] = await deleteFromCart(item.id);

    if (serviceError) {
      setErrorMessage(serviceError.message);
      setShowErrorModal(true);

      return;
    }

    if (data.status == "OK") {
      setItems(items.filter((cart) => cart.id != item.id));
      setPrice(price - item.totalPrice);
    }
  };

  const handleUpdateStock = async() => {
    const [serviceError, data] = await updateFromCart({
      id: item.id,
      stock: actualStock
    });

    if (serviceError) {
      setErrorMessage(serviceError.message);
      setShowErrorModal(true);

      return;
    }

    if (data.status == "OK") {
      setLimitStock(totalStock - actualStock);
      setInitialStock(actualStock);

      const pastPrice = individualPrice;
      const newIndividualPrice = item.price * actualStock;
      const priceGap = newIndividualPrice - pastPrice;

      setPrice(price + priceGap);
      setIndividualPrice(newIndividualPrice);

      setShowModal(true);
    }

  }

  const handleStockChange = (e) => {
    setActualStock(e.target.value);
  };

  if (!item) return null;

  return (
    <>
      <div className="sm:flex border-b-1">
        <CLotheImage id={item.clothe.id} extraClass="w-72 h-auto mx-auto" />
        <div className="p-8 w-full mx-auto">
          <Title extraClassName={"sm:!text-left "}>
            {item.clothe.title} ({item.stockId.size})
          </Title>
          <Label extraClassName="!text-xl block sm:!text-left text-center">
            {item.clothe.description}
          </Label>
          <Label extraClassName="!text-xl block w-full sm:!text-left text-center">
            ${individualPrice}
          </Label>
          <div className="flex justify-center sm:justify-start">
            <DefaultButton
              onClick={() => deleteItem(item)}
              extraClass="!bg-red-600 !w-32 !flex !h-12 mt-5 hover:bg-red-800 justify-center"
            >
              <MdDelete className="text-3xl flex" />
              <Label extraClassName="text-xl">Eliminar</Label>
            </DefaultButton>

            <div className="flex h-min ml-3 mt-5">
              <div className="w-24">
                <Input
                  type={"number"}
                  extraClass="!rounded-r-none !h-12 !rounded-l-none !mt-0 h-full !p-2.5 border"
                  minValue={0}
                  maxValue={item.stockId.stock + initialStock}
                  value={actualStock}
                  onChange={handleStockChange}
                />
              </div>
              <div className="flex items-center justify-center align-middle ml-3">
                <Label extraClassName="!text-xl">/{limitStock}</Label>
              </div>
              {actualStock != initialStock && (
                <DefaultButton
                  onClick={handleUpdateStock}
                  extraClass="!w-32 !flex !h-12 ml-5 justify-center"
                >
                  <Label extraClassName="text-xl">Guardar</Label>
                </DefaultButton>
              )}
            </div>
          </div>
        </div>
      </div>

      <Modal
        hidden={showErrorModal}
        close={() => setShowErrorModal(false)}
        message={errorMessage}
        type={"error"}
      />

      <Modal
        hidden={showModal}
        close={() => setShowModal(false)}
        message={"Carrito Actualizado!"}
        type={"indo"}
      />
    </>
  );
}
