  <nav class="navbar">
    <div class="navbar-brand"><i class="fa-solid fa-bolt-lightning"></i>전기차</div>
    <ul class="navbar-menu">
      <li class="navbar-item"><a href="/"><i class="fa-solid fa-newspaper"></i>뉴스</a></li>
      <li class="navbar-item"><a href="/announce"><i class="fa-solid fa-charging-station"></i>공고</a></li>
    </ul>
  </nav>
  
  <style>
    .navbar {
      font-family: 'Noto Sans KR', sans-serif;
      background-color: #7766F9;
      color: white;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 18px;
      border-radius: 4px;
    }
    .navbar-brand {
      font-weight: bold;
      font-size: 1.2rem;
    }
    .navbar-menu {
      list-style: none;
      display: flex;
      margin: 0;
      padding: 0;
      flex-direction: row;
    }
    .navbar-item {
      margin-left: 1rem;
    }
    .navbar-item a {
      color: white;
      text-decoration: none;
      padding: 0.5rem 0.75rem;
    }
    .navbar-item a:hover {
      background-color: #0056b3;
      border-radius: 5px;
    }
    @media (min-width: 768px) {
    .navbar {
      margin: 20px auto; /* 가운데 정렬 */
      max-width: 1024px; /* PC 환경에서는 최대 너비를 제한합니다. */
      padding: 18px 50px; /* PC 환경에서는 좀 더 넓은 패딩을 줍니다. */
    }
    .navbar-menu {
      margin-left: auto; /* Push the menu to the right */
    }
  }
  </style>
  
  