<script>
    // @ts-nocheck

	import Cover from '$lib/components/Cover.svelte';
    import Profile from '$lib/components/Profile.svelte';
    import GridView from '$lib/components/marketplace/GridView.svelte';
    import UtilityBar from '$lib/components/filters/UtilityBar.svelte';
    import FilterTab from '$lib/components/filters/FilterTab.svelte';
    import Packet from '$lib/assets/Packs/packet.jpg'
    import MintButton from '$lib/components/MintButton.svelte';    
    import { sortOptions } from '$lib/constants.js';
    import { user_pk } from '$lib';
    import { onMount } from 'svelte';
    import { MetaMaskStore } from '$lib';

    const { walletState, isMetaMaskPresent, connect, loaded, balance, init } = MetaMaskStore();
    let filterTabOpen = false;
    let searchQuery = '';
    let selectedSort = sortOptions[2];
    let selectedCategories = new Set()
    let selectedPromptCounts = new Set()
    let selectedRarities = new Set()
    let user = {
            username: '',
            avatar: 'https://avatars.githubusercontent.com/u/59870781?v=4',
            address: '0x123456...7890',
        }

    

    let items = [];
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

    let filteredItems = items;

    onMount(async () => {
        await init();
        await getUserData();
    });

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

        <div class="flex flex-col  w-full items-center pt-10">
            <!-- <div class="w-full flex -mt-[60px] justify-end"><MintButton /></div> -->

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