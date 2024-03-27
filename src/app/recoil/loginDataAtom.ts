import { atom } from "recoil";
import { User } from "../schemas/type";

export type UserDataProps = {
  id: number;
  scopes: string[];
  name: string;
  exp: number;
  data: null | User;
  loaded: boolean;
};

export const userDataAtom = atom<UserDataProps>({
  key: "userState",
  default: {
    id: 0,
    scopes: [],
    name: "",
    exp: 0,
    data: null,
    loaded: false,
  },
});
