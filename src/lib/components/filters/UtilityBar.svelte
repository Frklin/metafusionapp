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

    function toggleFilterTab() {
        filterTabOpen = !filterTabOpen;
    }

            
    function filterItems(query:string) {
        if (!query) return items;

        if (fromWhere === 'collection') {
            let filtered = [];
            for(let i=0; i<items.length; i++) {
                if (items[i].NFTtype==0) {
                    if ("Packets".toLowerCase().includes(query.toLowerCase()) || 
                    "Packs".toLowerCase().includes(query.toLowerCase())) {
                        filtered.push(items[i]);
                    }
                }
                else if (items[i].NFTtype==1) {
                    if (items[i].name.toLowerCase().includes(query.toLowerCase()) || 
                    items[i].category.toLowerCase().includes(query.toLowerCase())) {
                        filtered.push(items[i]);
                    }
                }
                else if (items[i].NFTtype==2) {
                    if (items[i].prompts.some(prompt => 
                    prompt.name.toLowerCase().includes(query.toLowerCase()) || 
                    prompt.category.toLowerCase().includes(query.toLowerCase())
                    )) {
                        filtered.push(items[i]);
                    }
                }
            }
            return filtered;
        }
        if (items[0].NFTtype==0) return items;
        else if (items[0].NFTtype==1) {
            return filteredItems.filter((prompt) => {
                return prompt.name.toLowerCase().includes(query.toLowerCase()) || 
                prompt.category.toLowerCase().includes(query.toLowerCase());
            });
        }
        else if (items[0].NFTtype==2) {
            return filteredItems.filter((card) => {
                return card.prompts.some(prompt => 
                prompt.name.toLowerCase().includes(query.toLowerCase()) || 
                prompt.category.toLowerCase().includes(query.toLowerCase())
                );
            });
        }
    }


    $: filteredItems = filterItems(searchQuery);
</script>



<div class="flex w-full h-20 px-2 items-center bg-background gap-x-3 sticky top-[64px] " style="z-index: 1000;">

    <!-- FILTER BUTTON -->
    <div class="flex justify-center items-center w-12 h-12 rounded-xl bg-card_background p-3 cursor-pointer hover:bg-white/20 duration-200" on:click={toggleFilterTab}>
        <img src={FilterButton} class:opacity-100={filterTabOpen}  class:opacity-50={!filterTabOpen}  class="w-5 h-5" alt="filter" />
    </div>

    <!-- RESULTS NUMBER -->
    <div class="inline-flex items-center h-7 pr-3 pl-4 ">
        <span class="text-secondary text-base font-normal leading-6">{filteredItems.length} results</span>
    </div>
        
    <!-- SEARCH BAR -->
    <SearchBar bind:searchQuery />

    <!-- SORT BUTTON -->
    <div class="relative">
        <SortTab bind:filteredItems={filteredItems} bind:selectedSort />
    </div>

    {#if (fromWhere !== 'collection')}
        <!-- VIEWS -->
        <ViewType bind:selectedView={viewtype} />
    {/if}

</div>
