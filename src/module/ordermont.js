import ConfigApi from "../api";

const ordermontheindpost = {
    list:"orders-month/"
}

export const getOrdersMonth = async()=>
 await ConfigApi.get(ordermontheindpost.list);