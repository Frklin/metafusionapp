<script>
    // @ts-nocheck
    import image1032 from '$lib/assets/NFTs/1032.avif';
    import image2154 from '$lib/assets/NFTs/2154.avif';
    import image5324 from '$lib/assets/NFTs/5324.avif';
    import image5214 from '$lib/assets/NFTs/5214.avif';
    import image4153 from '$lib/assets/NFTs/4153.avif';
	import Cover from '$lib/components/Cover.svelte';
    import Profile from '$lib/components/Profile.svelte';
    import GridView from '$lib/components/marketplace/GridView.svelte';
    import UtilityBar from '$lib/components/filters/UtilityBar.svelte';
    import FilterTab from '$lib/components/filters/FilterTab.svelte';
    import Packet from '$lib/assets/Packs/packet.jpg'
    import TypeSelector from '$lib/components/marketplace/TypeSelector.svelte';
    import { sortOptions, profileImages } from '$lib/constants.js';
    import { onMount } from 'svelte';
    import { page } from '$app/stores';

    let selectedNFTType = 'Cards';
    let filterTabOpen = false;
    let searchQuery = '';
    let selectedSort = sortOptions[2];
    let selectedCategories = new Set()
    let selectedPromptCounts = new Set()
    let selectedRarities = new Set()

    let user = {username: '', avatar: '', address: ''};
    let userId = {};
    let cards = [];
    let prompts = [];
    let packs = [];
    let filteredItems = [];


    async function fetchUserCards() {
        if (userId) {
            try{
                const res = await fetch('http://localhost:3000/user/'+userId);
                const data = await res.json();
                cards = data.cards;
                user.address=userId
                user.avatar= 'https://avatars.githubusercontent.com/u/59870781?v=4';
                user.username='User'+userId.substring(userId.length - 4);
                for(let i=0; i<cards.length; i++){
                    cards[i].img_path = 'http://localhost:3000/card/' + cards[i].id + '/image';
                }
                filteredItems = cards;
            } catch (err) {
                console.error(err);
            }
        }
    }

    async function fetchUserPacks() {
        if (userId) {
            try{
                const res = await fetch('http://localhost:3000/user/'+userId);
                const data = await res.json();
                packs = data.packets;
                user.address=userId
                // user.avatar= profileImages[Math.floor(Math.random() * profileImages.length)];
                user.username='User'+userId.substring(userId.length - 4);
                for(let i=0; i<packs.length; i++){
                    packs[i].img_path = Packet;
                }
                filteredItems = packs;
            } catch (err) {
                console.error(err);
            }
        }
    }

    async function fetchUserPrompts() {
        if (userId) {
            try{
                const res = await fetch('http://localhost:3000/user/'+userId);
                const data = await res.json();
                prompts = data.prompts;
                user.address=userId
                // user.avatar='https://avatars.githubusercontent.com/u/59870781?v=4'
                user.username='User'+userId.substring(userId.length - 4);
                filteredItems = prompts;
            } catch (err) {
                console.error(err);
            }
        }
    }


    onMount(async () => {
        userId = $page.params.id; 
        await fetchUserCards();
        filteredItems = cards;
    });
    $: {
    if (selectedNFTType === 'Cards') {
        fetchUserCards();
    } else if (selectedNFTType === 'Prompts') {
        fetchUserPrompts();
    } else if (selectedNFTType === 'Packs') {
        fetchUserPacks();
    }
    }
    $: items = selectedNFTType === 'Cards' ? cards : selectedNFTType === 'Prompts' ? prompts : packs;


</script>


{#if (user.address)}
<div class="flex w-full flex-col items-start " id="main">
    <!-- COVER -->
    <div class="relative w-full " id="main">
        <Cover />
    </div>

    <!-- CONTENT -->
    <div class="absolute top-[29%] w-full px-10 gap-20">
        <!-- PROFILE INFO -->
        <Profile userId={userId} username={user.username} avatar={user.avatar} address={user.address} />

        <div class="flex flex-col w-full items-center -my-10">

            <TypeSelector bind:selectedNFTType/>

            <!-- INFOS -->
            <UtilityBar items={items} bind:filteredItems={filteredItems} bind:filterTabOpen bind:searchQuery bind:selectedSort fromWhere={"collection"}/>
        
            <div class="flex w-full scrollbar">
                {#if filterTabOpen}
                    <FilterTab bind:filteredItems={filteredItems} fromWhere={"collection"} bind:selectedCategories bind:selectedPromptCounts bind:selectedRarities/>
                {/if}
                <div class="w-full pt-4 overflow-auto scrollbar min-h-dvh">
                    <GridView items={filteredItems} bind:filterTabOpen isMine={true} fromWhere={"collection"}/>
                </div>
            </div>
        </div>
    </div>
</div>
{/if}

