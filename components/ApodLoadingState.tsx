import styles from "./ApodLoadingState.module.css";

export default function ApodLoadingState() {
  return (
    <div className={styles.loading} role="status" aria-live="polite">
      <div className={styles.imagePlaceholder} />
      <div className={styles.linePlaceholder} style={{ width: "40%" }} />
      <div className={styles.linePlaceholder} style={{ width: "70%" }} />
      <div className={styles.linePlaceholder} style={{ width: "95%" }} />
      <div className={styles.linePlaceholder} style={{ width: "85%" }} />
      <span className={styles.srOnly}>Loading today&apos;s astronomy picture…</span>
    </div>
  );
}
