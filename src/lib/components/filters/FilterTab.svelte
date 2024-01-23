<script lang='ts'>
    //@ts-nocheck
    import CategorySelector from "./filterTabComponents/CategorySelector.svelte";
    import PriceSelector from "./filterTabComponents/PriceSelector.svelte";
	import PromptSelector from "./filterTabComponents/PromptSelector.svelte";
	import RaritySelector from "./filterTabComponents/RaritySelector.svelte";
    import { rarityConverter } from "$lib";


    export let filteredItems: any;
    export let fromWhere: string;

    export let minPrice: number = 0;
    export let maxPrice: number = 1000000;
    export let selectedCategories: any = new Set()
    export let selectedPromptCounts: any = new Set()
    export let selectedRarities: any = new Set()


    function filterPrice() {
        return filteredItems.filter((item:any) => {
            return item.price >= minPrice && item.price <= maxPrice;
        });
    }

    function filterCategories() {
        if (selectedCategories.size == 0) return filteredItems;
        if (fromWhere === 'collection') {
            let filtered = []
            for(let i=0; i<filteredItems.length; i++) {
                if (filteredItems[i].NFTtype==1) {
                    if (selectedCategories.has(filteredItems[i].category)) {
                        filtered.push(filteredItems[i]);
                    }
                }
                else if (filteredItems[i].NFTtype==2) {
                    if (filteredItems[i].prompts.some(prompt => selectedCategories.has(prompt.category))) {
                        filtered.push(filteredItems[i]);
                    }
                }
            }
            return filtered;
        }
        return filteredItems.filter((item:any) => {
            if (filteredItems[0].NFTtype==1) {
                return selectedCategories.has(item.category);
            }
            else if (filteredItems[0].NFTtype==2) {
                return item.prompts.some((prompt: { category: String; }) => selectedCategories.has(prompt.category));
            }
        });
    }

    function filterPromptNumber() {
        if (selectedPromptCounts.size == 0) return filteredItems;
        return filteredItems.filter((item:any) => {
            if (filteredItems[0].NFTtype==2) {
                return selectedPromptCounts.has(item.prompts.length);
            }
        });
    }

    function filterRarities() {
        if (selectedRarities.size == 0) return filteredItems;
        if (fromWhere === 'collection') {
            let filtered = []
            for(let i=0; i<filteredItems.length; i++) {
                if (filteredItems[i].NFTtype==2) {
                    if (filteredItems[i].prompts.some(prompt => selectedRarities.has(rarityConverter(prompt.rarity)))) {
                        filtered.push(filteredItems[i]);
                    }
                } 
                else if (filteredItems[i].NFTtype==1) {
                    if (selectedRarities.has(rarityConverter(filteredItems[i].rarity))) {
                        filtered.push(filteredItems[i]);
                    }
                }
            }
            return filtered;
        }
        return filteredItems.filter((item:any) => {
            if (filteredItems[0].NFTtype==2) {
                return item.prompts.some((prompt: { rarity: number; }) => selectedRarities.has(rarityConverter(prompt.rarity)));
            } 
            else if (filteredItems[0].NFTtype==1) {
                return selectedRarities.has(rarityConverter(item.rarity));
            }
        });
    }

    $: filteredItems = filterCategories()
</script>



<div class="flex sticky top-[112px] flex-col w-[340px] h-dvh transition divide-y-2 divide-white/20 px-4 overflow-auto scrollbar">

    {#if fromWhere==='marketplace'}
    <PriceSelector bind:minPrice={minPrice} bind:maxPrice={maxPrice} />
    {/if}

    {#if (fromWhere==='marketplace' && filteredItems[0].NFTtype != 0) || (fromWhere==='collection')}
    <CategorySelector bind:selectedCategories={selectedCategories} />
    {/if}

    {#if (fromWhere==='marketplace' && filteredItems[0].NFTtype == 2) || (fromWhere==='collection')}
    <PromptSelector bind:selectedPromptCounts={selectedPromptCounts} />
    {/if}

    {#if (fromWhere==='marketplace' && filteredItems[0].NFTtype != 0) || (fromWhere==='collection')}
    <RaritySelector bind:selectedRarities={selectedRarities} />
    {/if}

</div>
