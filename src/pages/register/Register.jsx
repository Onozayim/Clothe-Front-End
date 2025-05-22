import clsx from "clsx";
import { registerService } from "../../services/register";
import { useState } from "react";
import DefaultButton from "../../components/buttons/DefaultButton";
import Input from "../../components/inputs/Input";
import Label from "../../components/labels/Label";
import Title from "../../components/labels/Title";
import ErrorLabel from "../../components/labels/ErrorLabel";
import Href from "../../components/router/Href";
import { FaPhoneAlt } from "react-icons/fa";

import image from "../../assets/bg-image.jpg";

export default function Register() {
  const [errors, setErrors] = useState([]);
  const [error, setError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    const loginBody = {
      password: e.target.password.value,
      email: e.target.email.value,
      fullName: e.target.fullName.value,
      confirmPassword: e.target.confirmPassword.value,
    };

    const [serviceErrors, data] = await registerService(loginBody);

    if (serviceErrors) {
      if (Array.isArray(serviceErrors)) setErrors(serviceErrors);
      else setError(serviceErrors);

      return;
    }

    if (data?.status == "OK") {
      localStorage.setItem("jwt-token", data.data.token);
      window.location.href = "/";
    }
  };

  const handlePhoneNumberChange = (e) => {
    if (e.target.value.length > phoneNumber.length) {
      if (phoneNumber == "") setPhoneNumber("(+52) " + e.target.value);
      else if (e.target.value.length == 10)
        setPhoneNumber(
          e.target.value.substring(0, 9) + "-" + e.target.value[9]
        );
      else if (e.target.value.length == 14)
        setPhoneNumber(
          e.target.value.substring(0, 13) + "-" + e.target.value[13]
        );
      else if (e.target.value.length >= 19) return;
      else setPhoneNumber(e.target.value);
    } else {
      if (e.target.value.length <= 5) return;
      setPhoneNumber(e.target.value);
    }

    console.log(...(phoneNumber + phoneNumber));
  };

  return (
    <>
      <form onSubmit={handleRegister}>
        <div
          style={{ backgroundImage: `url('${image}')` }}
          className="flex flex-col items-center min-h-screen justify-center bg-center bg-cover lg:!bg-none"
        >
          <div className="flex rounded-lg w-full w-full items-center ">
            <div className=" lg:block lg:w-2/5 px-6 mx-auto block lg:relative z-10 mt-36 mb-36  left-0 right-0 top-1/6">
              <div
                className={clsx(
                  "space-y-6 rounded-xl w-full shadow-xl opacity-95  p-6 sm:p-10",
                  "dark:bg-gray-800 shadow-gray-700 lg:bg-white/5",
                  "shadow-gray-400 bg-white"
                )}
              >
                <Title>Register</Title>

                <Label>Username</Label>
                <Input name={"fullName"} type={"text"} key={"fullName"} />

                <Label>Email</Label>
                <Input name={"email"} type={"text"} key={"email"} />

                <Label>Password</Label>
                <Input name={"password"} type={"password"} key={"password"} />

                <Label>Confirm password</Label>
                <Input
                  name={"confirmPassword"}
                  type={"password"}
                  key={"confirmPassword"}
                />

                <Label>Número télefonico</Label>
                <div class="relative">
                  <div class="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                    <FaPhoneAlt className="text-gray-600 dark:text-gray-300" />
                  </div>
                  <Input
                    type={"text"}
                    name={"phoneNumber"}
                    key={"phoneNumber"}
                    extraClass="pl-10"
                    placeholder={"(+52) 123-456-7890"}
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                  />
                </div>

                {errors &&
                  errors.map((item) => <ErrorLabel>{item}</ErrorLabel>)}
                {error && <ErrorLabel>{error}</ErrorLabel>}

                <DefaultButton type={"submit"}>Register</DefaultButton>
                <Href url={"/register"}>¿Ya tienes cuenta? Inicia sesion</Href>
              </div>
            </div>
            <div
              style={{ backgroundImage: `url('${image}')` }}
              className={`lg:block lg:w-3/5 h-screen w-full hidden lg:relative bg-center bg-cover`}
            ></div>
          </div>
        </div>
      </form>
    </>
  );
}
