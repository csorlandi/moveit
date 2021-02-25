import { useContext } from 'react';
import { ChallangesContext } from '../contexts/ChallangesContext';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/ChallangeBox.module.css';

export function ChallangeBox() {
  const { activeChallange, resetChallange, completeChallange } = useContext(ChallangesContext);
  const { resetCountdown } = useContext(CountdownContext);

  function handleChallangeSucceded() {
    completeChallange();
    resetCountdown();
  }

  function handleChallangeFailed() {
    resetChallange();
    resetCountdown();
  }

  return (
    <div className={styles.challangeBoxContainer}>
      { activeChallange ? (
        <div className={styles.challangeActive}>
          <header>
            Ganhe {activeChallange.amount} xp
          </header>
          <main>
            <img src={`icons/${activeChallange.type}.svg`} alt={`${activeChallange.type} challange icon`}/>
            <strong>Exercite-se</strong>
            <p>{activeChallange.description}</p>
          </main>
          <footer>
            <button
              type="button"
              className={styles.challangeFailedButton}
              onClick={handleChallangeFailed}
            >
              Falhei
            </button>
            <button
              type="button"
              className={styles.challangeSucceededButton}
              onClick={handleChallangeSucceded}
            >
              Completei
            </button>
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