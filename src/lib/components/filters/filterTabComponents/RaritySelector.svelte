<script lang="ts">
   //@ts-nocheck
    export let items: any;
    export let filteredItems: any;
    export let selectedRarities: Set<String> = new Set()

    import SortButton from '$lib/assets/icons/sort.png';
    import { RARITIES } from "$lib/constants";
    import { rarityConverter } from "$lib";

    let showRarityFilter: boolean = false;

    function toggleRarityFilter() {
        showRarityFilter = !showRarityFilter;
    }

    function updateSelectedCategories(category: string, checked: boolean) {
        if (checked) {
            selectedRarities.add(category);
        } else {
            selectedRarities.delete(category);
        }
        filteredItems = filterRarities();
    }


    function filterRarities() {
        if (selectedRarities.size == 0) return items;

        return filteredItems.filter((item:any) => {
                return selectedRarities.has(rarityConverter(item.rarity));
        });
    }

</script>





<div class="flex flex-col w-full">
    <div class="flex items-center justify-start py-3 pr-2 pl-4 w-full rounded-lg  cursor-pointer duration-200  hover:bg-white/10" on:click|stopPropagation={toggleRarityFilter}>
        <span class="text-primary text-base font-semibold leading-6 text-left flex-grow">Rarity</span>
        <img src={SortButton} class:rotate-180={showRarityFilter} class="w-5 h-5 transition-transform duration-300" alt="sort" />
    </div>

    {#if showRarityFilter}
    <div class="flex flex-col gap-4 mt-4 w-full px-4 pb-4">
        {#each RARITIES as rarity}
        <div class="flex flex-row w-full items-center justify-center self-stretch ">
            <label for="{rarity}" class="text-secondary text-sm font-semibold leading-6 text-left flex-grow hover:text-white/80 cursor-pointer">{rarity.charAt(0).toUpperCase()+rarity.slice(1)}</label>
            <input type="checkbox" 
                    name="{rarity}" 
                    id="{rarity}"
                    on:change="{e => updateSelectedCategories(rarity, e.target.checked)}" 
                    class="w-4 h-4  text-button bg-card_background border-white/20 rounded dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
        </div>
        {/each}
    </div>
    {/if}
</div>