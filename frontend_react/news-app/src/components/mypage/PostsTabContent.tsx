// src/components/mypage/PostsTabContent.tsx
import React, { Suspense } from 'react';
import useUserPosts from '@/hooks/useUserPosts';
import CommunityPost from '@/components/community/CommunityPost';
import LoadMoreButton from '@/components/LoadMoreButton';

const PostsTabContent: React.FC = () => {
  const {
    data = { pages: [] },
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useUserPosts();

  const posts = data.pages.flatMap(page => page.items || []);

  return (
    <>
      {posts.length > 0 ? (
        posts.map((post, index) => (
          <Suspense key={`${post.id}-${index}`} fallback={<div>Loading post...</div>}>
            <CommunityPost post={post} simpleView />
          </Suspense>
        ))
      ) : (
        <div>No posts found.</div>
      )}
      {hasNextPage && <LoadMoreButton isLoading={isFetchingNextPage} onClick={() => fetchNextPage()} />}
    </>
  );
};

export default PostsTabContent;
