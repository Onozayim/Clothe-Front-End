import { IoAlertCircleOutline } from "react-icons/io5";
import { BsQuestionCircle } from "react-icons/bs";
import clsx from "clsx";

export default function Modal({ hidden, close, action = null, message, type }) {
  console.log(hidden);
  return (
    <div
      id="popup-modal"
      tabIndex="-1"
      className={`fixed inset-0 z-50 flex justify-center items-center ${
        !hidden ? "hidden" : ""
      }`}
    >
      <div className="absolute inset-0 bg-black opacity-75"></div>

      <div className="relative z-10 p-4 w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg dark:bg-gray-700">
          <button
            type="button"
            onClick={close}
            className="absolute top-3 right-3 text-gray-400 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="p-6 text-center">
            {type == "error" ? (
              <IoAlertCircleOutline
                className="mx-auto text-4lg text-gray-600 dark:text-white"
                size={"70px"}
              />
            ) : "" || type == "info" ? (
              <BsQuestionCircle
                className="mx-auto text-4lg text-gray-600 dark:text-white"
                size={"70px"}
              />
            ) : (
              ""
            )}

            <h3 className="mb-5 mt-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {message}
            </h3>
            {action ? (
              <button
                type="button"
                onClick={action}
                className={`w-24 flex justify-center items-center text-white focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 ${type == "error" ? "bg-red-600" : ""} ${type == "info" ? "bg-blue-700 dark:bg-blue-600" : ""}`}
              >
                Si
              </button>
            ) : (
              ""
            )}
            <button
              type="button"
              onClick={close}
              className="py-2.5 px-5 ml-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 w-24"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
