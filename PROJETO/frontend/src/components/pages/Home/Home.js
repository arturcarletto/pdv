import styles from './Home.module.css'
export default function Home() {

    return (
        <div className={styles.home}>
            <h1>Bem-vindo a Loja do Mirante</h1>

            <div className={styles.mirante}>
                <img src="../../imgs/mirante.png" alt="Mirante"/>
            </div>
        </div>
    )
}

