<script>
  import { onMount } from 'svelte';
  import NewsItem from '$lib/components/NewsItem.svelte';
  import Navbar from '$lib/components/Navbar.svelte';
  import { commentsCountStore } from '$lib/stores.js'; // Import the store correctly

  let newsList = [];
  let comments = new Map();
  let currentPage = 1;
  let isNextPageAvailable = false;
  let isLoading = false;
  let errorMessage = '';
  const limit = 10;
  const apiBaseUrl = import.meta.env.VITE_PUBLIC_API_URL;

  onMount(() => {
    fetchNews(currentPage);
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  });

  function checkScroll() {
    const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 2;
    if (nearBottom && isNextPageAvailable && !isLoading) {
      goToNextPage();
    }
  }

  async function fetchNews(page) {
    isLoading = true;
    console.log(apiBaseUrl);
    try {
      const response = await fetch(`${apiBaseUrl}/news?page=${page}&limit=${limit}`);
      if (!response.ok) throw new Error('Failed to fetch news data.');
      const data = await response.json();
      newsList = page === 1 ? data.news : [...newsList, ...data.news];
      isNextPageAvailable = data.nextPageAvailable;
    } catch (error) {
      errorMessage = `Error: ${error.message}`;
    } finally {
      isLoading = false;
    }
  }

  function goToNextPage() {
    currentPage += 1;
    fetchNews(currentPage);
  }

  async function handleFetchComments(event) {
    const { newsId } = event.detail;

    try {
      const response = await fetch(`${apiBaseUrl}/comments/${newsId}`);
      if (!response.ok) throw new Error(`Failed to fetch comments: ${response.statusText}`);
      const data = await response.json();

      // Update the commentsCountStore with the new count
      commentsCountStore.update(store => {
          store.set(newsId, comments.length);
          return store;
      });

      const newsItem = newsList.find(item => item.id === newsId);
      if (newsItem) {
        newsItem.commentsCount = data.length;
        newsList = [...newsList];
      }

      comments.set(newsId, data);
      comments = new Map(comments);

    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  }
  
  async function handleVote(event) {
    const { newsId, voteType } = event.detail;

    try {
      const response = await fetch(`${apiBaseUrl}/vote/${newsId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vote_type: voteType })
      });
      if (!response.ok) throw new Error('Failed to register vote.');
      const result = await response.json();

      // Update the local state to reflect the new vote counts
      const newsItemIndex = newsList.findIndex(item => item.id === newsId);
      if (newsItemIndex !== -1) {
        if (voteType === 'upvote') {
          newsList[newsItemIndex].upvotes = result.votes.upvotes;
        } else {
          newsList[newsItemIndex].downvotes = result.votes.downvotes;
        }
        newsList = [...newsList]; // Trigger reactivity by re-assigning the array
      }
    } catch (error) {
      console.error('Error voting:', error);
    }
  }
</script>
  
<Navbar />

<div class="news-container">
  {#if newsList.length > 0}
    <ul>
      {#each newsList as news (news.id)}
        <NewsItem {news} on:fetchComments={handleFetchComments} on:vote={handleVote} />
      {/each}
    </ul>
  {:else}
    <p>No news available.</p>
  {/if}
</div>
 
<style>
.news-container {
  margin: 10px;
  padding: 15px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
}

ul {
  list-style: none;
  padding: 0;
}
@media (min-width: 768px) {
    .news-container {
      margin: 20px auto; /* 가운데 정렬 */
      max-width: 1024px; /* PC 환경에서는 최대 너비를 제한합니다. */
      padding: 20px; /* PC 환경에서는 좀 더 넓은 패딩을 줍니다. */
    }
    ul {
      display: grid;
      gap: 20px; /* 그리드 항목 사이의 간격 */
    }
  }
</style>
  