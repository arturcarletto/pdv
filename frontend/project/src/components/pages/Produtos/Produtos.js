import React from "react";
import {NovoProduto} from "./NovoProduto";
import styles from './Produtos.module.css';
import EditForm from "./EditForm";
import TabelaProdutos from "./TabelaProdutos";

function Produtos() {

    return (
        <div className={styles.background}>
            <div className={styles.novoProduto}>
                <NovoProduto/>
            </div>

            <div className={styles.left}>
                <TabelaProdutos/>
            </div>

            <div className={styles.vl}></div>

            <div className={styles.right}>
                <EditForm/>
            </div>
        </div>
    )
}

export default Produtos