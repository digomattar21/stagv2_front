import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { fetchTestNews } from './newsAPI';

export interface Article {
  title: string;
  source: string;
  description: string;
  author: string;
  url: string;
  urlToImage: string;
  content: string;
  publishedAt: string;
}

export interface BreakingNewsState {
  news: Article[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: BreakingNewsState = {
  news: [],
  status: 'idle',
};

export const getTestNews = createAsyncThunk('/news', async () => {
  let response: any = await fetchTestNews();
  if (response.data && !response.data.articles) {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 2);
    response = await fetchTestNews({
      from: yesterday.toISOString().split('T')[0],
      to: today.toISOString().split('T')[0],
    });
  }
  return response.data;
});

export const newsSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTestNews.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getTestNews.fulfilled, (state, action) => {
        state.status = 'idle';
        state.news = action.payload.news;
      })
      .addCase(getTestNews.rejected, (state) => {
        state.status = 'failed';
        state.news = [];
      });
  },
});

export const {} = newsSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
// export const selectBreakingNews = (state: RootState) => state.breakingNews;

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
