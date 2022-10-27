import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { fetchTestNews } from "./newsAPI";

interface News {
  title: string;
  source: string;
  description: string;
  author: string;
  url: string;
}

export interface BreakingNewsState {
  value: News[];
  status: "idle" | "loading" | "failed";
}

const initialState: BreakingNewsState = {
  value: [],
  status: "idle",
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const getTestNews = createAsyncThunk("/news", async () => {
  const response: any = await fetchTestNews();
  // The value we return becomes the `fulfilled` action payload
  console.log(response.data);
  return response.data;
});

export const newsSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTestNews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTestNews.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(getTestNews.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const {} = newsSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
// export const selectCount = (state: RootState) => state.counter.value;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd =
//   (amount: number): AppThunk =>
//   (dispatch, getState) => {
//     const currentValue = selectCount(getState());
//     if (currentValue % 2 === 1) {
//       dispatch(incrementByAmount(amount));
//     }
//   };

export default newsSlice.reducer;
