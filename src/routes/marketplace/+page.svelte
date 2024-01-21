<script>
// @ts-nocheck


    import { NFTTypes, sortOptions } from '$lib/constants';
    import { onMount } from 'svelte';
    import image1032 from '$lib/assets/NFTs/7843.jpg';

    import image1574 from '$lib/assets/NFTs/1574.jpg';
    import image2364 from '$lib/assets/NFTs/2364.jpg';
    import image4561 from '$lib/assets/NFTs/4561.jpg';
    import image4891 from '$lib/assets/NFTs/4891.jpg';
    import image7415 from '$lib/assets/NFTs/7415.jpg';
    import image9843 from '$lib/assets/Prompts/small/7942.png';
    import image9987 from '$lib/assets/NFTs/9987.jpg';
    import image9999 from '$lib/assets/NFTs/9999.jpg';
    import image7843 from '$lib/assets/Prompts/small/9715.png';

	import Cover from '$lib/components/Cover.svelte';
	import TypeSelector from '$lib/components/marketplace/TypeSelector.svelte';
    import ListView from '$lib/components/marketplace/ListView.svelte';
    import GridView from '$lib/components/marketplace/GridView.svelte';
    import TableView from '$lib/components/marketplace/TableView.svelte';
	import UtilityBar from '$lib/components/filters/UtilityBar.svelte';

    let selectedNFTType = 'Cards';

    let filterTabOpen = false;
    let searchQuery = '';
    let selectedSort = sortOptions[2];
    let selectedView = 'table';

    let packs = [
        {id: 0, n: 1032, NFTtype: 0, price: 0.1, img_path: image1032},
        {id: 1, n: 2154, NFTtype: 0, price: 0.2, img_path: image9999},
    ]
    let prompts = [
        {id: 0, n: 1032, NFTtype: 1, price: 0.1, name: 'mecha', category: 'character', img_path: image9843},
        {id: 1, n: 2154, NFTtype: 1, price: 0.2, name: 'gold spikes', category: 'glasses', img_path: image7843},
    ]
    let cards = [
        { id: 30, n: 1032, NFTtype:2, price: 2.109, img_path: image1574, prompts:
        [
            {promptid: 3241, category: 'character', name: 'Human', img_path: image1574},
            {promptid: 5123, category: 'colors', name: 'Red', img_path: image1574},
        ]
        },
        { id: 13, n: 2154, NFTtype:2, price: 1.452, img_path: image2364, prompts:
        [
            {promptid: 3241, category: 'character', name: 'Human', img_path: image2364},
            {promptid: 5123, category: 'colors', name: 'Red', img_path: image2364},
        ]},
        { id: 12, n: 5324, NFTtype:2, price: 1.913, img_path: image4561, prompts:
        [
            {promptid: 3241, category: 'character', name: 'Human', img_path: image2364},
            {promptid: 5123, category: 'colors', name: 'Red', img_path: image2364},
            {promptid: 5234, category: 'glasses', name: 'Glasses', img_path: image2364}
        ]},
        { id: 11, n: 5214, NFTtype:2, price: 1.003, img_path: image4891, prompts:
        [
            {promptid: 3241, category: 'character', name: 'Human', img_path: image2364},
            {promptid: 5123, category: 'colors', name: 'Red', img_path: image2364},
            {promptid: 3241, category: 'hats', name: 'hood', img_path: image2364},
        ]},
        { id: 10, n: 4153, NFTtype:2, price: 1.535, img_path: image7415, prompts:
        [
            {promptid: 3241, category: 'character', name: 'Human', img_path: image2364},
            {promptid: 5123, category: 'colors', name: 'Red', img_path: image2364},
            {promptid: 3241, category: 'hats', name: 'straw hat', img_path: image2364},
        ]},
        { id: 17, n: 4153, NFTtype:2, price: 1.535, img_path: image9999, prompts:
        [
            {promptid: 3241, category: 'character', name: 'Human', img_path: image2364},
            {promptid: 5123, category: 'colors', name: 'Red', img_path: image2364},
            {promptid: 3241, category: 'hats', name: 'straw hat', img_path: image2364},
        ]},
        { id: 18, n: 4153, NFTtype:2, price: 1.535, img_path: image9987, prompts:
        [
            {promptid: 3241, category: 'character', name: 'Human', img_path: image2364},
            {promptid: 5123, category: 'colors', name: 'Red', img_path: image2364},
            {promptid: 3241, category: 'hats', name: 'straw hat', img_path: image2364},
        ]},
       
        { id: 42, n: 5324, NFTtype:2, price: 1.913, img_path: image4561, prompts:
        [
            {promptid: 3241, category: 'character', name: 'Human', img_path: image2364},
            {promptid: 5123, category: 'colors', name: 'Red', img_path: image2364},
            {promptid: 5234, category: 'glasses', name: 'Glasses', img_path: image2364}
        ]},
        { id: 41, n: 5214, NFTtype:2, price: 1.003, img_path: image4891, prompts:
        [
            {promptid: 3241, category: 'character', name: 'Human', img_path: image2364},
            {promptid: 5123, category: 'colors', name: 'Red', img_path: image2364},
            {promptid: 3241, category: 'hats', name: 'hood', img_path: image2364},
        ]},
        { id: 40, n: 4153, NFTtype:2, price: 1.535, img_path: image7415, prompts:
        [
            {promptid: 3241, category: 'character', name: 'Human', img_path: image2364},
            {promptid: 5123, category: 'colors', name: 'Red', img_path: image2364},
            {promptid: 3241, category: 'hats', name: 'straw hat', img_path: image2364},
        ]},
        { id: 47, n: 4153, NFTtype:2, price: 1.535, img_path: image7415, prompts:
        [
            {promptid: 3241, category: 'character', name: 'Human', img_path: image2364},
            {promptid: 5123, category: 'colors', name: 'Red', img_path: image2364},
            {promptid: 3241, category: 'hats', name: 'straw hat', img_path: image2364},
        ]},
        { id: 48, n: 4153, NFTtype:2, price: 1.535, img_path: image7415, prompts:
        [
            {promptid: 3241, category: 'character', name: 'Human', img_path: image2364},
            {promptid: 5123, category: 'colors', name: 'Red', img_path: image2364},
            {promptid: 3241, category: 'hats', name: 'straw hat', img_path: image2364},
        ]},
        { id: 49, n: 4153, NFTtype:2, price: 1.535, img_path: image7415, prompts:
        [
            {promptid: 3241, category: 'character', name: 'Human', img_path: image2364},
            {promptid: 5123, category: 'colors', name: 'Red', img_path: image2364},
            {promptid: 3241, category: 'hats', name: 'straw hat', img_path: image2364},
        ]},
        { id: 6211, n: 4153, NFTtype:2, price: 1.535, img_path: image7415, prompts:
        [
            {promptid: 3241, category: 'character', name: 'Human', img_path: image2364},
            {promptid: 5123, category: 'colors', name: 'Red', img_path: image2364},
            {promptid: 3241, category: 'hats', name: 'straw hat', img_path: image2364},
        ]},
        { id: 6210, n: 4153, NFTtype:2, price: 1.535, img_path: image7415, prompts:
        [
            {promptid: 3241, category: 'character', name: 'Human', img_path: image2364},
            {promptid: 5123, category: 'colors', name: 'Red', img_path: image2364},
            {promptid: 3241, category: 'hats', name: 'straw hat', img_path: image2364},
        ]},
        { id: 628, n: 4153, NFTtype:2, price: 1.535, img_path: image7415, prompts:
        [
            {promptid: 3241, category: 'character', name: 'Human', img_path: image2364},
            {promptid: 5123, category: 'colors', name: 'Red', img_path: image2364},
            {promptid: 3241, category: 'hats', name: 'straw hat', img_path: image2364},
        ]},
        { id: 626, n: 4153, NFTtype:2, price: 1.535, img_path: image7415, prompts:
        [
            {promptid: 3241, category: 'character', name: 'Human', img_path: image2364},
            {promptid: 5123, category: 'colors', name: 'Red', img_path: image2364},
            {promptid: 3241, category: 'hats', name: 'straw hat', img_path: image2364},
        ]},
        { id: 625, n: 4153, NFTtype:2, price: 1.535, img_path: image7415, prompts:
        [
            {promptid: 3241, category: 'character', name: 'Human', img_path: image2364},
            {promptid: 5123, category: 'colors', name: 'Red', img_path: image2364},
            {promptid: 3241, category: 'hats', name: 'straw hat', img_path: image2364},
        ]},
        { id: 624, n: 4153, NFTtype:2, price: 1.535, img_path: image7415, prompts:
        [
            {promptid: 3241, category: 'character', name: 'Human', img_path: image2364},
            {promptid: 5123, category: 'colors', name: 'Red', img_path: image2364},
            {promptid: 3241, category: 'hats', name: 'straw hat', img_path: image2364},
        ]},

        { id: 621, n: 4153, NFTtype:2, price: 1.535, img_path: image7415, prompts:
        [
            {promptid: 3241, category: 'character', name: 'Human', img_path: image2364},
            {promptid: 5123, category: 'colors', name: 'Red', img_path: image2364},
            {promptid: 3241, category: 'hats', name: 'straw hat', img_path: image2364},
        ]}

    ]

    let error;
    let data;

    // onMount(async () => {
    //     try {
    //         const response = await fetch('https://api.example.com/data');
    //         if (!response.ok) {
    //         throw new Error('Network response was not ok');
    //         }
    //         data = await response.json();
    //     } catch (err) {
    //         error = err;
    //     }
    // });

    $: filteredItems = selectedNFTType === 'Cards' ? cards : selectedNFTType === 'Prompts' ? prompts : packs;
    $: items = selectedNFTType === 'Cards' ? cards : selectedNFTType === 'Prompts' ? prompts : packs;
</script>


<div class="flex w-full flex-col items-start" id="main">
    <Cover />

    <!-- BOTTOM PART -->
    <div class="flex w-full px-10 flex-col items-start self-stretch bg-background">
        <TypeSelector bind:selectedNFTType/>

        <!-- INFOS -->
        <UtilityBar items={items} bind:filteredItems={filteredItems} bind:filterTabOpen bind:searchQuery bind:selectedSort bind:viewtype={selectedView} originPage={"marketplace"}/>
        <!-- MAIN -->
        <div class="flex w-full scrollbar">
            <div class="w-full pt-4 overflow-auto scrollbar min-h-dvh">
                {#if selectedView === 'list'}
                    <ListView items={filteredItems} itemType={NFTTypes[selectedNFTType]} fromWhere={"marketplace"}/>
                {/if}
                {#if selectedView === 'grid'}
                    <GridView items={filteredItems} bind:filterTabOpen fromWhere={"marketplace"}/>
                {/if}
                {#if selectedView === 'table'}
                    <TableView items={filteredItems} itemType={NFTTypes[selectedNFTType]} bind:filterTabOpen fromWhere={"marketplace"}/>
                {/if}
            </div>
        </div>

    </div>
</div>
