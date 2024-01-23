<script lang="ts">
    //@ts-nocheck
    export let selectedPrompts: any;
    export let isForgable: boolean;
    export let isSticky: any;
    export let mainRef: HTMLDivElement;

    function scrollTo(target: HTMLDivElement) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start'});
    }

</script>




<!-- PROMPT STICKY -->
<div class="flex flex-col pt-2 w-full h-24 bg-background" class:sticky-view={$isSticky} class:hidden={!$isSticky}>
    <div class="w-full h-1 bg-white/20"></div>
    <div class="flex justify-end items-center w-full h-full px-4"> <!-- Align to the right -->
        
        <!-- Container for prompts -->
        <div class="flex flex-row gap-8 mr-32"> <!-- Your categories list -->
            {#each Object.entries($selectedPrompts) as [category, value]}
                <div class="text-center w-32"> <!-- Set fixed width for each category div -->
                    <h3 class="{value ? 'text-primary' : 'text-secondary/20'} font-semibold text-lg">{category.toUpperCase()}</h3>
                    <span class="{value ? 'text-secondary' : 'text-secondary/20'} font-semibold text-base">
                        {value ? value.name : 'None'}
                    </span>
                </div>
            {/each}
        </div>

        <!-- Gap between categories and button -->
        <div class="w-4"></div> <!-- Adjust this width to change the gap -->

        <!-- Forge Button -->
        <div class="flex flex-col justify-center items-center">
            <button 
                disabled={!isForgable}
                class="flex flex-row justify-center items-center w-56 h-12 {isForgable ? 'bg-orange-500/90' : 'bg-white/20'} rounded-2xl" 
                on:click={() => scrollTo(mainRef)}>
                <h4 class="text-lg font-semibold {isForgable ? 'text-primary' : 'text-secondary'}">Forge</h4>
            </button>
        </div>
    </div>
    <div class="w-full h-1 bg-white/20"></div>
</div>