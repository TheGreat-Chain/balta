import { URL_QCM } from "./config.js";
import axios from "axios";

function createQCM(qcm) {
    return axios.post(URL_QCM, qcm);
}

function modifyQCM(id, qcm) {
    return axios.put(URL_QCM + `/${id}`, qcm)
}

function deleteQCM(id) {
    return axios.delete(URL_QCM + `/${id}`);
}

export default { createQCM, deleteQCM, modifyQCM };
