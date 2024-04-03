<!-- frontend/src/lib/components/NewsItem.svelte-->
<script>
    import { createEventDispatcher } from 'svelte';
    import Comments from './Comments.svelte';
    import { commentsCountStore } from '$lib/stores.js';

    export let news;
    let showComments = false;
    let isLoading = false;
  
    const dispatch = createEventDispatcher();

    // Reactive statement to get the comment count for this news item
    $: commentsCount = $commentsCountStore.get(news.id) || 0;
  
    // Function to toggle the visibility of comments
    function toggleComments() {
        showComments = !showComments;
        if (showComments) {
            dispatch('fetchComments', { newsId: news.id });
        }
    }
</script>

{#if isLoading}
  <div class="loading-bar"></div>
{/if}

<li class="news-item">
    <a href="{news.link}" target="_blank">{news.title}</a>
    <small>출처: {news.source} | Date: {news.publication_date}</small>
    <div class="news-actions">
        <!-- Button to toggle comments -->
        <button on:click={toggleComments} class="vote-btn">
            <i class="fa-regular fa-message"></i> {commentsCount ?? 0} <!-- Updated to show comment count -->
        </button>
        <!-- Button to upvote -->
        <button on:click={() => dispatch('vote', { newsId: news.id, voteType: 'upvote' })} class="vote-btn">
            <i class="fas fa-thumbs-up"></i> {news.upvotes ?? 0}
        </button>
        <!-- Button to downvote -->
        <button on:click={() => dispatch('vote', { newsId: news.id, voteType: 'downvote' })} class="vote-btn">
            <i class="fas fa-thumbs-down"></i> {news.downvotes ?? 0}
        </button>          
    </div>
    <!-- Conditionally render the Comments component -->
    {#if showComments}
        <Comments newsId={news.id} />
    {/if}
</li>
  
<style>
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

.news-actions button {
    margin-right: 10px;
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

.loading-bar {
    height: 4px;
    width: 100%;
    background-color: #3498db; /* 로딩 바의 색상 */
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1000;
    animation: loadingAnimation 2s linear infinite;
  }

  @keyframes loadingAnimation {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
</style>
