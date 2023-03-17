import styles from './Footer.module.css'
import {FaInstagram, FaGithub, FaLinkedin, FaDiscord} from "react-icons/fa";

function Footer() {
    return (
        <footer className={styles.footer}>
            <ul className={styles.social}>
                <li>
                    <a href="https://instagram.com/artur.carletto?igshid=ZDdkNTZiNTM=" target="_blank" className={styles.instagram}><FaInstagram/></a>
                </li>
                <li>
                    <a href="https://github.com/Artur-Luiz" target="_blank" className={styles.github}><FaGithub/></a>
                </li>
                <li>
                    <a href="https://www.linkedin.com/in/arturcarletto/" target="_blank" className={styles.linkedin}><FaLinkedin/></a>
                </li>
                <li>
                    <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" className={styles.discord}><FaDiscord/></a>
                </li>
            </ul>
            <p className={styles.copy_right}>
                <span>Artur Carletto</span> &copy; 2023
            </p>
        </footer>
    )
}

export default Footer