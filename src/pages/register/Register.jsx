import clsx from "clsx";
import { registerService } from "../../services/register";
import { useState } from "react";
import DefaultButton from "../../components/buttons/DefaultButton";
import Input from "../../components/inputs/Input";
import Label from "../../components/labels/Label";
import Title from "../../components/labels/Title";
import ErrorLabel from "../../components/labels/ErrorLabel";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  console.log("register");

  const handleRegister = async (e) => {
    e.preventDefault();

    const loginBody = {
      password: e.target.password.value,
      email: e.target.email.value,
      fullName: e.target.fullName.value,
      confirmPassword: e.target.confirmPassword.value
    };

    const [serviceErrors, data] = await registerService(loginBody);

    console.log([serviceErrors, data]);

    if (serviceErrors) {
      setErrors(serviceErrors);
      return;
    }

    if (data.status == "OK") {
      localStorage.setItem("jwt-token", data.data.token);
      navigate("/");
    }
  };

  return (
    <>
      <form onSubmit={handleRegister}>
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
                <Title>Register</Title>

                <Label>Username</Label>
                <Input name={"fullName"} type={"text"} key={"fullName"} />

                <Label>Email</Label>
                <Input name={"email"} type={"text"} key={"email"} />

                <Label>Password</Label>
                <Input name={"password"} type={"password"} key={"password"} />

                <Label>Confirm password</Label>
                <Input name={"confirmPassword"} type={"password"} key={"confirmPassword"} />

                {errors && 
                    errors.map(error => (
                        <ErrorLabel>{error}</ErrorLabel>
                    ))
                }

                <DefaultButton type={"submit"}>Register</DefaultButton>
              </div>
            </div>
            <div className="lg:block lg:w-3/5 h-screen w-full absolute bg-red-700 lg:relative top-0 left-0 z-0 bg-[url('https://images4.alphacoders.com/236/236764.jpg')] bg-center bg-cover"></div>
          </div>
        </div>
      </form>
    </> 
  );
}
