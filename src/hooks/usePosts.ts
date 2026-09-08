import { useCallback, useState } from "react";

import { getErrorMessage } from "../utils/errorHelper";
import type { GetPostsParams, CreatePostInput, Post } from "../types/api";
import { postApi } from "../api/post";

export function usePosts() {
  const [loading, setLoading] = useState<boolean>(false);
  const [post, setPost] = useState<Post | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = useCallback(async (getPostParams?: GetPostsParams) => {
    setLoading(true);
    try {
      const response = await postApi.getPosts(getPostParams);
      setPosts(response.data.data.posts);
      return {
        success: true,
        message: "Posts fetched successfully",
        data: response.data.data,
      };
    } catch (error) {
      return {
        success: false,
        message: getErrorMessage(error, "Fetch posts failed"),
      };
    } finally {
      setLoading(false);
    }
  }, []);

  const getPostById = useCallback(async (postId: number) => {
    setLoading(true);
    try {
      const response = await postApi.getPostById(postId);
      console.log("response ", response);
      const fetchedPost = response.data?.data?.post;
      setPost(fetchedPost);
      return {
        success: true,
        message: "Post fetched successfully",
        data: response.data.data,
      };
    } catch (error) {
      return {
        success: false,
        message: getErrorMessage(error, "Fetch post failed"),
      };
    } finally {
      setLoading(false);
    }
  }, []);

  const createPost = async (createPostParams: CreatePostInput) => {
    setLoading(true);
    try {
      const response = await postApi.createPost(createPostParams);
      return {
        success: true,
        message: response.data.message,
        data: response.data.data,
      };
    } catch (error) {
      return {
        success: false,
        message: getErrorMessage(error, "Create posts failed"),
      };
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (postId: number) => {
    setLoading(true);
    try {
      await postApi.deletePost(postId);
      return { success: true, message: "Post deleted successfully" };
    } catch (error) {
      return {
        success: false,
        message: getErrorMessage(error, "Failed to delete post."),
      };
    } finally {
      setLoading(false);
    }
  };

  const updatePost = async (postId: number, postInput: CreatePostInput) => {
    setLoading(true);
    try {
      const response = await postApi.updatePost(postId, postInput);
      return {
        success: true,
        message: "Post updated successfully",
        data: response.data.data,
      };
    } catch (error) {
      return {
        success: false,
        message: getErrorMessage(error, "Failed to update post."),
      };
    } finally {
      setLoading(false);
    }
  };

  const togglePost = async (postId: number) => {
    try {
      const response = await postApi.reactPost(postId);
      return {
        success: true,
        message: "Post reacted",
        data: response.data.data,
      };
    } catch (error) {
      return {
        success: false,
        message: getErrorMessage(error, "Failed to toggle post reaction"),
      };
    } finally {
      setLoading(true);
    }
  };

  return {
    post,
    posts,
    loading,
    fetchPosts,
    createPost,
    deletePost,
    updatePost,
    getPostById,
    togglePost,
  };
}
