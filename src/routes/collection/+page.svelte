<script>
    // @ts-nocheck

	import Cover from '$lib/components/Cover.svelte';
    import Profile from '$lib/components/Profile.svelte';
    import GridView from '$lib/components/marketplace/GridView.svelte';
    import UtilityBar from '$lib/components/filters/UtilityBar.svelte';
    import FilterTab from '$lib/components/filters/FilterTab.svelte';
    import Packet from '$lib/assets/Packs/packet.jpg'
    import TypeSelector from '$lib/components/marketplace/TypeSelector.svelte';
    import MintButton from '$lib/components/MintButton.svelte';    
    import { sortOptions, NFTTypes, profileImages } from '$lib/constants.js';
    import { user_pk } from '$lib';
    import { onMount } from 'svelte';
    import { MetaMaskStore } from '$lib';
	import { filter } from '@skeletonlabs/skeleton';

    const { walletState, isMetaMaskPresent, connect, loaded, balance, init } = MetaMaskStore();
    let filterTabOpen = false;
    let searchQuery = '';
    let selectedSort = sortOptions[2];
    let selectedCategories = new Set()
    let selectedPromptCounts = new Set()
    let selectedRarities = new Set()
    let selectedNFTType = 'Cards';
    let user = {
            username: '',
            avatar: profileImages[Math.floor(Math.random() * profileImages.length)],
            address: '0x123456...7890',
        }

    

    let items = [];
    let filteredItems = [];
    let packs = [];
    let prompts = [];
    let cards = [];
    
    async function fetchUserCards() {
        if (user_pk) {
            try{
                const res = await fetch('http://localhost:3000/user/'+user_pk);
                const data = await res.json();
                cards = data.cards;
                user.address=user_pk
                user.username='User'+user_pk.substring(user_pk.length - 4);
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
        if (user_pk) {
            try{
                const res = await fetch('http://localhost:3000/user/'+user_pk);
                const data = await res.json();
                packs = data.packets;
                user.address=user_pk
                user.username='User'+user_pk.substring(user_pk.length - 4);
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
        if (user_pk) {
            try{
                const res = await fetch('http://localhost:3000/user/'+user_pk);
                const data = await res.json();
                prompts = data.prompts;
                user.address=user_pk
                user.username='User'+user_pk.substring(user_pk.length - 4);
                filteredItems = prompts;
            } catch (err) {
                console.error(err);
            }
        }
    }

    async function getUserData() {
        if (user_pk){
            try {
                const res = await fetch('http://localhost:3000/user/'+user_pk);
                const data = await res.json();
                let cards = data.cards;
                let packs = data.packets;
                user.address=user_pk
                user.username='User'+user_pk.substring(user_pk.length - 4);
                for(let i=0; i<cards.length; i++){
                    cards[i].img_path = 'http://localhost:3000/card/' + cards[i].id + '/image';
                }
                for(let i=0; i<packs.length; i++){
                    packs[i].img_path = Packet;
                }
                let prompts = data.prompts.filter(prompt => prompt.isFreezed == false);
                items = data.packets.concat(cards)//.concat(data.packets);
            } catch (err) {
                console.error(err);
            }
        }
    }



    onMount(async () => {
        await init();
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

{#if user.username != ''}
<div class="flex w-full flex-col items-start " id="main">
    <!-- COVER -->
    <div class="relative w-full " id="main">
        <Cover />
    </div>

    <!-- CONTENT -->
    <div class="absolute top-[29%] w-full px-10 gap-20">
        <!-- PROFILE INFO -->
        <Profile userId={user_pk} username={user.username} avatar={user.avatar} address={user.address} />

        <div class="flex flex-col  w-full items-center -my-10">

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