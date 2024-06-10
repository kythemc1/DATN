import { API } from "Configs/Constants/API";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logout, setAuth, setNoti, setUser } from "Store/Reducers/authSlice";
import { useDebouncedCallback } from "use-debounce";
import Navigator from "../../Utils/Navigator";
import axios from "axios";

export const useAuth = () => {
  const dispatch = useDispatch();
  const [account, setAccount] = useState<{
    username: string;
    password: string;
  }>({
    username: "",
    password: ""
  });

  const onSetAccount = (field: "username" | "password", value: string) => {
    setAccount({
      ...account,
      [field]: value
    });
  };

  const onLogout = () => {
    dispatch(logout());
    Navigator.reset("SignIn");
  };

  const login = useDebouncedCallback(
    async ({ username, password }: { username: string; password: string }) => {

      try {
        const data = await axios({
          url: API.API_AUTH_LOGIN,
          data: {
            username,
            password
          },
          method: "post"
        });
        if (data.data.userName) {
          dispatch(setAuth({
            isLogged: true,
            token: data.data.accessToken,
            refreshToken: data.data.refreshToken,
            refreshTokenExpiredDate: null,
            type: data.data.type
          }));
          dispatch(setUser({
            id: null,
            address: data.data.address,
            authorities: data.data.listRole,
            avatar: null,
            birthday: null,
            firstName: data.data.firstName,
            gender: null,
            lastName: data.data.lastname,
            status: null,
            username: data.data.userName
          }));
          Navigator.reset("TabNavigation");

        }
        else {
          dispatch(setNoti({
            forgotPass: false,
            changePass: false,
            registerNoti: false,
            loginFalse: true,
            registerFalse: false,
            changePassFalse: false
          }));
        }
      } catch (erorr) {
        dispatch(setNoti({
          forgotPass: false,
          changePass: false,
          registerNoti: false,
          loginFalse: true,
          registerFalse: false,
          changePassFalse: false
        }));

      }
    }
  );
  return {
    account,
    onSetAccount,
    onLogout,
    login
  };
};
