<script lang="ts">
// @ts-nocheck
    import { NFTtypetoString } from '$lib/index.js';

    export let items: any;
    export let itemType: number;
    export let filterTabOpen: boolean;
    export let fromWhere: string;

    
</script>

<div class={`w-full grid gap-4 p-4 
    ${filterTabOpen ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5' : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'}`}>                    
    {#each items as item (item.id)}
    <a href={'/'+fromWhere+'/'+NFTtypetoString(itemType)+'/'+item.n}>
        <div class="flex flex-col rounded-md bg-card_background shadow group">
            <div class="relative overflow-hidden rounded-t-md">
                <img src={item.img_path} alt={`item ${item.n}`} class="w-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div class="flex flex-col items-start gap-1 p-3">
                <span class="text-lg font-bold text-primary">Meta{itemType == 2 ? 'Fusion' : itemType == 1 ? 'Prompt' : 'Packs'} #{item.n}</span>
                <p class="text-secondary text-sm">{item.price} ETH</p>
            </div>
            <button class="mt-auto bg-blue-500 text-white font-semibold w-full py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-md">Buy Now</button>
        </div>
    </a>
    {/each}
</div>