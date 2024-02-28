// src/components/NewsList.tsx
"use client";

import React from 'react';
import Image from 'next/image';
import styles from '../styles/NewsList.module.css'

interface NewsListProps {
  id: string;
  title: string;
  source : string;
  pubDate: string;
  imageUrl?: string;
}

export const NewsList: React.FC<NewsListProps> = ({ title, source, pubDate, imageUrl }) => {
  return (
    <div className={styles.list}>
      {imageUrl && (
        <div className={styles.imageWrapper}>
          <Image src={imageUrl} alt={title} width={100} height={100} layout="responsive" />
        </div>
      )}
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.details}>출처: {source} | {pubDate}</p>
      </div>
    </div>
  );
};
