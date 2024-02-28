// src/components/NewsArticle.tsx
import React from 'react';
import styles from '../styles/NewsArticle.module.css'; // Assuming you're using CSS modules

interface NewsArticleProps {
  title: string;
  date: string;
  likes: number;
  comments: number;
  // Include any other props you need, such as IDs for handling actions
}

const NewsArticle: React.FC<NewsArticleProps> = ({ title, date, likes, comments }) => {
  // Event handlers for like and share can be added here
  return (
    <div className={styles.articleContainer}>
      <h2 className={styles.title}>{title}</h2>
      <time className={styles.date}>{date}</time>
      <div className={styles.actions}>
        <button className={styles.likeButton} onClick={() => {/* handle like */}}>
          👍 {likes}
        </button>
        <button className={styles.shareButton} onClick={() => {/* handle share */}}>
          🗨️ {comments}
        </button>
      </div>
    </div>
  );
};

export default NewsArticle;
