import api from "@/lib/axios";

export const likePost = async (postId: number) => {
  const res = await api.post(`/api/posts/${postId}/like`);
  return res.data.data;
};

export const unlikePost = async (postId: number) => {
  const res = await api.delete(`/api/posts/${postId}/like`);
  return res.data.data;
};

export const savePost = async (postId: number) => {
  const res = await api.post(`/api/posts/${postId}/save`);
  return res.data.data;
};

export const unsavePost = async (postId: number) => {
  const res = await api.delete(`/api/posts/${postId}/save`);
  return res.data.data;
};

export const getSavedPosts = async (page = 1, limit = 20) => {
  const res = await api.get("/api/me/saved", {
    params: { page, limit },
  });

  return res.data.data;
};

export const createPost = async ({
  image,
  caption,
}: {
  image: File;
  caption: string;
}) => {
  const formData = new FormData();

  formData.append("image", image);
  formData.append("caption", caption);

  const res = await api.post("/api/posts", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data.data;
};
