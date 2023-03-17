import styles from './Home.module.css'
export default function Home() {
    return (
        <>
            <div className={styles.bg}></div>
            <div className={styles.home}>
                <h1>Bem-vindo a Loja do Mirante</h1>
                <p>Escolha uma das opções no menu acima</p>
            </div>
        </>
    )
}

