
<script lang='ts'>
   //@ts-nocheck
    export let itemListed: boolean;
    export let itemID: number;
    export let itemPrice: number;

    import { openPacket, listPacket, unlistPacket } from '$lib/metafusion_interactions';

    function openPack() {
        console.log('opening packet');
        openPacket(itemID);
    }

    function listUnlistItem() {
        if (itemListed) {
            unlistItem();
        } else {
            listItem();
        }        
    }

    function listItem() {
        itemListed = true;
    }

    function unlistItem() {
        itemListed = false;
        unlistPacket(itemID);
    }


</script>




<!-- Button -->
<div class="flex flex-row justify-center items-center w-full h-full rounded-xl gap-4 p-4">
    <button disabled={itemListed} on:click={()=>openPack()} class="flex flex-row justify-center items-center w-full h-full {itemListed ? 'bg-white/20' : ' hover:bg-green-400 duration-200  bg-green-500'} rounded-xl">
        <div class="flex flex-col">
            <h4 class="text-base font-semibold text-primary">Open Packet</h4>
            {#if itemListed}
            <span class="text-xs font-normal text-primary"> (unlist first)</span>
            {/if}
        </div>
    </button>
    <button on:click={()=>listUnlistItem()}  class="flex flex-row justify-center items-center w-full h-full border {itemListed? 'bg-red-500 hover:bg-red-400' : 'hover:bg-blue-500  bg-button'}  duration-200 border-white/20 rounded-xl">
        <h4 class="text-base font-semibold text-primary">{itemListed? 'Remove Listing' : 'List Item'}</h4>
    </button>
    
</div>