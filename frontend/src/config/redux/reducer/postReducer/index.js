import { createSlice } from "@reduxjs/toolkit";
import { reset } from "../authReducer";
import { toggleLike, getAllPosts, getAllComments } from "../../action/postAction";

const initialState = {
  posts: [],
  isError: false,
  postFetched: false,
  isLoading: false,
  loggedIn: false,
  message: "",
  comments: [],
  postId: "",
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    reset: () => initialState,
    resetPostId: (state) => {
      state.postId = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPosts.pending, (state) => {
        state.isLoading = true;
        state.message = "Fetching all the posts....";
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.postFetched = true;
        console.log(action.payload);
        state.posts = action.payload.reverse();
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(toggleLike.fulfilled, (state, action) => {
        state.message = action.payload.message;
      })
      .addCase(getAllComments.fulfilled, (state, action) => {
        // state.isLoading = false;
        state.postId = action.payload.post_id;
        state.comments = action.payload.Comments;
      });

    // .addCase(getAllComments.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.isError = true;
    //   state.message = action.payload;
    // });
  },
});

export const { resetPostId } = postSlice.actions;

export default postSlice.reducer;
