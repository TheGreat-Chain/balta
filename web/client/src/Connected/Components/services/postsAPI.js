import { URL_QCM } from "../services/config"

function findAll() {
    return fetch(`${URL_QCM}`, {
        method: "GET",
        headers: {
            Accept : "Application/json",
        },
    }).then((res) => res.json()).catch( err => {console.log(err.message)});
}

function findOne(id) {
    return fetch(`${URL_QCM}/${id}`).then((res) => res.json());
}

export default {
    findAll,
    findOne,
}