
<script>
  //ts-nocheck
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import { MetaMaskStore } from '$lib';

  
  import WalletIcon from '$lib/assets/Icons/wallet.svg';
  import ProfileIcon from '$lib/assets/Icons/profile.svg';
  import Logo from '$lib/assets/logo.png';
  
  let isSticked = writable(false);
  let userBalance;
  const { walletState, isMetaMaskPresent, connect, loaded, init } =
    MetaMaskStore();


  onMount(() => {
    init();
    const handleScroll = () => {
      const offset = window.pageYOffset || document.documentElement.scrollTop;
      isSticked.set(offset > 0); // Set to true as soon as we scroll down
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  $: walletID = Boolean($walletState.account) ? $walletState.account : 'undefined'


</script>
  
  <header class:sticked="{$isSticked}" class="fixed top-0 left-0 right-0 z-10">
    <div class="mx-auto max-w-8xl px-4 md:px-6 lg:px-8 2xl:px-14">
      <div class="flex items-center gap-x-2 py-2.5 ">
        <button class="h-full px-1 xl:hidden">
          <img src={WalletIcon} class="h-6 w-6 " alt="hamb" />
        </button>
        <div class="flex h-full items-center">
          <div class="relative w-40">
            <a href="/">
              <img src={Logo} class="absolute inset-0 my-auto object-contain" alt="logo" />
            </a>
          </div>
          <ul class="ml-6 hidden gap-x-6 border-l pl-6 font-semibold xl:flex">
            <li class="text-primary hover:text-primary/70"><a href="/marketplace">Marketplace</a></li>
            <li class="text-primary hover:text-primary/70"><a href="/collection">My Collection</a></li>
            <li class="text-primary hover:text-primary/70"><a href="/create">Create</a></li>
          </ul>
        </div>
        <div class="relative ml-6 hidden h-full flex-1 sm:block">
        </div>
        <div class="flex h-full items-center gap-x-3 mr-10">
          {#if $loaded}
            {#if $isMetaMaskPresent}
              {#if Boolean($walletState.account)}
                <button class="text-primary divide-x divide-white/20 flex h-full items-center rounded-xl bg-white/10 backdrop-blur-lg px-4 py-3 font-semibold hover:bg-white/20 gap-x-2">
                  <div class="flex gap-2">
                    <img src={WalletIcon} class="h-6 w-6" alt="wallet" />
                    <span class="hidden lg:inline-block">20 ETH</span>
                  </div>
                  <span class="hidden px-2 lg:inline-block">{walletID.substring(0,4)}...{walletID.substring(walletID.length - 2)}</span>
                </button>
              {:else}
                <button on:click={connect} class="text-primary flex h-full items-center rounded-xl bg-white/10 backdrop-blur-lg px-4 py-3 font-semibold hover:bg-white/20 gap-x-2">
                  <img src={WalletIcon} class="h-6 w-6" alt="wallet" />
                  <span class="hidden lg:inline-block">Connect Wallet</span>
                </button>
              {/if}
              {:else}
              <p>Please install MetaMask</p>
            {/if}
          {/if}
          <button class="text-primary flex h-full items-center rounded-xl bg-white/10 px-4 py-3 backdrop-blur-lg font-semibold hover:bg-white/20">
            <img src={ProfileIcon} class="h-6 w-6" alt="profile" />
          </button>
        </div>

        
      </div>
    </div>
  </header>
  

  
  <style>
    header.sticked {
      background-color: #121212;
      color: white;
      transition: background-color 0.5s, color 0.5s; /* Smooth transition for background and text color */
    }
  </style>