import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchMainArticles, submitArticle } from './articlesAPI';

export interface Article {
  category: string;
  title: string;
  headline: string;
  description: string;
  author: string;
  urlToImage: string;
  content: string;
  publishedAt: string;
}

export interface MainArticlesState {
  articles: Article[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: MainArticlesState = {
  articles: [],
  status: 'idle',
};

export const getMainArticles = createAsyncThunk('/articles', async () => {
  const response: any = await fetchMainArticles();
  console.log('res', response.data);

  return response.data.articles;
});

export const postSubmitArticles = createAsyncThunk(
  '/userArticles/article-submission',
  async (payload: any) => {
    const response: any = await submitArticle(payload);
    console.log('res', response);

    return response;
  }
);

export const articleSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMainArticles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getMainArticles.fulfilled, (state, action) => {
        state.status = 'idle';
        console.log('action', action.payload);
        state.articles = action.payload;
      })
      .addCase(getMainArticles.rejected, (state) => {
        state.status = 'failed';
        state.articles = [];
      });
  },
});

export const {} = articleSlice.actions;

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

export default articleSlice.reducer;
