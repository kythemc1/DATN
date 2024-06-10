import { API } from "Configs/Constants/API";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useDebouncedCallback } from "use-debounce";
import axios from "axios";
import { setAuth, setNoti, setUser } from "Store/Reducers/authSlice";


export const useUser = () => {
  const dispatch = useDispatch();
  const [accountRegister, setAccountRegister] = useState<{
    username: string;
    email: string;
  }>({
    username: "",
    email: ""
  });

  const onSetAccountRegister = (field: "username" | "email", value: string) => {
    setAccountRegister({
      ...accountRegister,
      [field]: value
    });
  };


  const register = useDebouncedCallback(
    async ({ username, email }: { username: string; email: string }) => {

      try {
        const data = await axios({
          url: API.API_REGISTER,
          data: {
            username,
            email,
            "firstName": "",
            "lastname": "",
            "password": "1234",
            "age": "",
            "address": "",
            "phoneNumber": "",
            "listRole": ["user"]
          },
          method: "post"
        });
        if (data) {
          dispatch(setNoti({
            changePass: false,
            registerNoti: true,
            loginFalse: false,
            registerFalse: false,
            changePassFalse: false,
            forgotPass: false
          }));
        }
        dispatch(setNoti({
          forgotPass: false,
          changePassFalse: false,
          changePass: false,
          registerNoti: false,
          loginFalse: false,
          registerFalse: true
        }));
      } catch (erorr) {
        dispatch(setNoti({
          forgotPass: false,
          changePass: false,
          registerNoti: true,
          loginFalse: false,
          registerFalse: false,
          changePassFalse: false
        }));
      }
    }
  );

  const changePassword = useDebouncedCallback(
    async ({ username, password, newPassword }: { username: string; password: string; newPassword: string }) => {

      try {
        const data = await axios({
          url: API.API_CHANGE_PASSWORD,
          data: {
            username,
            password,
            newPassword
          },
          method: "put"
        });
        if (data.data) {
          dispatch(setAuth({
            isLogged: false,
            token: null,
            refreshToken: null,
            refreshTokenExpiredDate: null,
            type: null
          }));
          dispatch(setUser({
            id: null,
            address: null,
            authorities: null,
            avatar: null,
            birthday: null,
            firstName: null,
            gender: null,
            lastName: null,
            status: null,
            username: null
          }));
        }
        dispatch(setNoti({
          forgotPass: false,
          changePass: true,
          registerNoti: false,
          loginFalse: false,
          registerFalse: false,
          changePassFalse: false
        }));
      } catch (erorr) {
        dispatch(setNoti({
          forgotPass: false,
          changePass: false,
          registerNoti: false,
          loginFalse: false,
          registerFalse: false,
          changePassFalse: true
        }));
      }
    }
  );

  return {
    accountRegister,
    onSetAccountRegister,
    register,
    changePassword
  };
};
