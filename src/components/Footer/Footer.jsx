import React from "react";
import styles from './Footer.module.css';
import gitHubImg from '../../img/bxl-github.svg'

function Footer() {

    return (
        <div className={styles.view}>
            <div className={styles.bigContainer}>
                <div className={styles.textos}>
                    <h1>JSONificator</h1>
                    <p className={styles.comentario}>// App en desarrollo</p>
                    <p>Rápido conversor a formato json para incluir comillas dobles de forma inmdiata, sin tener que tipear manualmente. Útil en aplicaciones de testeo de APIs como <a href="https://insomnia.rest/" target="_blank" rel="noreferrer">Insomnia</a>, <a href="https://www.postman.com/" target="_blank" rel="noreferrer">Postman</a>, etc.</p>
                </div>
                <div className={styles.contacto}>
                    <a href="https://github.com/lucabruzzone" target="_blank" rel="noreferrer">
                        <img src={gitHubImg} alt="" />
                    </a>
                    <a href="https://github.com/lucabruzzone" target="_blank" rel="noreferrer">
                        <p>@lucabruzzone</p>
                    </a>
                </div>
                <div>
                    <p className={styles.year}>2023</p>
                </div>
            </div>
        </div>
    );
}

export default Footer;