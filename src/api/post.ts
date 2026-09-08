import api from "./client";
import type {
  GetPostsParams,
  CreatePostInput,
  ApiResponse,
  Post,
  PostListResponse,
} from "../types/api";

export const postApi = {
  getPosts: (getPostsParam?: GetPostsParams) => {
    return api.get<ApiResponse<PostListResponse>>("/api/posts", {
      params: getPostsParam,
    });
  },

  createPost: (createPostParam: CreatePostInput) => {
    return api.post<ApiResponse<Post[]>>("/api/posts", createPostParam);
  },

  deletePost: (postId: number) => {
    return api.delete<ApiResponse<null>>(`/api/posts/${postId}`);
  },

  getPostById: (postId: number) => {
    return api.get<ApiResponse<{ post: Post }>>(`/api/posts/${postId}`);
  },

  updatePost: (postId: number, postInput: CreatePostInput) => {
    return api.patch<ApiResponse<Post>>(`/api/posts/${postId}`, postInput);
  },

  reactPost: (postId: number) => {
    return api.post<ApiResponse<Post>>(`/api/posts/${postId}/react`);
  },
};
