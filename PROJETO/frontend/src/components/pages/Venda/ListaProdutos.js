import React, {useEffect, useState} from "react";


export default function ListaProdutos() {

    const [data, setData] = useState([]);


    const getProdutos = async () => {
        fetch('http://localhost/desafio_pdv/index.php')
            .then((response) => response.json())
            .then((responseJson) => {
                setData(responseJson.records);
            })
    }

    useEffect(() => {
        getProdutos();
    }, [])

    return (
        <>
            <option value="" disabled selected>Escolha o Produto</option>
            {Object.values(data).map(produto => (
                <option key={produto.codigo} value={produto.codigo}>{produto.codigo} - {produto.nome}</option>
                )
            )}

        </>
    )
}