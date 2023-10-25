import ConfigApi from "../api"

const orderEndpoints = {
  list:"/orders"
}

export const getOrder = async (params) =>
  await ConfigApi.get(orderEndpoints.list, {params});