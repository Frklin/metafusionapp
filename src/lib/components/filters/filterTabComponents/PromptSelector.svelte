<script lang="ts">
   //@ts-nocheck
    export let selectedPromptCounts: any;

    import SortButton from '$lib/assets/icons/sort.png';

    let showPromptsFilter = true;

    function togglePromptsFilter() {
        showPromptsFilter = !showPromptsFilter;
    }

    function updateSelectedNumberOfPrompts(number: number) {
        if (selectedPromptCounts.has(number)) {
            selectedPromptCounts.delete(number);
        } else {
            selectedPromptCounts.add(number);
        }
        selectedPromptCounts = new Set(selectedPromptCounts);
    }


</script>


<div class="flex flex-col w-full">
    <div class="flex items-centerjustify-start py-3 pr-2 pl-4 w-full rounded-lg  cursor-pointer duration-200  hover:bg-white/10" on:click|stopPropagation={togglePromptsFilter}>
        <span class="text-primary text-base font-semibold leading-6 text-left flex-grow">Prompts</span>
        <img src={SortButton} class:rotate-180={showPromptsFilter} class="w-5 h-5 transition-transform duration-300" alt="sort" />
    </div>

    {#if showPromptsFilter}
    <div class="grid grid-cols-3 gap-2 pb-4">
        {#each [1,2,3,4,5,6] as number}
            <button
                class:active="{selectedPromptCounts.has(number)}"
                on:click={() => updateSelectedNumberOfPrompts(number)}
                class="p-2 border border-white/20 text-secondary rounded transition-colors duration-300 cursor-pointer hover:bg-white/20 hover:text-white"
            >
                {number}
            </button>
        {/each}
    </div>                                               
    {/if}
</div>