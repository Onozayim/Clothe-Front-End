import { useEffect, useState } from "react";
import getCartService from "../../services/getCart";
import clsx from "clsx";
import CartElement from "./CartElement";
import DefaultButton from "../../components/buttons/DefaultButton";
import Label from "../../components/labels/Label";
import { orderOc } from "../../services/orderOc";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/modals/Modal";

export default function Cart() {
  const [showModal, setShowModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [cartElements, setCartElements] = useState([]);
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();

  const getCart = async () => {
    const [serviceError, data] = await getCartService();

    if (serviceError) {
      setErrorMessage(serviceError.message);
      setShowErrorModal(true);

      return;
    }

    if (data.status == "OK") setCartElements(data.data);

    let newPrice = 0;
    data.data.forEach((item) => {
      newPrice += item.totalPrice;
    });

    setPrice(newPrice);
  };

  const postOrderOc = async () => {
    const [serviceError, data] = await orderOc();

    console.log(serviceError);

    if (serviceError) {
      setErrorMessage(serviceError.message);
      setShowErrorModal(true);

      return;
    }

    if (data.status == "OK") navigate("/");
  };

  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
      <div className="h-40"></div>
      <div
        className={clsx(
          "m-auto w-4/5 sm:min-w-150 rounded-lg shadow-md",
          "dark:bg-gray-800 dark:shadow-gray-700 dark:border-gray-700",
          "bg-white border border-gray-200"
        )}
      >
        {cartElements.map((item) => {
          return (
            <CartElement
              item={item}
              key={item.id}
              price={price}
              setPrice={setPrice}
              items={cartElements}
              setItems={setCartElements}
              totalPrice={price}
            />
          );
        })}
      </div>
      <div className="w-4/5 m-auto mt-3 text-right">
        <Label extraClassName="block !text-2xl mb-5">Total: ${price}</Label>
        {cartElements.length > 0 && (
          <DefaultButton onClick={() => setShowModal(true)} extraClass="!w-24">
            Comprar
          </DefaultButton>
        )}
      </div>
      <div className="h-24"></div>
      <Modal />
      <Modal
        hidden={showModal}
        close={() => setShowModal(false)}
        action={postOrderOc}
        message={"Estas seguro que quieres realizar la compra?"}
        type={"info"}
      />
      <Modal
        hidden={showErrorModal}
        close={() => setShowErrorModal(false)}
        message={errorMessage}
        type={"error"}
      />
    </>
  );
}
