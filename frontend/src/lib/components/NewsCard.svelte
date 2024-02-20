<script>
    export let news;
  </script>

<div class="pagination">
  <button on:click={goToPreviousPage} disabled={currentPage === 1}>Previous Page</button>
  <span class="page-number">Page {currentPage}</span>
  <button on:click={goToNextPage} disabled={!isNextPageAvailable}>Next Page</button>
</div>
  
<div class="news-card">
  <h2>{news.title}</h2>
  <p class="news-source">출처: {news.source}</p>
  <p class="news-date">날짜: {news.pubDate}</p>
  <a href={news.link} target="_blank" class="read-more">더 보기</a>
</div>

<style>
  .news-card {
    background-color: white;
    margin: 10px 0;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  .news-card h2 {
    margin: 0 0 10px 0;
    color: #007bff;
    font-size: 1.5rem;
  }
  .news-card p {
    margin: 4px 0;
    color: #666;
  }
  .read-more {
    display: inline-block;
    margin-top: 10px;
    color: #007bff;
    text-decoration: none;
  }
  .read-more:hover {
    text-decoration: underline;
  }
</style>
  