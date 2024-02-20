<script>
  import { onMount } from 'svelte';
  import Navbar from '$lib/components/Navbar.svelte';

  let newsList = [];
  let comments = new Map();
  let currentPage = 1;
  let newComment = {};
  let showComments = {};
  let isNextPageAvailable = false;
  let isLoading = false;
  let errorMessage = '';
  const limit = 10;

  onMount(() => {
    fetchNews(currentPage);

    function checkScroll() {
      const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 2;
      if (nearBottom && isNextPageAvailable && !isLoading) {
        goToNextPage();
      }
    }

    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  });

  async function fetchNews(page) {
    isLoading = true;
    try {
      const response = await fetch(`http://localhost:8000/news?page=${page}&limit=${limit}`);
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

  async function fetchComments(newsId) {
    try {
      const response = await fetch(`http://localhost:8000/comments/${newsId}`);
      if (!response.ok) throw new Error(`Failed to fetch comments: ${response.statusText}`);
      const data = await response.json();
      comments.set(newsId, data || []);
      comments = new Map(comments);
    } catch (error) {
      console.error('Error fetching comments:', error);
      comments.set(newsId, []);
      comments = new Map(comments);
    }
  }

  async function addComment(newsId) {
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
      if (!response.ok) throw new Error(`Failed to post comment: ${response.statusText}`);
      newComment[newsId] = '';
      await fetchComments(newsId);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  }

  async function voteComment(newsId, commentId, voteType) {
    try {
      const response = await fetch(`http://localhost:8000/comments/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment_id: commentId, vote_type: voteType })
      });
      if (!response.ok) throw new Error('Failed to register comment vote.');
      await fetchComments(newsId);
    } catch (error) {
      console.error('Error voting on comment:', error);
    }
  }

  async function vote(newsId, voteType) {
    try {
      const response = await fetch(`http://localhost:8000/vote/${newsId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vote_type: voteType })
      });
      if (!response.ok) throw new Error('Failed to register vote.');
      const result = await response.json();
      const newsItem = newsList.find(item => item.id === newsId);
      if (newsItem) {
        newsItem.upvotes = result.votes.upvotes;
        newsItem.downvotes = result.votes.downvotes;
        newsList = [...newsList];
      }
    } catch (error) {
      console.error("Error voting:", error);
    }
  }

  function toggleComments(newsId) {
    showComments[newsId] = !showComments[newsId];
    if (showComments[newsId] && !comments.has(newsId)) {
      fetchComments(newsId);
    }
  }

  function goToNextPage() {
    currentPage += 1;
    fetchNews(currentPage);
  }
</script>
  
<Navbar />

<div class="news-container">
  {#if newsList.length > 0}
    <ul>
      {#each newsList as news (news.id)}
        <!-- News Item -->
        <li class="news-item">
          <!-- News Content -->
          <a href={news.link} target="_blank">{news.title}</a>
          <small>출처: {news.source} | Date: {news.pubDate}</small>
          <div class="news-actions">
            <!-- 투표 버튼에 click 이벤트 핸들러 추가 -->
            <button on:click={() => toggleComments(news.id)} class="vote-btn">
              <i class="fa-regular fa-message"></i> {comments.get(news.id)?.length ?? 0}
            </button>
            <button on:click={() => vote(news.id, 'upvote')} class="vote-btn">
              <i class="fas fa-thumbs-up"></i> {news.upvotes ?? 0}
            </button>
            <button on:click={() => vote(news.id, 'downvote')} class="vote-btn">
                <i class="fas fa-thumbs-down"></i> {news.downvotes ?? 0}
            </button>          
          </div>
          <!-- 댓글 표시 및 추가 관련 코드 -->
          {#if showComments[news.id]}
            <!-- Comment Section -->
            <div class="comment-section">
              <div class="comment-input-area">
                <input
                  type="text"
                  bind:value={newComment[news.id]}
                  placeholder="Write a comment..."
                  class="comment-input"
                />
                <button on:click={() => addComment(news.id)} class="send-comment">
                  <i class="fa-solid fa-arrow-up"></i>
                </button>
              </div>

              <!-- Comments List -->
                {#each comments.get(news.id) || [] as comment (comment.id)}
                  <li class="comment">
                    <!-- Comment Content -->
                    <div class="comment-content">
                      <p>{comment.content}</p>
                      <div class="comment-footer">
                        <!-- Upvote Button -->
                        <button class="vote-btn" on:click={() => voteComment(news.id, comment.id, 'upvote')}>
                          <i class="fa-regular fa-comment-dots"></i> {comment.upvotes}
                        </button>
                        <button class="vote-btn" on:click={() => voteComment(news.id, comment.id, 'upvote')}>
                          <i class="fa-regular fa-heart"></i> {comment.upvotes}
                        </button>
                      </div>
                    </div>
                  </li>
                {/each}
            </div>
          {/if}
        </li>
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

.news-item {
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
  width: 100%;
  box-sizing: border-box;
}

.news-item:last-child {
  border-bottom: none;
}

a {
  color: #007bff;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

small {
  display: block;
  margin-top: 10px;
  color: #666;
}

.vote-btn {
  background: none;
  border: none;
  cursor: pointer;
  display: inline-flex; /* Inline-flex for aligning icon with the text */
  align-items: center;
  color: #606770; /* Default color similar to the image */
  padding: 5px; /* Padding around the text and icon */
  border-radius: 5px; /* Slightly rounded corners for the clickable area */
  transition: background-color 0.3s ease, transform 0.2s, color 0.3s;
}

.vote-btn:hover {
  background-color: #f0f0f0; /* Slightly change the background color */
  color: #333333; /* Darken the text/icon color */
  transform: translateY(-2px); /* Slight lift effect */
}

.vote-btn i {
  margin-right: 4px; /* Space between icon and text */
}

/* 댓글 섹션 스타일링 */
.comment-section {
  margin: 10px;
  padding: 15px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
}

.comment-input-area {
  display: flex;
  align-items: center;
  background: #f0f2f5; /* Light grey background */
  border-radius: 25px; /* Rounded corners for the input area */
  padding: 8px 16px; /* Padding inside the input area */
  border: 1px solid #d0d0d0; /* Border to match the uploaded images */
}

.comment-input {
  flex-grow: 1;
  border: none;
  outline: none;
  background: transparent;
  padding: 8px 12px; /* Slightly less padding to match the image */
  margin-right: 8px; /* Space between input and send button */
  font-size: 0.9rem; /* Adjusted font size */
  color: #5a5a5a; /* Font color */
}

.send-comment {
  background-color: #ffd700; /* Gold background to match the button in the image */
  border: none;
  border-radius: 50%; /* Circular shape */
  padding: 8px; /* Adjust padding to match the image */
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2); /* Shadow for depth */
  transition: box-shadow 0.3s ease-in-out;
}

.send-comment i {
  color: #ffffff; /* White icon color */
  font-size: 1.2em; /* Icon size */
}

.send-comment:hover {
  box-shadow: 0 4px 8px rgba(0,0,0,0.3); /* Enhanced shadow on hover for "pop-out" effect */
}

.comment {
  background-color: #ffffff; /* White background for comments */
  padding: 12px; /* Padding inside the comment */
  transition: background-color 0.2s ease; /* Smooth background transition */
}

.comment:hover {
  background-color: #f8f9fa; /* Lighter background on hover */
}

.comment-content {
  background-color: #ffffff; /* White background */
  border-radius: 18px; /* Rounded corners */
  padding: 10px 15px; /* Padding inside the comment */
  box-shadow: 0 1px 3px rgba(0,0,0,0.1); /* Subtle shadow */
  display: flex;
  justify-content: space-between; /* Space between the content and the vote buttons */
  align-items: center; /* Align items vertically */
  margin-bottom: 10px; /* Margin between comments */
  word-wrap: break-word; /* This will break the word at the end of the line */
  overflow-wrap: break-word; /* This is a more powerful property that will break words properly */
  hyphens: auto; /* This will automatically add hyphens where appropriate */
}

.comment p {
  margin: 0; /* No margin for the paragraph to fit neatly in the flexbox */
  font-size: 0.9rem; /* Font size similar to the image */
  color: #5a5a5a; /* Font color similar to the image */
}

/* Responsive styles for smaller screens */
@media (max-width: 768px) {
  .news-container {
    margin: 5px;
    padding: 10px;
  }

  .comment {
    padding: 8px 0;
    /* Ensure the comments don't get too narrow on small screens */
    display: flex;
    flex-direction: column;
  }

  .comment-content {
    padding: 8px;
    font-size: 0.875rem; /* Adjust font size for readability on small screens */
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .comment-input-area {
    /* Adjust padding and alignment for small screens */
    padding: 8px;
    align-items: stretch; /* Input and button stretch to fill space */
  }

  .comment-input {
    /* Adjust padding and text size for small screens */
    padding: 8px 12px;
    font-size: 0.875rem;
  }

  .send-comment {
    /* Adjust size and padding for the send button on small screens */
    padding: 8px;
    margin-left: 8px; /* Ensure some space between the input and the send button */
  }

  .vote-btn {
    /* Adjust padding and font size for vote buttons on small screens */
    padding: 5px;
    font-size: 0.8rem;
  }

  .vote-btn i {
    /* Adjust icon size inside vote buttons on small screens */
    font-size: 0.75rem;
  }
}
</style>
  