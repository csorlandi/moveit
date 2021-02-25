import { useContext } from 'react';
import { ChallangesContext } from '../contexts/ChallangesContext';
import styles from '../styles/components/Profile.module.css';

export function Profile() {
  const { level } = useContext(ChallangesContext);
  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/csorlandi.png" alt="Claudio Orlandi"/>
      <div>
        <strong>Claudio Orlandi</strong>
        <p>
          <img src="icons/level.svg" alt="Profile Level Image"/>
          Level {level}
        </p>
      </div>
    </div>
  )
}