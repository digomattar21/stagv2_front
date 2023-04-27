import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import newsReducer from '../features/news/newsSlice';
import authReducer from '../features/authentication/authSlice';
import articlesReducer from '../features/articles/articlesSlice';

export const store = configureStore({
  reducer: {
    breakingNews: newsReducer,
    auth: authReducer,
    articles: articlesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
