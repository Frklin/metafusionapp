<script lang="ts">

    export let selectedPrompts: any;
    export let selectedCategories: any;
    export let filterTabOpen: boolean;
    export let promptsRef: HTMLDivElement;
    export let scrollTarget: HTMLDivElement;
    export let categoryFocused: any;

    import { CATEGORIES } from "$lib/constants";
    import { writable } from "svelte/store";
    import CardTheme from "$lib/assets/cardbg.png";
	import PromptCardFull from "../PromptCardFull.svelte";


    let category_colors: any = {
        character: '#4CAF50',
        colors: '#FFC107',
        glasses: '#2196F3',
        hats: '#9C27B0',
        style: '#FF5722',
        handoff: '#E91E63',
    }

    function selectCategory(category:string, scroll=true) {
        if ($selectedPrompts[category] != null) {
            $selectedPrompts[category] = null;
            selectedCategories.delete(category);
            selectedCategories = new Set(selectedCategories);
            categoryFocused.set(true);
        } else {
        filterTabOpen = true;
        selectedCategories.clear();
        selectedCategories.add(category);
        selectedCategories = new Set(selectedCategories);
        if (scroll) {
            scrollTo(scrollTarget);
        }
        }
    }

    function scrollTo(target: HTMLDivElement) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start'});
    }


</script>


<div bind:this={promptsRef} class="w-full px-28 -mt-28">
    <div class="flex flex-col w-full ">
        <div class="flex flex-col h-full items-start  pt-2 gap-2 rounded-xl">

            <div class="flex flex-row justify-between w-full h-full l px-2 pt-2  rounded-b-xl">
                <div class="grid grid-cols-6 w-full gap-3">
                    {#each CATEGORIES as category}
                        <div class="gap-2 flex flex-col items-center border-white/20 h-full p-6">
                            <span class="text-xs {$selectedPrompts[category] ? 'text-primary font-bold' : 'text-secondary font-semibold'}">{category.toUpperCase()}</span>
                            <button on:click={() => selectCategory(category)} class="w-full h-[280px] rounded-xl bg-card_background hover:scale-[103%] duration-200 shadow-md">
                                {#if $selectedPrompts[category]}
                                <PromptCardFull item={$selectedPrompts[category]} />
                                {:else}
                                <img src={CardTheme} class="w-full h-full object-cover rounded-xl border-4 " alt="{category} card"  style="border-color: {category_colors[category]}; opacity: 0.5;" />
                                {/if}
                            </button>
                            <div class="flex flex-col gap-1 w-full items-center rounded-xl p-2">
                                <span class="text-sm font-normal text-secondary">Rarity</span>
                                <span class="text-sm font-bold text-primary">{$selectedPrompts[category]?.rarity ?? 0}%</span>
                            </div>
                        </div>
                    {/each}

                </div>
            </div>
        </div>
    </div>
</div>