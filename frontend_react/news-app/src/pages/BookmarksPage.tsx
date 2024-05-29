// src/pages/BookmarksPage.tsx
import { useQuery } from '@tanstack/react-query';
import { pageTransitionEffects } from '@/constants/constants';
import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import Spinner from '@/components/Spinner';
import NewsList from '@/components/news/NewsList';
import useBookmarks from '@/hooks/useBookmarks';
import useVotes from '@/hooks/useVotes';
import { fetchNewsItems } from '@/services/newsService';
import { viewCountAtom, incrementViewCountAtom } from '@/atoms/viewCountAtom';

const BookmarksPage: React.FC = () => {
  const { bookmarks, toggleBookmark } = useBookmarks();
  const { voteCounts, handleVote } = useVotes();
  const [viewCounts] = useAtom(viewCountAtom);
  const [, incrementViewCount] = useAtom(incrementViewCountAtom);

  const { data: allNewsItems, isLoading, error } = useQuery({
    queryKey: ['allNewsItems'],
    queryFn: () => fetchNewsItems(1, 10), // 첫 10개의 아이템을 가져옴
  });

  const bookmarkedNewsItems = allNewsItems?.items?.filter(item => bookmarks.includes(item.id)) ?? [];

  if (isLoading) return <Spinner />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransitionEffects}
      className="flex flex-col py-16"
    >
      <div>
        <NewsList
          newsItems={bookmarkedNewsItems.map(item => ({
            ...item,
            isBookmarked: bookmarks.includes(item.id),
            voteCount: voteCounts[item.id] || item.voteCount,
            viewCount: viewCounts[item.id.toString()] || 0,
          }))}
          onBookmarkToggle={toggleBookmark}
          onVote={handleVote}
          onView={incrementViewCount} // 조회수 증가 핸들러 전달
        />
        {bookmarkedNewsItems.length === 0 && (
          <p className="text-center">No bookmarks added.</p>
        )}
      </div>
    </motion.div>
  );
};

export default BookmarksPage;
