import {useEffect, useState} from "react";

export default function Tipos() {

//take data as types of products from database and put in data variable
    const [data, setData] = useState([]);

    const getTipos = async () => {
        fetch('http://localhost/desafio_pdv/tipos.php')
            .then((response) => response.json())
            .then((responseJson) => {
                setData(responseJson.records);
            })
    }

    useEffect(() => {
        getTipos();
    }  , [])


    return (
        <>
            <option disabled selected>Tipo para editar</option>
            {Object.values(data).map(tipo => (
                <option key={tipo.codigo} value={tipo.codigo}>{tipo.codigo} - {tipo.nome}</option>
            ))}
        </>
    )
}