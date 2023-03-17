import {useEffect, useState} from "react";

export default function Tipos() {

    const [data, setData] = useState([]);
    const getTipos = async () => {
        fetch('http://localhost/desafio_pdv/DbSelect/tipos.php')
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
            {Object.values(data).map(tipo => (
                <option key={tipo.codigo} id={tipo.codigo} value={tipo.percentual_imposto} name={tipo.nome}>{tipo.codigo} - {tipo.nome}</option>
            ))}
        </>
    )
}