import clsx from "clsx";
import { loginService } from "../../services/login";
import { useState } from "react";
import DefaultButton from "../../components/buttons/DefaultButton";
import Input from "../../components/inputs/Input";
import Label from "../../components/labels/Label";
import Title from "../../components/labels/Title";
import ErrorLabel from "../../components/labels/ErrorLabel";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  console.log("login")

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginBody = {
      password: e.target.password.value,
      email: e.target.email.value,
    };

    const [serviceError, data] = await loginService(loginBody);

    console.log([serviceError, data]);

    if (serviceError?.message == "Credenciales incorrectas") {
      setError(serviceError.message);
      return;
    }

    if(data.status == "OK") {
      localStorage.setItem("jwt-token", data.data.token);
      navigate("/");
    }

  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <div className="flex flex-col items-center h-full justify-center ">
          <div className="flex rounded-lg w-full w-full items-center ">
            <div className=" lg:block lg:w-2/5 px-6 mx-auto absolute lg:relative z-10 m-auto left-0 right-0 ">
              <div
                className={clsx(
                  "space-y-6 rounded-xl w-full shadow-xl opacity-95  p-6 sm:p-10",
                  "dark:bg-gray-800 shadow-gray-700 lg:bg-white/5",
                  "shadow-gray-400 bg-white"
                )}
              >
                <Title>INICIAR SESION</Title>

                <Label>Email</Label>
                <Input name={"email"} type={"email"} key={"email"} />

                <Label>Password</Label>
                <Input name={"password"} type={"password"} key={"password"} />

                {error && <ErrorLabel>{error}</ErrorLabel>}

                <DefaultButton type={"submit"}>Log in</DefaultButton>
              </div>
            </div>
            <div className="lg:block lg:w-3/5 h-screen w-full absolute bg-red-700 lg:relative top-0 left-0 z-0 bg-[url('https://images4.alphacoders.com/236/236764.jpg')] bg-center bg-cover"></div>
          </div>
        </div>
      </form>
    </>
  );
}
