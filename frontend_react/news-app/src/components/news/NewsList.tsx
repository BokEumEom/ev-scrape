// src/components/news/NewsList.tsx
import React from 'react';
import { useAtom } from 'jotai';
import { viewCountAtom, incrementViewCountAtom } from '@/atoms/viewCountAtom';
import { NewsItem as NewsItemType } from '@/types';
import NewsItemVote from './NewsItemVote';
import { IoBookmark, IoBookmarkOutline, IoShareOutline, IoChatbubbleOutline } from 'react-icons/io5';

// NewsList 컴포넌트의 예상되는 props를 정의하는 인터페이스
interface Props {
  newsItems: NewsItemType[]; // 뉴스 항목 배열
  onBookmarkToggle: (newsItemId: number) => void; // 북마크 상태를 토글하는 함수
  onVote: (newsId: number, voteValue: number) => void; // 투표를 처리하는 함수
}

// NewsList 컴포넌트 정의
const NewsList: React.FC<Props> = ({ newsItems, onBookmarkToggle, onVote }) => {
  // Jotai atoms를 사용하여 조회 수를 관리
  const [viewCounts] = useAtom(viewCountAtom); // 조회 수를 읽기 위한 atom
  const [, incrementViewCount] = useAtom(incrementViewCountAtom); // 조회 수를 증가시키기 위한 atom

  // 뉴스 항목 제목을 클릭했을 때의 핸들러
  const handleTitleClick = (newsItemId: number, event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault(); // 기본 링크 동작을 방지
    incrementViewCount(newsItemId); // 클릭한 뉴스 항목의 조회 수 증가
    const newsItem = newsItems.find(item => item.id === newsItemId); // 클릭한 뉴스 항목 찾기
    if (newsItem) {
      window.open(newsItem.link, '_blank', 'noopener,noreferrer'); // 뉴스 항목 링크를 새 탭에서 열기
    }
  };

  // Web Share API를 사용하여 뉴스 항목을 공유하는 핸들러
  const handleShare = (newsItem: NewsItemType) => {
    if (navigator.share) {
      navigator.share({
        title: newsItem.title, // 뉴스 항목의 제목
        url: newsItem.link, // 뉴스 항목의 URL
      })
        .then(() => {
          console.log('Thanks for sharing!'); // 공유 성공 시 메시지 로깅
        })
        .catch(console.error); // 공유 실패 시 에러 로깅
    } else {
      console.log('Web Share API not supported.'); // Web Share API가 지원되지 않을 때 메시지 로깅
    }
  };

  return (
    <div className="mx-auto px-4"> {/* 뉴스 목록을 위한 컨테이너 */}
      {newsItems.map((newsItem) => (
        <div key={newsItem.id} className="border-b border-gray-200 px-4 p-4 flex flex-col">
          {/* 각 뉴스 항목을 위한 컨테이너 */}
          <div className="flex-grow">
            {/* 뉴스 항목 제목을 위한 링크 */}
            <a
              href={newsItem.link}
              target="_blank"
              title="새창열기"
              rel="noopener noreferrer"
              onClick={(event) => handleTitleClick(newsItem.id, event)}
              className="hover:underline"
            >
              <h2 className="text-sm font-semibold text-gray-900">
                {newsItem.title.replace(/ - .*$/, '')} {/* 뉴스 항목 제목 표시 */}
              </h2>
            </a>
          </div>
          <div className="flex justify-between items-center mt-1">
            {/* 뉴스 항목 세부 정보 및 액션 버튼을 위한 컨테이너 */}
            <p className="text-xs text-gray-500">
              {newsItem.source} - {new Date(newsItem.published_at).toLocaleDateString()} - 조회 {viewCounts[newsItem.id] || 0}
              {/* 출처, 게시 날짜 및 조회 수 표시 */}
            </p>
            <div className="flex items-center">
              {/* 액션 버튼을 위한 컨테이너 */}
              <NewsItemVote newsId={newsItem.id} onVote={onVote} voteCount={newsItem.voteCount} />
              {/* 투표 컴포넌트 */}
              <button
                onClick={() => onBookmarkToggle(newsItem.id)}
                className="p-1 rounded-full hover:bg-gray-100 ml-1"
                aria-label="Bookmark"
              >
                {newsItem.isBookmarked ? (
                  <IoBookmark className="text-blue-500 text-lg" size={18} />
                ) : (
                  <IoBookmarkOutline className="text-gray-500 text-lg" size={18} />
                )}
                {/* 북마크 버튼 */}
              </button>
              <button
                onClick={() => handleShare(newsItem)}
                className="p-1 rounded-full hover:bg-gray-100 ml-1"
                aria-label="Share"
              >
                <IoShareOutline className="text-gray-500 text-lg" size={18} />
                {/* 공유 버튼 */}
              </button>
              <button
                onClick={() => handleShare(newsItem)}
                className="p-1 rounded-full hover:bg-gray-100 ml-1"
                aria-label="Comment"
              >
                <IoChatbubbleOutline className="text-gray-500 text-lg" size={18} />
                {/* 댓글 버튼 */}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsList;
