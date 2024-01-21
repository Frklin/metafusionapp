<script>
  // @ts-nocheck
    import "../app.css";
    import "@fontsource/montserrat"
    import '@fontsource/poppins'
    import '@fontsource/inter'
    import Navbar from '$lib/components/Navbar.svelte';
  </script>




<div class="w-full min-h-screen">
    <Navbar />
    
    <slot />

</div>


