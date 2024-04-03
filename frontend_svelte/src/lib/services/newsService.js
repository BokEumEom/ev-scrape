// src/lib/services/newsService.js
let newsList = [];
let comments = writable([]);
let currentPage = 1;
let newComment = {};
let showComments = {};
let isNextPageAvailable = false;
let isLoading = false;
let errorMessage = '';

export async function fetchNews(page) {
  console.log('fetchNews')
  isLoading = true;
  try {
    const response = await fetch(`http://localhost:8000/news?page=${page}&limit=${limit}`);
    if (!response.ok) {
      throw new Error('Failed to fetch news data.');
    }
    const data = await response.json();
    newsList = page === 1 ? data.news : [...newsList, ...data.news];
    isNextPageAvailable = data.nextPageAvailable;
    currentPage = page;
  } catch (error) {
    errorMessage = `Error: ${error.message}`;
  } finally {
    isLoading = false;
  }
}

export function goToNextPage() {
  if (isNextPageAvailable && !isLoading) {
    currentPage += 1; // 현재 페이지 업데이트
    fetchNews(currentPage);
  }
}

export async function fetchComments(newsId) {
  console.log('fetchComments')
  try {
    const response = await fetch(`http://localhost:8000/comments/${newsId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch comments: ${response.statusText}`);
    }
    const data = await response.json();
    comments.set(newsId, data || []);
    comments = new Map(comments); // Svelte 반응성 갱신
  } catch (error) {
    console.error('Error fetching comments:', error);
    comments.set(newsId, []);
    comments = new Map(comments);
  }
}

export async function toggleComments(newsId) {
  console.log('toggleComments')
    showComments[newsId] = !showComments[newsId];
    if (showComments[newsId] && !comments.has(newsId)) {
        await fetchComments(newsId);
    }
}

export async function addComment(newsId) {
  const content = newComment[newsId]?.trim();
  if (!content) {
    console.error('Comment content cannot be empty');
    return;
  }

  try {
    const response = await fetch(`http://localhost:8000/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ news_id: newsId, content })
    });
    if (!response.ok) {
      throw new Error(`Failed to post comment: ${response.statusText}`);
    }
    // 댓글 입력 필드 초기화
    newComment[newsId] = '';
    // 댓글 목록 새로고침을 위해 fetchComments를 호출
    fetchComments(newsId).then(() => {
      // 댓글 갱신 후, 해당 뉴스 ID의 댓글 수를 증가
      showComments[newsId] = true; // 댓글 섹션을 열어서 새 댓글을 보여줌
      comments.update($comments => {
        // 댓글 수 갱신 로직 추가
        const currentComments = $comments.get(newsId) || [];
        $comments.set(newsId, [...currentComments, { content }]); // 예시로 직접 추가
        return new Map($comments);
      });
    });
  } catch (error) {
    console.error('Error adding comment:', error);
  }
}

export async function vote(newsId, voteType) {
  console.log('vote')
    if (!newsId) {
        console.error("News ID is undefined.");
        return;
    }
    try {
        const response = await fetch(`http://localhost:8000/vote/${newsId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ vote_type: voteType })
        });
        if (!response.ok) {
            throw new Error('Failed to register vote.');
        }
        const result = await response.json();
        const newsItem = newsList.find(item => item.id === newsId);
        if (newsItem) {
            newsItem.upvotes = result.votes.upvotes;
            newsItem.downvotes = result.votes.downvotes;
            newsList = [...newsList]; // Svelte 반응성 갱신
        }
    } catch (error) {
        console.error("Error voting:", error);
    }
}