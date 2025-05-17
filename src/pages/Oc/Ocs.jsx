import { useEffect, useState } from "react";
import getOcsMethod from "../../services/getOcs";
import clsx from "clsx";
import OcElement from "./OcElement";
import Modal from "../../components/modals/Modal";

export default function Ocs() {
  const [ocs, setOcs] = useState([]);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const getOcs = async () => {
    const [serviceError, data] = await getOcsMethod();

    if (serviceError) {
      setErrorMessage(serviceError.message);
      setShowErrorModal(true);

      return;
    }

    if (data.status == "OK") setOcs(data.data);
  };

  useEffect(() => {
    getOcs();
  }, []);

  return (
    <>
      <div className="h-40"></div>
      <div
        className={clsx(
          "m-auto w-4/5 rounded-lg shadow-md",
          "dark:bg-gray-800 dark:shadow-gray-700 dark:border-gray-700",
          "bg-white border border-gray-200"
        )}
      >
        {ocs.map((oc) => {
          return oc.ocDetalles.map((item) => {
            return <OcElement item={item} />;
          });
        })}
      </div>

      <Modal
        hidden={showErrorModal}
        close={() => setShowErrorModal(false)}
        message={errorMessage}
        type={"error"}
      />
    </>
  );
}
