import styles from '../styles/components/ChallangeBox.module.css';

export function ChallangeBox() {
  const hasActiveChallange = true;

  return (
    <div className={styles.challangeBoxContainer}>
      { hasActiveChallange ? (
        <div className={styles.challangeActive}>
          <header>
            Ganhe 400 xp
          </header>
          <main>
            <img src="icons/body.svg" alt="Body Challange Icon"/>
            <strong>Exercite-se</strong>
            <p>É agora Claudião, bora lá meu parça.<br />Caminhe por 3 minutos e estique suas pernas<br /> pra você ficar saudável.</p>
          </main>
          <footer>
            <button
              type="button"
              className={styles.challangeFailedButton}
            >Falhei</button>
            <button
              type="button"
              className={styles.challangeSucceededButton}
            >Completei</button>
          </footer>
        </div>
      ) : (
        <div className={styles.challangeNotActive}>
          <strong>Inicie um ciclo<br />para receber desafios a<br /> serem completados</strong>
          <p>
            <img src="icons/level-up.svg" alt="Level Up Icon"/>
            Complete-os e ganhe<br />experiência e avance de leve.
          </p>
        </div>
      )}
    </div>
  );
}