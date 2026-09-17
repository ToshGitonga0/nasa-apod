"use client";

import { useState } from "react";
import type { ApodResponse } from "@/lib/types";
import styles from "./ApodImage.module.css";

type ApodImageProps = {
  apod: ApodResponse;
};

function getVideoEmbedUrl(url: string): string {
  // Most APOD videos are YouTube embeds already; pass through untouched
  // otherwise so unfamiliar providers still render inside the iframe.
  return url;
}

export default function ApodImage({ apod }: ApodImageProps) {
  const [imageFailed, setImageFailed] = useState(false);

  if (apod.mediaType === "video") {
    return (
      <div className={styles.frame}>
        <div className={styles.videoWrapper}>
          <iframe
            className={styles.video}
            src={getVideoEmbedUrl(apod.url)}
            title={apod.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    );
  }

  if (imageFailed) {
    return (
      <div className={styles.frame}>
        <div className={styles.imageFallback} role="img" aria-label={apod.title}>
          <p>The image for this date couldn&apos;t be loaded.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.frame}>
      {/* Plain <img> by design: APOD images are served from many unpredictable
         hosts, so next/image's remote-pattern allowlist would need constant
         upkeep for a project this small. */}
      <img
        className={styles.image}
        src={apod.url}
        alt={apod.title}
        loading="eager"
        decoding="async"
        onError={() => setImageFailed(true)}
      />
    </div>
  );
}
