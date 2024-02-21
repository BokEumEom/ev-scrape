<script>
    import { onMount } from 'svelte';
    import { commentsCountStore } from '$lib/stores.js';
  
    export let newsId;
  
    let comments = [];
    let newComment = '';
    let errorMessage = '';
  
    // This function fetches comments for the current news item
    async function fetchComments() {
      try {
        const response = await fetch(`http://localhost:8000/comments/${newsId}`);
        if (!response.ok) throw new Error(`Failed to fetch comments: ${response.statusText}`);
        const data = await response.json();
        comments = data;
        commentsCountStore.update(store => {
          store.set(newsId, comments.length);
          return store;
        });
      } catch (error) {
        errorMessage = `Error fetching comments: ${error.message}`;
        console.error(errorMessage);
      }
    }
  
    // This function adds a new comment to the current news item
    async function addComment() {
      const content = newComment.trim();
      if (!content) {
        errorMessage = 'Comment content cannot be empty';
        return;
      }

      try {
        const response = await fetch(`http://localhost:8000/comments`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ news_id: newsId, content })
        });
        if (!response.ok) throw new Error(`Failed to post comment: ${response.statusText}`);
        newComment = ''; // Clear the input
        await fetchComments(); // Refresh comments list after adding a new comment
      } catch (error) {
        errorMessage = `Error adding comment: ${error.message}`;
        console.error(errorMessage);
      }
    }

    // Function to handle voting on a comment
    async function voteComment(commentId, voteType) {
      try {
        const response = await fetch(`http://localhost:8000/comments/vote`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ comment_id: commentId, vote_type: voteType })
        });
        if (!response.ok) throw new Error('Failed to register comment vote.');
        await fetchComments(); // Refresh comments to reflect the vote change
      } catch (error) {
        errorMessage = `Error voting on comment: ${error.message}`;
        console.error(errorMessage);
      }
    }
  
    onMount(fetchComments);
  </script>

  <!-- Display error message, if any -->
  {#if errorMessage}
  <p class="error-message">{errorMessage}</p>
  {/if}
  
  <div class="comment-section">
    <!-- Comment Input Area with Integrated Button -->
    <div class="comment-input-container">
      <input
        class="comment-input"
        type="text"
        bind:value={newComment}
        placeholder="Write a comment..."
      />
      <button
        class="send-comment"
        on:click={addComment}
        disabled={!newComment.trim()}
      >
      <i class="fa-solid fa-arrow-up"></i>
      </button>
    </div>
  
    <!-- Comments List -->
    {#if comments.length > 0}
      <ul class="comments-list">
        {#each comments as comment (comment.id)}
          <li class="comment">
            <div class="comment-content">{comment.content}</div>
          </li>
        {/each}
      </ul>
    {:else}
      <p class="no-comments">No comments yet.</p>
    {/if}
  </div>
  
  
  <style>
    /* Comment Section Styling */
.comment-section {
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  border-radius: 8px;
  overflow: hidden;
  margin: 10px 0;
}

/* Comment Input Container with Button */
.comment-input-container {
  display: flex;
  border-bottom: 1px solid #eee;
  padding: 10px;
  align-items: center;
}

.comment-input {
  flex-grow: 1;
  border: none;
  outline: none;
  padding: 8px 12px;
  font-size: 0.9rem;
  border-radius: 20px;
  margin-right: 8px;
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

.send-comment:disabled {
  background-color: #007bff;
}

.send-comment i {
  color: #ffffff; /* White icon color */
  font-size: 1.2em; /* Icon size */
}

.send-comment:hover {
  box-shadow: 0 4px 8px rgba(0,0,0,0.3); /* Enhanced shadow on hover for "pop-out" effect */
}

/* Comment List Styles */
.comments-list {
  list-style-type: none;
  padding: 0;
}

.comment {
  background-color: #f8f9fa;
  padding: 10px;
  border-radius: 8px;
  margin-top: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.comment:hover {
  background-color: #e9ecef;
}

.comment:last-child {
  border-bottom: none;
}

.comment-content {
  flex-grow: 1;
  margin-right: 10px;
}

.no-comments {
  text-align: center;
  padding: 20px;
  color: #999;
}
  </style>
  