import styles from "./ApodNavigation.module.css";

type ApodNavigationProps = {
  onPrevious: () => void;
  onNext: () => void;
  onSurpriseMe: () => void;
  isNextDisabled: boolean;
  isPreviousDisabled: boolean;
  isBusy: boolean;
};

export default function ApodNavigation({
  onPrevious,
  onNext,
  onSurpriseMe,
  isNextDisabled,
  isPreviousDisabled,
  isBusy,
}: ApodNavigationProps) {
  return (
    <nav className={styles.nav} aria-label="Astronomy Picture of the Day navigation">
      <button
        type="button"
        className={styles.button}
        onClick={onPrevious}
        disabled={isBusy || isPreviousDisabled}
        aria-label="Show the previous day's picture"
      >
        ← Previous
      </button>
      <button
        type="button"
        className={`${styles.button} ${styles.surprise}`}
        onClick={onSurpriseMe}
        disabled={isBusy}
        aria-label="Show a random day's picture"
      >
        Surprise Me
      </button>
      <button
        type="button"
        className={styles.button}
        onClick={onNext}
        disabled={isBusy || isNextDisabled}
        aria-label="Show the next day's picture"
      >
        Next →
      </button>
    </nav>
  );
}
