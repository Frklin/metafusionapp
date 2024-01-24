<script lang='ts'>
    //@ts-nocheck
    import Cover from '$lib/components/Cover.svelte';
	import PromptCreate from '$lib/components/create/PromptCreate.svelte';
	import UtilityBar from '$lib/components/filters/UtilityBar.svelte';
    import { sortOptions } from '$lib/constants.js';
    import FilterTab from '$lib/components/filters/FilterTab.svelte';
    import PromptGridCreate from '$lib/components/create/PromptGridCreate.svelte';
    import { categoryConverter, user_pk, rarityConverter } from '$lib';
    import { MetaMaskStore } from '$lib';
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
	import ForgeButton from '$lib/components/create/ForgeButton.svelte';
	import StickyPromptCreate from '$lib/components/create/StickyPromptCreate.svelte';

    const { walletState, isMetaMaskPresent, connect, loaded, balance, init } = MetaMaskStore();
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
        hats: null,
        handoff: null,
        colors: null,
        glasses: null,
        style: null,
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
                filteredPrompts = prompts;
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
        await init();
        await fetchPrompts();
    });

    onMount(() => {
        const handleScroll = () => {
        const rect = promptsRef.getBoundingClientRect();
        const offset = window.pageYOffset || document.documentElement.scrollTop;
        isSticky.set(rect.bottom <= 0)
        // isSticky.set(offset > 0); // Set to true as soon as we scroll down 
        };
        

        window.addEventListener('scroll', handleScroll);

        return () => {
        window.removeEventListener('scroll', handleScroll);
        };
    });

    $: isForgable = Object.values($selectedPrompts).some(prompt => prompt != null && categoryConverter(prompt.category) === 'character');
    $: filteredPrompts = (prompts.length > 0) ?  prompts.filter(prompt => {
                if (selectedCategories.size === 0) return true; 
                return selectedCategories.has(categoryConverter(prompt.category))
    }).filter(prompt => {
        if (selectedRarities.size === 0) return true; 
        return selectedRarities.has(rarityConverter(prompt.rarity))
    }).filter((prompt) => {
                return prompt.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                categoryConverter(prompt.category).toLowerCase().includes(searchQuery.toLowerCase());
            }) : prompts;

</script>


{#if prompts.length > 0}
<div bind:this={mainRef} class="flex w-full flex-col items-start" id="main">
    <div class="relative w-full" id="main">
        <Cover  fromWhere='create'/>
    </div>

        <!-- BOTTOM PART -->
        <div class="absolute top-1/3 w-full px-10">
            <div bind:this={promptsRef} class="w-full px-28 -mt-28">
            <PromptCreate  bind:selectedPrompts bind:selectedCategories bind:categoryFocused bind:filterTabOpen={filterTabOpen} scrollTarget={scrollTarget} promptsRef={promptsRef}/>
            </div>
            <!-- STICKY PROMPT -->
            <StickyPromptCreate bind:selectedPrompts bind:isSticky={isSticky} bind:mainRef={mainRef} bind:isForgable />

            <!-- FORGE BUTTON -->
            <ForgeButton bind:isForgable={isForgable} selectedPrompts={selectedPrompts}/>

            <div bind:this={scrollTarget} class="flex flex-col h-full w-full divide-y divide-white/20">

                <UtilityBar items={prompts} bind:filteredItems={filteredPrompts} bind:filterTabOpen bind:searchQuery bind:selectedSort fromWhere={"create"}/>

                <div class="flex w-full scrollbar">
                    {#if filterTabOpen}
                        <FilterTab items={prompts} bind:filteredItems={filteredPrompts} itemsType={"Prompts"} fromWhere={"collection"} bind:selectedCategories bind:selectedPromptCounts bind:selectedRarities/>
                    {/if}
                    <div class="w-full pt-4 overflow-auto scrollbar min-h-dvh">
                        {#if filteredPrompts.length === 0}
                            <div class="flex flex-col items-center justify-center w-full h-full">
                                <span class="text-2xl font-bold text-primary">No Prompts Found</span>
                            </div>
                        {/if}
                        <PromptGridCreate bind:items={filteredPrompts} bind:selectedPrompts bind:selectedCategories bind:categoryFocused bind:filterTabOpen mainRef={mainRef}/>
                    </div>
                </div>

            </div>

        </div>

</div>
{/if}