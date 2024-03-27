"use client";
import React, { useEffect, useState } from "react";
import { useRouter, redirect } from "next/navigation";
import { useRecoilState } from "recoil";
import jwt from "jwt-decode";
import { userDataAtom } from "../recoil/loginDataAtom";

const useUserFirstLogin = () => {
  const router = useRouter();
  // const userData = useRecoilValue(userDataAtom); // useRoilState is better
  // const setUserData = useSetRecoilState(userDataAtom); // useRoilState is better
  const [userData, setUserData] = useRecoilState(userDataAtom);

  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async (id: number) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/get?id=${id}`
      );
      const json = await response.json();
      return json; // return the data
    } catch (error) {
      console.log("Failed to fetch data from API", error);
      setIsLoading(false);
      return null;
    }
  };

  const checkExpired = (decodedToken: any) => {
    const currentTime = Math.floor(Date.now() / 1000); // current time in seconds
    if (currentTime - decodedToken.exp > 0) {
      // if the token is expired
      // console.log("Your session expired. exp at ", userData.exp);
      localStorage.removeItem("ut"); // remove token from local storage
      setUserData({
        // reset adminDataAtom state
        id: 0,
        scopes: [],
        name: "",
        exp: 0,
        data: null,
        loaded: true,
      });
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      if (userData.id === 0) {
        const storedToken = localStorage.getItem("ut");

        if (storedToken) {
          const decodedToken: any = jwt(storedToken);
          if (decodedToken && decodedToken.id) {
            const expired = checkExpired(decodedToken);
            if (!expired) {
              const apiData = await fetchData(decodedToken.id);
              setUserData({
                id: decodedToken.id,
                scopes: decodedToken.scopes,
                name: decodedToken.name,
                exp: decodedToken.exp,
                data: apiData,
                loaded: true,
              });
              setIsLoading(false);
            }
          }
        } else {
          setUserData({
            id: 0,
            scopes: [],
            name: "",
            exp: 0,
            data: null,
            loaded: true,
          });
        }
      }
    };

    checkAuth();
  }, []);

  // const isActivated = userData?.data?.activated;

  console.log("userDataHook Running...", userData);

  return { userData, setUserData, isLoading };
};
export default useUserFirstLogin;
