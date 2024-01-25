<script>
    //@ts-nocheck
    import { onMount } from 'svelte';
    import cover from '$lib/assets/coverhdnowm.mp4';
    import coverImg from '$lib/assets/createcover.png';
  
    let video;
    let showVideo = true;
    let showBlackScreen = false;
  
    onMount(() => {
      if (video) {
        video.playbackRate = 1.6;
      }
  
      setTimeout(() => {
        showBlackScreen = true;
        setTimeout(() => {
          showVideo = false;
          showBlackScreen = false;
        }, 2000); // Duration of black screen
      }, 6000); // Duration before transition starts
    });
  </script>
  
  <video bind:this={video} class="absolute top-0 left-0 w-full h-screen object-cover  transition-opacity duration-1000 {showVideo ? 'opacity-100' : 'opacity-0'}" autoplay muted loop>
    <source src="{cover}" type="video/mp4">
  </video>
  
  <div class="absolute top-0 left-0 w-full h-screen bg-black transition-opacity duration-500 {showBlackScreen ? 'opacity-100' : 'opacity-0'}"></div>
  
  <img src="{coverImg}" alt="coverimg" class="absolute top-0 left-0 w-full h-screen object-cover transition-opacity duration-1000 {showVideo ? 'opacity-0' : 'opacity-100'}">
  