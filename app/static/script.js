document.addEventListener('DOMContentLoaded', () => {
    const loadingIndicator = document.getElementById('loading-indicator');
    let currentPage = 1;
    let isLoading = false;
    let noMoreNews = false;

    const newsContainer = document.querySelector('.news-container');

    window.addEventListener('scroll', () => {
        if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 100 && !isLoading && !noMoreNews) {
            isLoading = true;
            loadingIndicator.style.display = 'block';
            loadMoreNews(currentPage++);
        }
    });

    function loadMoreNews(page) {
        fetch(`/news?page=${page}`)
            .then(response => {
                if (!response.ok) throw new Error(`Error: ${response.statusText}`);
                return response.json();
            })
            .then(newsItems => {
                if (newsItems.length === 0) {
                    noMoreNews = true;
                    alert('No more news available.');
                    return;
                }
                newsItems.forEach(newsItem => createNewsCard(newsItem));
                setupCommentFormSubmitEvents();
            })
            .catch(error => {
                console.error('Failed to load more news:', error);
                alert('Failed to load more news. Please try again later.');
            })
            .finally(() => {
                isLoading = false;
                loadingIndicator.style.display = 'none';
            });
    }

    function createNewsCard(newsItem) {
        const newsCard = document.createElement('div');
        newsCard.classList.add('news-card');
        newsCard.setAttribute('data-news-id', newsItem.id);
        newsCard.setAttribute('data-link', newsItem.link);
        newsCard.innerHTML = `
            <h2>${newsItem.title}</h2>
            <small>Source: ${newsItem.source} | Date: ${newsItem.pubDate}</small>
            <a href="${newsItem.link}" target="_blank" class="read-more">Read More</a>
            <div class="comments-section">
                <form class="comment-form" data-news-id="${newsItem.id}">
                    <textarea name="content" placeholder="Enter your comment" required></textarea>
                    <button type="submit">댓글 추가</button>
                </form>
                <div class="comments-list" style="display: none;"></div>
                <div class="comment-icon"><i class="far fa-comment"></i> <span class="comment-count">0</span> Comments</div>
            </div>
        `;
        newsContainer.appendChild(newsCard);
    }

    function setupCommentFormSubmitEvents() {
        document.querySelectorAll('.comment-form').forEach(form => {
            form.addEventListener('submit', handleCommentSubmit);
        });
    }

    function handleCommentSubmit(event) {
        event.preventDefault();
        const form = event.currentTarget;
        const newsId = form.dataset.newsId;
        const content = form.content.value;
        
        submitComment(newsId, content)
            .then(comment => {
                if (comment) {
                    addCommentToUI(newsId, comment);
                    form.reset();
                    updateCommentCount(newsId);
                }
            })
            .catch(error => {
                console.error('Error posting comment:', error);
                alert('Failed to add comment. Please try again.');
            });
    }

    async function submitComment(newsId, content) {
        const response = await fetch('/comments/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ news_id: parseInt(newsId, 10), content: content })
        });
    
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error posting comment:', errorData);
            // 에러 메시지를 더 명확하게 표시
            throw new Error(`Failed to submit comment: ${errorData.detail || JSON.stringify(errorData)}`);
        }
    
        return response.json();
    }
        

    function addCommentToUI(newsId, comment) {
        const commentsList = document.querySelector(`.comments-list[data-news-id="${newsId}"]`);
        const commentElement = document.createElement('div');
        commentElement.textContent = comment.content;
        commentsList.appendChild(commentElement);
        commentsList.style.display = 'block';
    }

    function updateCommentCount(newsId) {
        const commentCountElement = document.querySelector(`.comment-icon[data-news-id="${newsId}"] .comment-count`);
        let count = parseInt(commentCountElement.textContent, 10) || 0;
        commentCountElement.textContent = count + 1;
    }

    document.addEventListener('click', event => {
        if (event.target.closest('.comment-icon')) {
            const newsId = event.target.closest('.news-card').dataset.newsId;
            const commentsList = document.querySelector(`.comments-list[data-news-id="${newsId}"]`);
            commentsList.style.display = commentsList.style.display === 'none' ? 'block' : 'none';
        }
    });

    // Load the initial set of news items
    loadMoreNews(currentPage);
});
