import { createSlice, configureStore } from "@reduxjs/toolkit";

// Type MedData ....

export type MedDataType = {
  content: string;
  expiryDate: string;
  name: string;
  price: number;
  stock: number;
}[];
export type MedObjectType = {
  content: string;
  expiryDate: string;
  name: string;
  price: number;
  stock: number;
};
// UsersList Array
let usersList = localStorage.getItem("usersList");
let signUpState = [];
if (usersList) {
  signUpState = JSON.parse(usersList);
}

let signUpSlice = createSlice({
  name: "register",
  initialState: signUpState,
  reducers: {
    register: (state, action) => {
      state.push(action.payload.data);
      localStorage.setItem("usersList", JSON.stringify(state));
      localStorage.setItem(
        `${action.payload.userName}`,
        JSON.stringify(action.payload.userData)
      );
    },
  },
});
const signUpReducer = signUpSlice.reducer;
export const signUpActions = signUpSlice.actions;

// User Individual Data
let searchParam = new URLSearchParams(window.location.search);
let userId = searchParam.get("user");
let userInfo = localStorage.getItem(userId ? userId : "user");
let userData = JSON.parse(userInfo ? userInfo : "{}") || {};

let userDataSlice = createSlice({
  name: "userData",
  initialState: userData,
  reducers: {
    login: (state, action) => {
      let user = localStorage.getItem(`${action.payload}`);
      return user ? JSON.parse(user) : state;
    },
    addMedicine: (state, action) => {
      state;
      let arr = action.payload.detailsArr;
      let prev = localStorage.getItem(action.payload.userId);
      let prevState = prev ? JSON.parse(prev) : {};
      localStorage.setItem(
        `${action.payload.userId}`,
        JSON.stringify({
          ...prevState,
          medicineList: [...prevState.medicineList, ...arr],
        })
      );
      return {
        ...prevState,
        medicineList: [...prevState.medicineList, ...arr],
      };
    },
    deleteMedicine: (state, action) => {
      let list = action.payload.removeList;
      let user = action.payload.userId;
      let modified = state.medicineList.filter((item1: MedObjectType) => {
        return !list.some((item2: MedObjectType) => {
          return JSON.stringify(item2) == JSON.stringify(item1);
        });
      });
      console.log("Modified med list", modified);
      localStorage.setItem(
        user,
        JSON.stringify({ ...state, medicineList: modified })
      );
      return { ...state, medicineList: modified };
    },
    sellMedicine: (state, action) => {
      let list = action.payload.sellList;
      let user = action.payload.userId;

      state.medicineList.map((item1: MedObjectType) => {
        list.forEach((item2: { quantity: number; name: string }) => {
          if (item1.name == item2.name) {
            item1.stock = item1.stock - item2.quantity;
          }
        });
      });
      localStorage.setItem(user, JSON.stringify({ ...state }));
    },
    extraReducers: builder => {
      builder.addCase(
        signUpActions.register,
        (state: {}, action: { payload: { userData: any } }) => {
          state;
          return action.payload.userData;
        }
      );
    },
  },
});

export const userReducer = userDataSlice.reducer;
export const userActions = userDataSlice.actions;

export const Store = configureStore({
  reducer: {
    register: signUpReducer,
    userData: userReducer,
  },
});
Store.subscribe(() => console.log("updated state", Store.getState()));
