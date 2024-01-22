<script lang="ts">
// @ts-nocheck
    import { NFTtypetoString, weiToETH } from '$lib/index.js';
    import PromptCard from '$lib/components/PromptCard.svelte';
    export let items: any;
    export let filterTabOpen: boolean;
    export let isMine: boolean=false;
    export let fromWhere: string;

</script>

<div class={`w-full grid gap-4 p-4 
    ${filterTabOpen ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6' : 'grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 '}`}>                        
    {#each items as item (item.id)}
        <a href={'/'+fromWhere+'/'+NFTtypetoString(item.nft_type)+'/'+item.id}>
            <div class="relative bg-card_background rounded-md shadow overflow-hidden">
                <div class="group w-full h-full">
                {#if item.nft_type != 1}
                <img src={item.img_path} alt={`item ${item.n}`} class="w-full h-full object-cover rounded-t group-hover:scale-105 transition-transform duration-300" />
                {:else}
                <PromptCard item={item} />
                {/if}
                <div class="absolute inset-x-0 top-0 p-4 bg-gradient-to-b from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span class="text-lg font-bold text-primary">Meta{item.nft_type == 2 ? 'Fusion' : item.nft_type == 1 ? "Prompt" : "Packs"} #{item.id.slice(0,4)}</span>
                    {#if item.isListed}
                    <p class="text-gray-300">{weiToETH(item.price)} ETH</p>
                    {/if}
                </div>
                {#if !isMine}
                    <button class="absolute bottom-0 left-0 w-full bg-blue-500 text-white font-semibold py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Buy Now</button>
                {/if}
                </div>
            </div>
        </a>
    {/each}
</div>

