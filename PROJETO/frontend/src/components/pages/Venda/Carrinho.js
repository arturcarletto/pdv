import {useEffect, useState} from "react";
import styles from "./Carrinho.module.css";
import {FaCartArrowDown} from "react-icons/fa";

function Carrinho() {

    const [data, setData] = useState([]);

    const getCarrinho = async () => {
        fetch('http://localhost/desafio_pdv/carrinho.php')
            .then((response) => response.json())
            .then((responseJson) => {
                setData(responseJson.records);
            })
    }
    useEffect(() => {
        getCarrinho();
    }, [])


    console.log(data)

    const concluirVenda = async (e) => {
        e.preventDefault()

        await fetch("http://localhost/desafio_pdv/concluirVenda.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data  })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
            })
    }


    return (
        <div className={styles.carrinho}>
            <h1 className={styles.title}>Carrinho <FaCartArrowDown/></h1>
            <table className={styles.tabela}>
                <thead>
                <tr>
                    <th className={styles.produto}>Produto</th>
                    <th>Quantidade</th>
                    <th>Valor un.</th>
                    <th>Total</th>
                </tr>
                </thead>
                <tbody>
                {Object.values(data).map(carrinho => (
                    <tr key={carrinho.codigo}>
                        <td>{carrinho.codigo} - {carrinho.nome}</td>
                        <td>{carrinho.quantidade}</td>
                        <td>R$ {carrinho.valor}</td>
                        <td>R$ {carrinho.total}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className={styles.imposto}>
                <h3>Imposto Estimado: {}</h3>
            </div>


            <button  type="submit" onSubmit={concluirVenda} className={styles.btn_concluir}>Concluir Venda</button>
        </div>
    )



}

export default Carrinho;