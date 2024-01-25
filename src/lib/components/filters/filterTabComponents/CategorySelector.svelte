<script lang="ts">
   //@ts-nocheck
    export let items: any;
    export let filteredItems: any;
    export let selectedCategories: Set<String>;  
  

    import { CATEGORIES } from "$lib/constants";
    import SortButton from '$lib/assets/icons/sort.png';
	import { categoryConverter, categoryFromId } from "$lib";

    let showCategoryFilter: boolean = true;

    function toggleCategoryFilter() {
        showCategoryFilter = !showCategoryFilter;
    }

    function updateSelectedCategories(category:string, checked:boolean) {
        if (checked) {
            selectedCategories.add(category);
        } else {
            selectedCategories.delete(category);
        }
        selectedCategories = new Set(selectedCategories);
        filteredItems = filterCategories();
    }
        
    function filterCategories() {
        if (selectedCategories.size == 0) return items;
        return items.filter((item:any) => {
            if (filteredItems[0].nft_type==1) {
                return selectedCategories.has(categoryConverter(item.category));
            }
            if (filteredItems[0].nft_type==2) {
                return categoryFromId(item.id).filter((prompt) => selectedCategories.has(prompt)).length == selectedCategories.size;
                // return selectedCategories.intersection(categoryFromId(item.id));
            }
            // else if (filteredItems[0].nft_type==2) {
            //     return item.prompts.some((prompt: { category: String; }) => selectedCategories.has(prompt.category));
            // }
        });

    }
</script>





<div class="flex flex-col w-full ">
    <div class="flex items-center justify-start py-3 pr-2 pl-4 w-full rounded-lg cursor-pointer duration-200 hover:bg-white/10" on:click|stopPropagation={toggleCategoryFilter}>
        <span class="text-primary text-base font-semibold leading-6 text-left flex-grow ">Category</span>
        <img src={SortButton} class:rotate-180={showCategoryFilter} class="w-5 h-5 transition-transform duration-300" alt="sort" />
    </div>

    {#if showCategoryFilter}
    <div class="flex flex-col gap-4 mt-4 w-full px-4 pb-4">
        {#each CATEGORIES as category}
        <div class="flex flex-row w-full items-center justify-center self-stretch ">
            <label for="{category}" class="text-secondary text-sm font-semibold leading-6 text-left flex-grow hover:text-white/80 cursor-pointer">{category.toUpperCase()}</label>
            <input type="checkbox" 
                    checked={selectedCategories.has(category)}
                    name="{category}" 
                    id="{category}"
                    on:change="{e => updateSelectedCategories(category, e.target.checked)}" 
                    class="w-4 h-4  text-button bg-card_background border-white/20 rounded dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
        </div>
        {/each}
    </div>
    {/if}
</div>