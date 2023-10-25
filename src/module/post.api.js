import ConfigApi from "../api";

const postEndpoints = {
  list: "/portfolio",
  add: "/post/create",
  updated: "/post/update/",
  delete: "/post/delete/",
};

export const getPost = async (params) =>
  await configureApi.get(postEndpoints.list, {
    params: {
      page: 1,
      pageSize: 10,
      ...params,
    },
  });

export const createPost = async (data) =>
  await ConfigApi.post(postEndpoints.add, { data });

// export const deletePost = async (id) =>
//   await configureApi.delete(postEndpoints.delete + id);

// export const getByIdPost = async (id) =>
//   await configureApi.get(postEndpoints.list + id);

// export const getProductByPost = async (id) =>
//   await configureApi.get(postEndpoints.list + "/list/" + id);

// export const updatePost = async (id, data) =>
//   await configureApi.patch(postEndpoints.delete + id, { data });

