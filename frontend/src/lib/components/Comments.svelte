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
        const response = await fetch(`https://fastapi.watercharging.com/comments/${newsId}`);
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
        const response = await fetch(`https://fastapi.watercharging.com/comments`, {
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
        const response = await fetch(`https://fastapi.watercharging.com/comments/vote`, {
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
.comment-section {
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  border-radius: 10px;
  overflow: hidden;
  margin: 20px 0;
  font-family: 'Poppins', sans-serif;
}

.comment-input-container {
  display: flex;
  border-bottom: 2px solid #f0f0f0;
  padding: 15px;
  align-items: center;
}

.comment-input {
  flex-grow: 1;
  border: 1px solid #e0e0e0;
  outline: none;
  padding: 10px 15px;
  font-size: 1rem;
  border-radius: 25px;
  transition: border-color 0.3s ease-in-out;
  margin-right: 10px;
}

.comment-input:focus {
  border-color: #007bff; /* Focus state */
}

.send-comment {
  background-color: #007bff; /* Primary Button Color */
  border: none;
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.send-comment:hover {
  background-color: #0056b3; /* Darker on hover */
  transform: scale(1.05);
}

.send-comment:disabled {
  background-color: #cccccc;
}

.send-comment i {
  color: #ffffff;
  font-size: 1.2em;
}

.comments-list {
  list-style-type: none;
  padding: 10px;
}

.comment {
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 10px;
  margin-top: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: background-color 0.3s;
}

.comment:hover {
  background-color: #e9ecef;
}

.no-comments {
  text-align: center;
  padding: 20px;
  color: #999;
  font-size: 1rem;
}

@media screen and (max-width: 600px) {
  .comment-input-container, .comments-list, .comment {
    padding: 10px;
  }
  .comment-input {
    padding: 8px 10px;
    font-size: 0.9rem;
  }
  .send-comment {
    padding: 8px;
  }
}
</style>
  