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
    import { sortOptions } from '$lib/constants.js';
    import { user_pk } from '$lib';
    import { onMount } from 'svelte';
    
    let filterTabOpen = false;
    let searchQuery = '';
    let selectedSort = sortOptions[2];
    let selectedCategories = new Set()
    let selectedPromptCounts = new Set()
    let selectedRarities = new Set()
    let user = {
            username: 'Francesco',
            avatar: 'https://avatars.githubusercontent.com/u/59870781?v=4',
            address: '0x123456...7890',
        }

    
    // let items = [
    //     { id: 30, n: 1032, NFTtype:2, isListed:false, price: 2.109, collection: 1, img_path: image5324, prompts:
    //     [
    //         {promptid: 3241, category: 'character', name: 'Human', collection: 1, img_path: image2154},
    //         {promptid: 5123, category: 'colors', name: 'Red', collection: 1, img_path: image2154},
    //     ]
    //     },
    //     { id: 13, n: 2154, NFTtype:2, isListed:true, price: 1.452, collection: 1, img_path: image2154, prompts:
    //     [
    //         {promptid: 3241, category: 'character', name: 'Human', collection: 1, img_path: image2154},
    //         {promptid: 5123, category: 'colors', name: 'Red', collection: 1, img_path: image2154},
    //     ]},
    //     { id: 12, n: 5324, NFTtype:2, isListed:false, price: 1.913, collection: 1, img_path: image1032, prompts:
    //     [
    //         {promptid: 3241, category: 'character', name: 'Human', collection: 1, img_path: image1032},
    //         {promptid: 5123, category: 'colors', name: 'Red', collection: 1, img_path: image1032},
    //         {promptid: 5234, category: 'glasses', name: 'Glasses', collection: 1, img_path: image1032}
    //     ]},
    //     { id: 11, n: 5214, isListed: false, NFTtype:1, name: 'baseball', category: 'hat', price: 1.003, img_path: image5214, collection: 1},
    //     { id: 10, n: 4153, isListed: false, NFTtype:1, name: 'mecha', category: 'character', price: 1.535, img_path: image4153, collection: 1},
    //     { id: 17, n: 4153, isListed: false, NFTtype:0, price: 1.535, img_path: image4153, collection: 1},
    //     { id: 18, n: 4153, isListed: false, NFTtype:0, price: 1.535, img_path: image4153, collection: 1},
    //     { id: 19, n: 4153, isListed: false, NFTtype:1, name: 'gold spikes', category: 'glasses', price: 1.535, img_path: image4153, collection: 1},
    // ]

    let items = [];
    async function getUserData() {
        if (user_pk){
            try {
                const res = await fetch('http://localhost:3000/user/'+user_pk);
                const data = await res.json();
                console.log(data);
                let cards = data.cards;
                for(let i=0; i<cards.length; i++){
                    cards[i].img_path = 'http://localhost:3000/card/' + cards[i].id + '/image';
                }
                items = data.prompts.concat(cards);//.concat(data.packets);
            } catch (err) {
                console.error(err);
            }
        }
    }

    let filteredItems = items;

    onMount(async () => {
        await getUserData();
    });

</script>


<div class="flex w-full flex-col items-start " id="main">
    <!-- COVER -->
    <div class="relative w-full " id="main">
        <Cover />
    </div>

    <!-- CONTENT -->
    <div class="absolute top-[29%] w-full px-10 gap-20">
        <!-- PROFILE INFO -->
        <Profile username={user.username} avatar={user.avatar} address={user.address} />

        <div class="flex flex-col w-full items-center pt-10">

            <!-- INFOS -->
            <UtilityBar items={items} bind:filteredItems={filteredItems} bind:filterTabOpen bind:searchQuery bind:selectedSort fromWhere={"collection"}/>
        
            <div class="flex w-full scrollbar">
                {#if filterTabOpen}
                    <FilterTab bind:filteredItems={filteredItems} fromWhere={"collection"} bind:selectedCategories bind:selectedPromptCounts bind:selectedRarities/>
                {/if}
                <div class="w-full pt-4 overflow-auto scrollbar min-h-dvh">
                    <GridView items={items} bind:filterTabOpen isMine={true} fromWhere={"collection"}/>
                </div>
            </div>
        </div>
    
    </div>


</div>
