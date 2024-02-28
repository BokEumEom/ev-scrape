<script>
  import { onMount } from 'svelte';
  import { icnAnnouncements, kykiAnnouncements, seoulAnnouncements, koroadAnnouncements } from '$lib/stores'; // Adjust this path if necessary
  import Navbar from '$lib/components/Navbar.svelte'; // Adjust this path if necessary
  import { Spinner } from 'flowbite-svelte';

  // Declaring reactive variables
  let showICN = false;
  let showKYKI = false;
  let showSeoul = false;
  let showKoroad = false;

  let isLoadingICN = false;
  let isLoadingKYKI = false;
  let isLoadingSeoul = false;
  let isLoadingKoroad = false;

  async function fetchAnnouncementsIfNeeded(endpoint, store, setLoadingStatus) {
    let currentData;
    store.subscribe(value => {
      currentData = value;
    })(); // Immediately invoke the function returned by `subscribe` to unsubscribe

    if (currentData.length === 0) {
      setLoadingStatus(true); // 로딩 시작
      try {
        const response = await fetch(`http://localhost:8000/announce/${endpoint}`);
        if (response.ok) {
          const data = await response.json();
          store.set(data);
        } else {
          console.error(`Failed to fetch ${endpoint} announcements`);
        }
      } catch (error) {
        console.error(`Error fetching announcements for ${endpoint}:`, error);
      } finally {
        setLoadingStatus(false); // 로딩 완료 또는 에러 발생 시 로딩 완료 처리
      }
    }
  }

  onMount(() => {
    fetchAnnouncementsIfNeeded('icn', icnAnnouncements, (isLoading) => isLoadingICN = isLoading);
    fetchAnnouncementsIfNeeded('kyki', kykiAnnouncements, (isLoading) => isLoadingKYKI = isLoading);
    fetchAnnouncementsIfNeeded('seoul', seoulAnnouncements, (isLoading) => isLoadingSeoul = isLoading);
    fetchAnnouncementsIfNeeded('koroad', koroadAnnouncements, (isLoading) => isLoadingKoroad = isLoading);
  });

  // Toggle functions for each announcement type
  function toggleICN() {
    showICN = !showICN;
  }
  function toggleKYKI() {
    showKYKI = !showKYKI;
  }
  function toggleSeoul() {
    showSeoul = !showSeoul;
  }
  function toggleKoroad() {
    showKoroad = !showKoroad;
  }
</script>

<Navbar />

<div class="announcements-container">
  {#if isLoadingICN}
    <Spinner />
    <div class="loading-bar"><p>Loading 인천시 공고...</p></div>
  {:else}
    <button on:click={toggleICN} class="accordion">인천시 공고</button>
    <div class={showICN ? 'panel show' : 'panel'}>
      {#if $icnAnnouncements.length > 0}
        <ul>
          {#each $icnAnnouncements as announcement}
            <li>
              <a href={announcement.link} target="_blank">{announcement.title}</a>
              <small>제공일자: {announcement.date}</small>
            </li>
          {/each}
        </ul>
      {:else}
        <p>인천 공고 정보를 불러올 수 없습니다.</p>
      {/if}
    </div>
  {/if}

  {#if isLoadingKYKI}
    <Spinner />
    <p>Loading 경기도 공고...</p>
  {:else}
    <button on:click={toggleKYKI} class="accordion">경기도 공고</button>
    <div class={showKYKI ? 'panel show' : 'panel'}>
      {#if $kykiAnnouncements.length > 0}
        <ul>
          {#each $kykiAnnouncements as announcement}
            <li>
              <a href={announcement.link} target="_blank">{announcement.title}</a>
              <small>사업일자: {announcement.date}</small>
            </li>
          {/each}
        </ul>
      {:else}
        <p>경기도 공고 정보를 불러올 수 없습니다.</p>
      {/if}
    </div>
  {/if}

  {#if isLoadingSeoul}
    <Spinner />
    <div class="loading-bar"></div>
  {:else}
    <div>
      <button on:click={toggleSeoul} class="accordion">서울시 공고</button>
      <div class={showSeoul ? 'panel show' : 'panel'}>
        {#if $seoulAnnouncements.length > 0}
          <ul>
            {#each $seoulAnnouncements as announcement}
              <li>
                <a href={announcement.link} target="_blank">{announcement.title}</a>
                <small>제공일자: {announcement.date}</small>
              </li>
            {/each}
          </ul>
        {:else}
          <p>서울 공고 정보를 불러올 수 없습니다.</p>
        {/if}
      </div>
    </div>
  {/if}

  {#if isLoadingKoroad}
    <Spinner />
    <div class="loading-bar"></div>
  {:else}
    <div>
      <button on:click={toggleKoroad} class="accordion">KoROAD 공고</button>
      <div class={showKoroad ? 'panel show' : 'panel'}>
        {#if $koroadAnnouncements.length > 0}
          <ul>
            {#each $koroadAnnouncements as announcement}
              <li>
                <a href={announcement.link} target="_blank">{announcement.title}</a>
                <small>마감일: {announcement.date}</small>
              </li>
            {/each}
          </ul>
        {:else}
          <p>KoROAD 공고 정보를 불러올 수 없습니다.</p>
        {/if}
      </div>
    </div>
  {/if}
</div>

<style>
  .announcements-container {
    display: flex;
    flex-direction: column;
    margin-top: 5px;
  }

  .accordion {
    font-family: 'Noto Sans KR', sans-serif;
    background-color: #343434;
    color: white;
    cursor: pointer;
    padding: 15px;
    width: 100%;
    text-align: left;
    border: none;
    outline: none;
    transition: background-color 0.4s ease;
    border-radius: 4px;
    font-size: 16px; /* Adjust font size as needed */
    font-weight: bold; /* Make the text bold */
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* Subtle shadow for depth */
  }

  .accordion:hover {
    background-color: #03C75B;
  }

  .panel {
    background-color: white;
    overflow: hidden;
    transition: max-height 0.2s ease-out, padding 0.2s ease-out;
    max-height: 0;
    padding: 0 18px;
    border: 1px solid #E5E5E5;
    border-radius: 4px;
  }

  .panel.show {
    max-height: 1000px; /* Adjust as necessary */
    padding-top: 10px; /* Add padding for visual comfort */
    padding-bottom: 10px; /* Add padding for visual comfort */
  }

  h2 {
    margin: 0; /* Remove default margin */
  }

  ul {
    list-style-type: none; /* Remove default list styling */
    padding: 0;
    margin: 0; /* Remove default margin */
  }

  li {
    padding: 10px 0;
    border-bottom: 1px solid #eee; /* Subtle separator for each item */
    transition: background-color 0.3s ease;
  }

  li:hover {
    background-color: #f8f9fa; /* Light background on hover for interactivity */
  }

  a {
    color: #0645ad;
    text-decoration: none; /* Remove underline */
    font-weight: 500; /* Medium weight for readability */
  }

  a:hover {
    text-decoration: underline; /* Underline on hover for interactivity */
  }

  small {
    color: #666; /* Subdued color for less important text */
    display: block; /* Block display for positioning */
    font-size: 14px; /* Smaller font size for date */
    margin-top: 5px; /* Space above the date */
  }

  .loading-bar {
    height: 4px;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #3498db; /* 로딩 바 색상 */
    animation: loadingAnimation 2s infinite;
    z-index: 9999;
  }

  @keyframes loadingAnimation {
    0% {
      transform: translateX(-100%);
    }
    50% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(100%);
    }
  }
  /* Desktop-specific styles */
  @media (min-width: 768px) {
    .announcements-container {
      margin: 20px auto; /* 가운데 정렬 */
      max-width: 1024px; /* PC 환경에서는 최대 너비를 제한합니다. */
    }
  }
</style>