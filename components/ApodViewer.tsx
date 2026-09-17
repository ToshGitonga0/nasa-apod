"use client";

import { useCallback, useEffect, useState } from "react";
import type { ApodResponse } from "@/lib/types";
import { addDays, getRandomApodDate, getTodayISO, isFutureDate } from "@/lib/dates";
import ApodImage from "@/components/ApodImage";
import ApodDetails from "@/components/ApodDetails";
import ApodNavigation from "@/components/ApodNavigation";
import ApodLoadingState from "@/components/ApodLoadingState";
import ApodErrorState from "@/components/ApodErrorState";
import styles from "./ApodViewer.module.css";

export default function ApodViewer() {
  const [currentDate, setCurrentDate] = useState<string>(() => getTodayISO());
  const [apod, setApod] = useState<ApodResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadApod = useCallback(async (date: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/apod?date=${encodeURIComponent(date)}`);
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload?.error ?? "Something went wrong loading this picture.");
      }

      setApod(payload as ApodResponse);
    } catch (err) {
      setApod(null);
      setError(err instanceof Error ? err.message : "Something went wrong loading this picture.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadApod(currentDate);
  }, [currentDate, loadApod]);

  const handlePrevious = () => setCurrentDate((date) => addDays(date, -1));

  const handleNext = () =>
    setCurrentDate((date) => {
      const nextDate = addDays(date, 1);
      return isFutureDate(nextDate) ? date : nextDate;
    });

  const handleSurpriseMe = () => setCurrentDate(getRandomApodDate());

  const handleRetry = () => loadApod(currentDate);

  return (
    <div className={styles.viewer}>
      <div className={styles.panel}>
        {isLoading && <ApodLoadingState />}

        {!isLoading && error && <ApodErrorState message={error} onRetry={handleRetry} />}

        {!isLoading && !error && apod && (
          <>
            <ApodImage apod={apod} />
            <ApodDetails apod={apod} />
          </>
        )}

        <ApodNavigation
          onPrevious={handlePrevious}
          onNext={handleNext}
          onSurpriseMe={handleSurpriseMe}
          isPreviousDisabled={false}
          isNextDisabled={isFutureDate(addDays(currentDate, 1))}
          isBusy={isLoading}
        />
      </div>
    </div>
  );
}
