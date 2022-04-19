import http from "@/utils/http-common.js"

export const getAllCharacters = () => http.get("/characters")