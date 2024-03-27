import React, { useEffect, useState } from "react";
import FloatingInput from "./input/FloatingInput";
import { AlertMessage, User } from "../schemas/type";
import axios from "axios";
import jwt from "jwt-decode";
import Alert from "./Alert";
import useUserFirstLogin from "../Hooks/useUserFirstLogin";
import { useRecoilState } from "recoil";
import { userDataAtom } from "../recoil/loginDataAtom";

const Login = () => {
  //Hooks================================>
  const [userInput, setUserInput] = useState<User>({
    username: "",
    password: "",
    scope: "user",
  });
  const [alertM, setAlertM] = useState<AlertMessage>({
    status: "hidden",
    message: "",
  });
  const [userData, setUserData] = useRecoilState(userDataAtom);
  console.log("ユーザーデータ", userData);

  //<==================================Hooks

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const validateInput = () => {
    if (!userInput.username || !userInput.password) {
      setAlertM({
        status: "bg-red-500",
        message: "ユーザー名とパスワードを入力してください",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateInput()) {
      return;
    }
    postUserData();
  };
  function postUserData() {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/token`, userInput, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((response) => {
        let info = jwt(response.data.access_token) as {
          id: number;
          name: string;
          exp: number;
        };

        // Set the user info in our global state
        if (typeof window !== "undefined") {
          setUserData({
            id: info.id,
            scopes: [], // set empty array
            name: info.name,
            exp: info.exp,
            data: userInput,
            loaded: true,
          });
          // set local storage
          window.localStorage.setItem("ut", response.data.access_token);
        }
        setUserInput({ username: "", password: "", scope: "user" });
      })
      .catch((error: any) => {
        console.error(error);
        setAlertM({
          status: "bg-red-500",
          message: "ログインに失敗しました",
        });
      });
  }

  return (
    <>
      <div className="fixed inset-0 h-full w-full flex justify-center items-center bg-black opacity-70">
        <div className="flex items-center justify-center flex-col">
          <div className="bg-slate-50 p-8 rounded-lg">
            <p className="text-3xl font-bold text-center">アカウント認証</p>
            <div className="grid gap-y-5 mt-8">
              <FloatingInput
                title="User Name"
                name="username"
                value={userInput.username}
                onChange={handleChange}
                type="text"
                placeholder={"ユーザー名を入力してください"}
                // err={hasError("username") ? true : false}
                err={false}
                errMsg={"間違ってるよ"}
              />
              <FloatingInput
                title="Password"
                name="password"
                value={userInput.password}
                onChange={handleChange}
                type="password"
                placeholder={"パスワードを入力してください"}
                // err={hasError("username") ? true : false}
                err={false}
                errMsg={"間違ってるよ"}
              />
            </div>
            <form onSubmit={handleSubmit}>
              <button className="bg-white rounded-lg shadow-md hover:bg-gray-100 mt-8 border w-full h-10">
                ログイン
              </button>
            </form>
          </div>
          <Alert alertType={alertM.status} alertMessage={alertM.message} />
        </div>
      </div>
    </>
  );
};

export default Login;
