import React from "react";
import { useState } from "react";

//Permet d'exporter la fonction toggle et la variable toggle qui déterminera si oui ou non la modale est ouverte
const LogiqueModale = () => {
    const [revele, changeRevele] = useState(false)

    function toggle() {
        changeRevele(!revele)
    }

    return {
        revele,
        toggle
    }
}

export default LogiqueModale;