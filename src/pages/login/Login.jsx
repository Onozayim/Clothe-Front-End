import clsx from "clsx";
import { loginService } from "../../services/login";
import { useState } from "react";
import DefaultButton from "../../components/buttons/DefaultButton";
import Input from "../../components/inputs/Input";
import Label from "../../components/labels/Label";
import Title from "../../components/labels/Title";
import ErrorLabel from "../../components/labels/ErrorLabel";
import Href from "../../components/router/Href";

import image from "../../assets/bg-image.jpg";

export default function Login() {
  const [error, setError] = useState("");

  console.log("login");

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginBody = {
      password: e.target.password.value,
      email: e.target.email.value,
    };

    const [serviceError, data] = await loginService(loginBody);

    console.log([serviceError, data]);

    if (serviceError) {
      setError("Credenciales incorrectas");
      return;
    }

    if (data?.status == "OK") {
      localStorage.setItem("jwt-token", data.data.token);
      window.location.href = "/";
    }
  };

  return (
    <>
      <form onSubmit={handleLogin}>
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
                <Title>INICIAR SESION</Title>

                <Label>Email</Label>
                <Input name={"email"} type={"text"} key={"email"} />

                <Label>Password</Label>
                <Input name={"password"} type={"password"} key={"password"} />

                {error && <ErrorLabel>{error}</ErrorLabel>}

                <DefaultButton type={"submit"}>Log in</DefaultButton>
                <Href url={"/register"}>¿No tienes cuenta? Registrate</Href>
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
