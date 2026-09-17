import styles from "./ApodErrorState.module.css";

type ApodErrorStateProps = {
  message: string;
  onRetry: () => void;
};

export default function ApodErrorState({ message, onRetry }: ApodErrorStateProps) {
  return (
    <div className={styles.error} role="alert">
      <p className={styles.heading}>The sky didn&apos;t come through.</p>
      <p className={styles.message}>{message}</p>
      <button type="button" className={styles.retry} onClick={onRetry}>
        Try again
      </button>
    </div>
  );
}
