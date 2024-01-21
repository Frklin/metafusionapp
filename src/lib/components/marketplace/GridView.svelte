<script lang="ts">
// @ts-nocheck
    import { NFTtypetoString } from '$lib/index.js';
    export let items: any;
    export let filterTabOpen: boolean;
    export let isMine: boolean=false;
    export let fromWhere: string;


    
</script>

<div class={`w-full grid gap-4 p-4 
    ${filterTabOpen ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6' : 'grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 '}`}>                        
    {#each items as item (item.id)}
        <a href={'/'+fromWhere+'/'+NFTtypetoString(item.NFTtype)+'/'+item.n}>
            <div class="relative bg-card_background rounded-md shadow overflow-hidden">
                <div class="group w-full h-full">
                <img src={item.img_path} alt={`item ${item.n}`} class="w-full h-full object-cover rounded-t group-hover:scale-105 transition-transform duration-300" />
                <div class="absolute inset-x-0 top-0 p-4 bg-gradient-to-b from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span class="text-lg font-bold text-primary">Meta{item.NFTtype == 2 ? 'Fusion' : item.NFTtype == 1 ? "Prompt" : "Packs"} #{item.n}</span>
                    {#if item.isListed}
                    <p class="text-gray-300">{item.price} ETH</p>
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