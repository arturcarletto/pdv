import {useEffect, useState} from "react";
import styles from './Relatorio.module.css'
import image from '../../imgs/relatorio.png'

function Relatorio() {

    const [data, setData] = useState([]);
    const getRelatorio = async () => {
        fetch('http://localhost/desafio_pdv/relatorio.php')
            .then((response) => response.json())
            .then((responseJson) => {
                setData(responseJson.records);
            })
    }
    useEffect(() => {
        getRelatorio();
    }, [])

    return (
        <>
            <div className={styles.relatorio}>
                <h1 className={styles.title}>Relatório</h1>
                <table>
                    <thead>
                    <tr>
                        <th>Código</th>
                        <th>Data</th>
                        <th>Total</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Object.values(data).map(relatorio => (
                        <tr key={relatorio.codigo}>
                            <td>{relatorio.codigo}</td>
                            <td>{relatorio.data}</td>
                            <td>R${relatorio.total}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div>
                <img src={image} alt="relatorio"/>
            </div>
        </>
    )
}

export default Relatorio