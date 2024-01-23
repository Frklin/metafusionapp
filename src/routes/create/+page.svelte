<script lang='ts'>

    import Cover from '$lib/components/Cover.svelte';
	import PromptCreate from '$lib/components/create/PromptCreate.svelte';
	import UtilityBar from '$lib/components/filters/UtilityBar.svelte';
    import { sortOptions } from '$lib/constants.js';
    import FilterTab from '$lib/components/filters/FilterTab.svelte';
    import PromptGridCreate from '$lib/components/create/PromptGridCreate.svelte';
    import { categoryConverter, user_pk } from '$lib';
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
	import ForgeButton from '$lib/components/create/ForgeButton.svelte';
	import StickyPromptCreate from '$lib/components/create/StickyPromptCreate.svelte';

    let mainRef: HTMLDivElement;
    let promptsRef: HTMLDivElement;
    let scrollTarget: HTMLDivElement;
    let prompts = {};
    let filteredPrompts = {};

    let searchQuery = '';
    let selectedSort = sortOptions[2];
    let selectedCategories = new Set()
    let selectedPrompts = writable({
        character: null,
        colors: null,
        glasses: null,
        hats: null,
        style: null,
        handoff: null,
    });
    let selectedRarities = new Set()
    let selectedPromptCounts = new Set()
    let filterTabOpen = false;
    let categoryFocused = writable(false);
    let isSticky = writable(false);

    async function fetchPrompts() {
        if (user_pk){
            try {
                const res = await fetch('http://localhost:3000/user/'+user_pk);
                const data = await res.json();
                prompts = data.prompts;
            } catch (err) {
                console.error(err);
            }
        } else {
            console.log("no user_pk")
        }
    }

    function handleScroll() {
        const rect = promptsRef.getBoundingClientRect();
        isSticky.set(rect.bottom <= 0); 
    }

    onMount(async () => {
        await fetchPrompts();
        filteredPrompts = prompts;
    });

    // onMount(() => {
    //     window.addEventListener('scroll', handleScroll);

    //     return () => {
    //     window.removeEventListener('scroll', handleScroll);
    //     };
    // });

    $: isForgable = Object.values($selectedPrompts).some(prompt => prompt != null && categoryConverter(prompt.category) === 'character');

</script>


{#if prompts.length > 0}
<div bind:this={mainRef} class="flex w-full flex-col items-start" id="main">
    <div class="relative w-full" id="main">
        <Cover  />

        <!-- BOTTOM PART -->
        <div class="absolute top-1/2 w-full px-10">
            <PromptCreate bind:selectedPrompts bind:selectedCategories bind:categoryFocused bind:filterTabOpen={filterTabOpen} scrollTarget={scrollTarget} promptsRef={promptsRef}/>
            <!-- STICKY PROMPT -->
            <StickyPromptCreate bind:selectedPrompts bind:isSticky={isSticky} bind:mainRef={mainRef} bind:isForgable />

            <!-- FORGE BUTTON -->
            <ForgeButton bind:isForgable={isForgable} selectedPrompts={selectedPrompts}/>

            <div bind:this={scrollTarget} class="flex flex-col h-full w-full divide-y divide-white/20">

                <UtilityBar items={prompts} bind:filteredItems={filteredPrompts} bind:filterTabOpen bind:searchQuery bind:selectedSort fromWhere={"collection"}/>

                <div class="flex w-full scrollbar">
                    {#if filterTabOpen}
                        <FilterTab bind:filteredItems={filteredPrompts} fromWhere={"collection"} bind:selectedCategories bind:selectedPromptCounts bind:selectedRarities/>
                    {/if}
                    <div class="w-full pt-4 overflow-auto scrollbar min-h-dvh">
                        <PromptGridCreate items={prompts} bind:selectedPrompts bind:selectedCategories bind:categoryFocused bind:filterTabOpen mainRef={mainRef}/>
                    </div>
                </div>

            </div>

        </div>
    </div>
</div>
{/if}