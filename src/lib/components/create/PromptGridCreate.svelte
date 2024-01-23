<script lang="ts">
    import PromptFullCardCreate from './PromptFullCardCreate.svelte';

    export let items: any;
    export let selectedPrompts: any;
    export let selectedCategories: any;
    export let categoryFocused: any;
    export let mainRef: HTMLDivElement;
    export let filterTabOpen: boolean;

    
    </script>
    
    <div class={`w-full grid gap-4 p-4 
        ${filterTabOpen ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6' : 'grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 '}`}>                        
        {#each items as item (item.id)}
            <div class="relative bg-card_background rounded-md shadow overflow-hidden ">
                <div class="group w-full h-full {item.isListed ? '' : 'cursor-pointer'}">  

                    <PromptFullCardCreate item={item} blocked={item.isListed} bind:selectedPrompts={selectedPrompts} bind:mainRef bind:categoryFocused bind:selectedCategories/>
                
                    <div class="absolute inset-x-0 top-0 p-4 bg-gradient-to-b from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span class="text-lg font-bold text-primary">MetaPrompt #{item.id.slice(0,4)}</span>
                </div>
                {#if item.isListed}
                    <div class="flex w-full h-8 justify-center items-center absolute top-[45%] opacity-80 rounded-lg bg-red-500 text-center text-white font-semibold" style="z-index: 100;">Listed</div>
                {/if}

                </div>
            </div>
        {/each}
    </div>
    
    