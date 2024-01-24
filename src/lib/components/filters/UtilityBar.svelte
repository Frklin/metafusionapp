<script lang="ts">
    // @ts-nocheck
    export let items: any;
    export let filteredItems: any;

    export let filterTabOpen: boolean;
    export let searchQuery: string;
    export let selectedSort: any;
    export let viewtype: string = 'grid';
    export let fromWhere: string;

    import FilterButton from '$lib/assets/icons/filter.svg';
	import SearchBar from './SearchBar.svelte';
	import ViewType from './ViewType.svelte';
    import SortTab from './SortTab.svelte';
	import { categoryConverter, convertIdtoHexCode } from '$lib';

    function toggleFilterTab() {
        filterTabOpen = !filterTabOpen;
    }

    
    function filterItems(query:string) {
        if (!query) return items;

        if (items[0].nft_type==0) return items;
        else if (items[0].nft_type==1) {
            return filteredItems.filter((prompt) => {
                return prompt.name.toLowerCase().includes(query.toLowerCase()) || 
                categoryConverter(prompt.category).toLowerCase().includes(query.toLowerCase());
            });
        }
        else if (items[0].nft_type==2) {
            return filteredItems.filter((card) => {
                return card.id.toLowerCase().includes(convertIdtoHexCode(query.toLowerCase()))
            });
        }
    }

    $: filteredItems = filterItems(searchQuery);
</script>


<!-- {#if items.length > 0} -->
<div class="flex w-full h-20 px-2 items-center bg-background gap-x-3 sticky {fromWhere === 'create' ? 'top-[calc(64px+96px)]' : 'top-[64px]'} " style="z-index: 1000;">

    <!-- FILTER BUTTON -->
    <div class="flex justify-center items-center w-12 h-12 rounded-xl bg-card_background p-3 cursor-pointer hover:bg-white/20 duration-200" on:click={toggleFilterTab}>
        <img src={FilterButton} class:opacity-100={filterTabOpen}  class:opacity-50={!filterTabOpen}  class="w-5 h-5" alt="filter" />
    </div>

    <div class="inline-flex items-center h-7 pr-3 pl-4 ">
        <span class="text-secondary text-base font-normal leading-6">{filteredItems.length} results</span>
    </div>
        
    <SearchBar bind:searchQuery />

    <div class="relative">
        <SortTab bind:filteredItems={filteredItems} bind:selectedSort />
    </div>

    {#if (fromWhere !== 'collection')}
        <ViewType bind:selectedView={viewtype} />
    {/if}

</div>
<!-- {/if} -->