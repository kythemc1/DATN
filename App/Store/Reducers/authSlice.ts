import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface IAuthState {
  isLogged: boolean;
  token: string | null;
  refreshToken: string | null;
  refreshTokenExpiredDate: number | null;
  type: string | null;
}

interface IUserState {
  id: number | null;
  address: string | null;
  authorities: string[] | null;
  avatar: string | null;
  birthday: Date | null;
  firstName: string | null;
  gender: string | null;
  lastName: string | null;
  status: string | null;
  username: string | null;
}

const initialState = {
  auth: {} as IAuthState,
  user: {} as IUserState | null,
  noti : {} as INotification | null
  // api_key : {} as API_KEY | null,
};

interface INotification  {
  loginFalse : boolean | false,
  changePass : boolean | false,
  registerNoti : boolean | false,
  registerFalse : boolean | false,
  changePassFalse : boolean | false,
  forgotPass : boolean | false,

}

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<IAuthState>) => {
      state.auth = action.payload;
    },
    setUser: (state, action: PayloadAction<IUserState>) => {
      state.user = action.payload;
    },
    logout: state => {
      state.auth = {
        isLogged: false,
        token: null,
        refreshToken: null,
        refreshTokenExpiredDate: null,
        type: null,
      };
      state.user = null;
    },

    setNoti : (state,action:PayloadAction<INotification>)=>{
      state.noti = action.payload
    }
  },
});

export const {setAuth, setUser, logout,setNoti } = authSlice.actions;

export default authSlice.reducer;
