document.addEventListener('DOMContentLoaded', () => {
    const newsContainer = document.querySelector('.news-container');
    const loadingIndicator = document.getElementById('loading-indicator');
    let currentPage = 1;
    let isLoading = false;

    // 뉴스 추가 로딩
    window.onscroll = () => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100 && !isLoading) {
            isLoading = true;
            loadingIndicator.style.display = 'block';
            currentPage++;
            loadMoreNews(currentPage);
        }
    };

    // 댓글 아이콘 클릭 이벤트
    newsContainer.addEventListener('click', event => {
        const target = event.target;
        if (target.classList.contains('comment-icon')) {
            const newsCardWrapper = target.closest('.news-card-wrapper');
            if (newsCardWrapper) {
                const newsId = newsCardWrapper.getAttribute('data-news-id');
                if (newsId) {
                    toggleCommentForm(newsId);
                }
            }
        }
    });

    // 댓글 제출 이벤트
    newsContainer.addEventListener('submit', event => {
        if (event.target.matches('.comment-form form')) {
            event.preventDefault();
            const form = event.target;
            const newsId = form.closest('.comment-form').dataset.newsId;
            const contentInput = form.querySelector('input[type="text"]');
            submitComment(newsId, contentInput.value);
            contentInput.value = '';
        }
    });

    // 뉴스 추가 로딩 함수
    function loadMoreNews(page) {
        fetch(`/news?page=${page}`)
            .then(response => response.json())
            .then(data => {
                data.forEach(news => createNewsCard(news));
                isLoading = false;
                loadingIndicator.style.display = 'none';
            })
            .catch(error => {
                isLoading = false;
                loadingIndicator.style.display = 'none';
            });
    }

    // 뉴스 카드 생성 함수
    function createNewsCard(news) {
        // Create the outer wrapper for the news card
        const newsCardWrapper = document.createElement('div');
        newsCardWrapper.className = 'news-card-wrapper';
        newsCardWrapper.setAttribute('data-news-id', news.id);
    
        // Create the link element for the news card
        const newsLink = document.createElement('a');
        newsLink.href = news.link;
        newsLink.className = 'news-card-link';
        newsLink.target = '_blank';
        newsLink.rel = 'noopener noreferrer';
    
        // Create the news card container
        const newsCard = document.createElement('div');
        newsCard.className = 'news-card';
    
        // Create and append the image placeholder (or actual image if available)
        const imagePlaceholder = document.createElement('div');
        imagePlaceholder.className = 'image-placeholder';
        // Assuming 'imageText' or 'imageUrl' are properties of the news object
        const imageText = document.createElement('span');
        imageText.className = 'image-text';
        imageText.textContent = news.imageText || 'No Image';  // Placeholder text
        imagePlaceholder.appendChild(imageText);
        newsCard.appendChild(imagePlaceholder);
    
        // Create and append the content section of the card
        const newsContent = document.createElement('div');
        newsContent.className = 'news-content';
    
        // Create and append the title
        const newsTitle = document.createElement('h2');
        newsTitle.className = 'news-title';
        newsTitle.textContent = news.title;
        newsContent.appendChild(newsTitle);
    
        // Create and append the publication date
        const newsPubDate = document.createElement('p');
        newsPubDate.className = 'news-pubdate';
        newsPubDate.textContent = news.pubDate;
        newsContent.appendChild(newsPubDate);
    
        // Add the news content section to the news card
        newsCard.appendChild(newsContent);
    
        // Append the news card to the link element
        newsLink.appendChild(newsCard);
    
        // Finally, append the link element to the news card wrapper
        newsCardWrapper.appendChild(newsLink);
    
        // Append the news card wrapper to the news container
        const newsContainer = document.querySelector('.news-container');
        newsContainer.appendChild(newsCardWrapper);
    }

    // 댓글 토글 함수
    function toggleCommentForm(newsId) {
        const commentForm = document.querySelector(`.comment-form[data-news-id="${newsId}"]`);
        if (!commentForm) {
            console.error(`No comment form found for news ID ${newsId}`);
            return;
        }
        
        const isCurrentlyHidden = window.getComputedStyle(commentForm).display === 'none';
        commentForm.style.display = isCurrentlyHidden ? 'block' : 'none';
    }

    // 댓글 제출 함수
    function submitComment(newsId, content) {
        // Check if the content is empty
        if (!content.trim()) {
            alert("Comment content cannot be empty.");
            return;
        }
    
        // Prepare the data to be sent in the request
        const formData = new FormData();
        formData.append('news_id', newsId);
        formData.append('content', content);
    
        // Make a POST request to submit the comment
        fetch('/comments/', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Comment submitted:', data);
            // Optionally, refresh the comments section to show the new comment
            loadComments(newsId);
        })
        .catch(error => {
            console.error('Error submitting comment:', error);
        });
    }

    // 댓글 로딩 함수
    function loadComments(newsId) {
        // Find the comments container for the specific news card
        const commentsContainer = document.querySelector(`.comments-container[data-news-id="${newsId}"]`);
        if (!commentsContainer) {
            console.error(`No comments container found for news ID ${newsId}`);
            return;
        }
    
        // Fetch comments from the server
        fetch(`/comments/${newsId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(comments => {
                // Clear existing comments
                commentsContainer.innerHTML = '';
    
                // Add each comment to the container
                comments.forEach(comment => {
                    const commentDiv = document.createElement('div');
                    commentDiv.className = 'comment';
                    commentDiv.textContent = comment.content; // Assuming 'content' is the key for the comment text
                    commentsContainer.appendChild(commentDiv);
                });
            })
            .catch(error => {
                console.error('Error loading comments:', error);
            });
    }
});
