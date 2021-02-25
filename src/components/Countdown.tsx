import styles from '../styles/components/Countdown.module.css';

export function Countdown() {
  return (
    <>
      <div className={styles.countdownContainer}>
        <div>
          <span>2</span>
          <span>5</span>
        </div>
        <span>:</span>
        <div>
          <span>0</span>
          <span>0</span>
        </div>
      </div>
      <button type="button" className={styles.countdownButton}>
        Iniciar um ciclo
      </button>
    </>
  )
}