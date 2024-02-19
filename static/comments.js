document.addEventListener('DOMContentLoaded', () => {
    const loadingIndicator = document.getElementById('loading-indicator');
    let currentPage = 1;
    let isLoading = false;

    function checkScroll() {
        if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 100 && !isLoading) {
            isLoading = true;
            loadingIndicator.style.display = 'block';
            currentPage++;
            loadMoreNews(currentPage);
        }
    }

    window.onscroll = checkScroll;

    // 댓글 폼 제출 이벤트 설정
    function setupCommentFormSubmitEvents() {
        document.querySelectorAll('.comment-form').forEach(form => {
            form.addEventListener('submit', function(event) {
                event.preventDefault();
                const newsId = this.getAttribute('data-news-id');
                const content = this.querySelector('textarea').value;

                fetch('/comments/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ news_id: parseInt(newsId, 10), content: content }),
                })
                .then(response => response.json())
                .then(comment => {
                    const commentsList = document.querySelector(`.comments-list[data-news-id="${newsId}"]`);
                    const commentElement = document.createElement('div');
                    commentElement.textContent = comment.content;
                    commentsList.appendChild(commentElement);
                    commentsList.style.display = 'block'; // 댓글 추가 후 댓글 목록 보이기

                    form.reset();
                    updateCommentCount(newsId, 1);
                })
                .catch(error => console.error('Error:', error));
            });
        });
    }

    // 댓글 아이콘 클릭 이벤트 설정
    function setupCommentIconClickEvent() {
        document.querySelectorAll('.comment-icon').forEach(icon => {
            icon.addEventListener('click', function() {
                const newsId = this.getAttribute('data-news-id');
                const commentsList = document.querySelector(`.comments-list[data-news-id="${newsId}"]`);
                commentsList.style.display = commentsList.style.display === 'none' ? 'block' : 'none';
            });
        });
    }

    // 뉴스 추가 로딩 함수
    function loadMoreNews(page) {
        fetch(`/news?page=${page}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Server responded with status ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (Array.isArray(data)) {
                    data.forEach(news => createNewsCard(news));
                    setupCommentIconClickEvent(); // 동적으로 생성된 뉴스 카드에 대한 클릭 이벤트 설정
                } else {
                    console.error('Received data is not an array:', data);
                }
            })
            .catch(error => {
                console.error('Error loading more news:', error);
                alert('Failed to load more news. Please try again later.'); // 사용자에게 실패 메시지 표시
            })
            .finally(() => {
                isLoading = false;
                loadingIndicator.style.display = 'none';
            });
    }
    
    

    // 뉴스 카드 생성 함수
    function createNewsCard(newsItem) {
        const container = document.querySelector('.news-container');
        const newsCard = document.createElement('div');
        newsCard.classList.add('news-card');
        newsCard.innerHTML = `
            <h2>${newsItem.title}</h2>
            <small>출처: ${newsItem.source} | 날짜: ${newsItem.pubDate}</small>
            <a href="${newsItem.link}" target="_blank">더 보기</a>
            <div class="comment-icon" data-news-id="${newsItem.id}">
                <i class="far fa-comment"></i>
                <span class="comment-count" data-news-id="${newsItem.id}">${newsItem.comment_count}</span>개의 댓글
            </div>
            <div class="comments-list" data-news-id="${newsItem.id}" style="display:none;">
                <!-- 댓글은 여기에 동적으로 로드됩니다 -->
            </div>
        `;
        container.appendChild(newsCard);
    }

    setupCommentFormSubmitEvents(); // 초기 로딩 시 댓글 폼 이벤트 리스너 설정
    setupCommentIconClickEvent(); // 초기 로딩 시 댓글 아이콘 클릭 이벤트 설정
});

function updateCommentCount(newsId, change) {
    const commentCountElement = document.querySelector(`.comment-count[data-news-id="${newsId}"]`);
    let commentCount = parseInt(commentCountElement.textContent) || 0;
    commentCount += change;
    commentCountElement.textContent = commentCount;
}
