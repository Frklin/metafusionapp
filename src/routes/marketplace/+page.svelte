<script>
// @ts-nocheck


    import { NFTTypes, sortOptions } from '$lib/constants';
    import { onMount } from 'svelte';
    import { categoryConverter, rarityConverter } from '$lib';


    import Packet from '$lib/assets/Packs/packet.jpg'
	import Cover from '$lib/components/Cover.svelte';
	import TypeSelector from '$lib/components/marketplace/TypeSelector.svelte';
    import ListView from '$lib/components/marketplace/ListView.svelte';
    import GridView from '$lib/components/marketplace/GridView.svelte';
    import TableView from '$lib/components/marketplace/TableView.svelte';
	import UtilityBar from '$lib/components/filters/UtilityBar.svelte';
    import FilterTab from '$lib/components/filters/FilterTab.svelte';

    let selectedNFTType = 'Cards';

    let filterTabOpen = false;
    let searchQuery = '';
    let selectedSort = sortOptions[2];
    let selectedView = 'table';
    let minPrice = 0;
    let maxPrice = 1000000;
    let selectedCategories = new Set()
    let selectedPromptCounts = new Set()
    let selectedRarities = new Set()


    let cards = [];
    let prompts = [];
    let packs = [];
    let filteredItems = [];

    async function fetchCards() {
        try {
            const cardResponse = await fetch('http://localhost:3000/cards');
            if (!cardResponse.ok) {
                throw new Error('Network response was not ok');
            }
            cards = await cardResponse.json();
            for (let i = 0; i < cards.length; i++) {
                cards[i].img_path = 'http://localhost:3000/card/' + cards[i].id + '/image';
                cards[i].n =  cards[i].id.slice(-4);
            }
            filteredItems = cards;
        } catch (err) {
            error = err;
        }
    }

    async function fetchPrompts() {
        try {
            const promptResponse = await fetch('http://localhost:3000/prompts');
            if (!promptResponse.ok) {
                throw new Error('Network response was not ok');
            }
            prompts = await promptResponse.json();

            for (let i = 0; i < prompts.length; i++) {
                prompts[i].n = prompts[i].id.slice(-4);
            }
            filteredItems = prompts;
        } catch (err) {
            error = err;
        }
    }

    async function fetchPacks() {
        try {
            const packResponse = await fetch('http://localhost:3000/packets');
            if (!packResponse.ok) {
                throw new Error('Network response was not ok');
            }
            packs = await packResponse.json();
            for (let i = 0; i < packs.length; i++) {
                packs[i].img_path = Packet;
                packs[i].n = packs[i].id.slice(-4);
            }
            filteredItems = packs;
        } catch (err) {
            error = err;
        }
    }
    onMount(async () => {
        await fetchCards();
        filteredItems = cards;
    });

    $: {
    if (selectedNFTType === 'Cards') {
        fetchCards();
    } else if (selectedNFTType === 'Prompts') {
        fetchPrompts();
    } else if (selectedNFTType === 'Packs') {
        fetchPacks();
    }
}
    // $: filteredItems = items//selectedNFTType === 'Cards' ? cards : selectedNFTType === 'Prompts' ? prompts : packs;
    $: items = selectedNFTType === 'Cards' ? cards : selectedNFTType === 'Prompts' ? prompts : packs;
    $: filteredItems = (items.length > 0 && selectedNFTType === 'Prompts') ?  items.filter(prompt => {
                if (selectedCategories.size === 0) return true; 
                return selectedCategories.has(categoryConverter(prompt.category))
    }).filter(prompt => {
        if (selectedRarities.size === 0) return true; 
        return selectedRarities.has(rarityConverter(prompt.rarity))
    }).filter((prompt) => {
                return prompt.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                categoryConverter(prompt.category).toLowerCase().includes(searchQuery.toLowerCase());
            }) : items;

</script>



<div class="flex w-full flex-col items-start" id="main">
    <Cover />

    <!-- BOTTOM PART -->
    <div class="flex w-full px-10 flex-col items-start self-stretch bg-background">
        <TypeSelector bind:selectedNFTType/>

        <!-- INFOS -->
        <UtilityBar items={items} bind:filteredItems={filteredItems} bind:filterTabOpen bind:searchQuery bind:selectedSort bind:viewtype={selectedView} fromWhere={"marketplace"}/>
        <!-- MAIN -->
        <div class="flex w-full scrollbar">
            {#if filterTabOpen}
                <FilterTab items={items} bind:filteredItems={filteredItems} itemsType={selectedNFTType} fromWhere={"marketplace"} bind:minPrice bind:maxPrice bind:selectedCategories bind:selectedRarities/>
            {/if}

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
