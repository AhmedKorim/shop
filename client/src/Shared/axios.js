import axios from "axios";

export const axiosBase = axios.create({
    baseURL: "http://home.test/ajax/server"
})
