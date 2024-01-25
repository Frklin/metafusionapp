<script lang='ts'>
    //@ts-nocheck
    import CategorySelector from "./filterTabComponents/CategorySelector.svelte";
    import PriceSelector from "./filterTabComponents/PriceSelector.svelte";
	import PromptSelector from "./filterTabComponents/PromptSelector.svelte";
	import RaritySelector from "./filterTabComponents/RaritySelector.svelte";
	import EditionSelector from "./filterTabComponents/EditionSelector.svelte";
    import ListedSelector from "./filterTabComponents/ListedSelector.svelte";


    export let items: any;
    export let filteredItems: any;
    export let fromWhere: string;
    export let itemsType: string;

    export let minPrice: number = 0;
    export let maxPrice: number = 1000000;
    export let selectedCategories: any = new Set()
    let selectedPromptCounts: any = new Set()
    export let selectedRarities: any = new Set()


    function filterPrice() {
        return filteredItems.filter((item:any) => {
            return item.price >= minPrice && item.price <= maxPrice;
        });
    }

    function filterPromptNumber() {
        if (selectedPromptCounts.size == 0) return filteredItems;
        return filteredItems.filter((item:any) => {
            if (filteredItems[0].nft_type==2) {
                return selectedPromptCounts.has(item.prompts.length);
            }
        });
    }


    

</script>


{#if items.length > 0}
<div class="flex sticky top-[112px] flex-col w-[340px] h-dvh transition divide-y-2 divide-white/20 px-4 overflow-auto scrollbar">

    {#if fromWhere!=='marketplace'}
    <ListedSelector items={items} bind:filteredItems />
    {/if}

    {#if fromWhere==='marketplace'}
    <PriceSelector bind:minPrice={minPrice} bind:maxPrice={maxPrice} />
    {/if}

    {#if (itemsType != "Packs")}
    <CategorySelector items={items} bind:filteredItems bind:selectedCategories={selectedCategories} />
    {/if}

    {#if (fromWhere==='marketplace' && itemsType == "Cards")}
    <PromptSelector bind:selectedPromptCounts={selectedPromptCounts} />
    {/if}

    {#if (itemsType == "Prompts")}
    <RaritySelector items={items} bind:filteredItems bind:selectedRarities={selectedRarities} />
    {/if}

    <EditionSelector />

</div>
{/if}