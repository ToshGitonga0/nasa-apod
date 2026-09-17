import type { ApodResponse } from "@/lib/types";
import styles from "./ApodDetails.module.css";

type ApodDetailsProps = {
  apod: ApodResponse;
};

export default function ApodDetails({ apod }: ApodDetailsProps) {
  return (
    <section className={styles.details} aria-labelledby="apod-title">
      <p className={styles.date}>
        <time dateTime={apod.date}>{apod.date}</time>
      </p>
      <h1 id="apod-title" className={styles.title}>
        {apod.title}
      </h1>
      <p className={styles.explanation}>{apod.explanation}</p>
      <footer className={styles.footer}>
        {apod.copyright && (
          <span className={styles.copyright}>© {apod.copyright.trim()}</span>
        )}
        <span className={styles.attribution}>
          Image courtesy of NASA&apos;s Astronomy Picture of the Day
        </span>
      </footer>
    </section>
  );
}
