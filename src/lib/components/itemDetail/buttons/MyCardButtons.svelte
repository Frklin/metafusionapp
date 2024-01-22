<script lang="ts">

    export let itemListed: boolean;
    export let itemID: number;
    export let itemPrice: number;

    import { destroyImage, listImage, unlistImage } from '$lib/metafusion_interactions';
    import Modal from '$lib/components/itemDetail/buttons/ListModal.svelte';

    let isModalOpen = false;
    const handleClose = () => {
        isModalOpen = false;
    }

    function listUnlistItem() {
        if (itemListed) {
            unlistItem();
        } else {
            listItem();
        }        
    }

    function listItem() {
        isModalOpen = true;
        itemListed = true;
        console.log('listing item');
        // listImage(itemID, itemPrice.toString());
    }

    function unlistItem() {
        itemListed = false;
        console.log('unlisting item');
        unlistImage(itemID);
    }

    function destroyCard() {
        console.log('destructing card');
        _destroyImage();
    }

    function _destroyImage() {
        destroyImage(itemID);
    }


</script>



<div class="flex flex-row justify-center items-center w-full h-full rounded-xl gap-4 p-4">
    <button disabled={itemListed} on:click={()=>destroyCard()} class="flex flex-row justify-center items-center w-full h-full {itemListed ? 'bg-white/20' : ' hover:bg-orange-500  bg-orange-400'} duration-200 rounded-xl">
        <div class="flex flex-col">
        <h4 class="text-base font-semibold text-primary">Revert Prompts</h4>
        {#if itemListed}
            <span class="text-xs font-normal text-primary"> (unlist first)</span>
        {/if}
        </div>
    </button>

    <button  data-modal-target="crud-modal" data-modal-toggle="crud-modal" on:click={()=>listUnlistItem() } 
        class="flex flex-row justify-center items-center w-full h-full border {itemListed ? 'bg-red-500 hover:bg-red-400' : 'hover:bg-blue-500  bg-button'}  duration-200  border-white/20 rounded-xl">
        <h4 class="text-base font-semibold text-primary">{itemListed ? 'Remove Listing' : 'List Item'}</h4>
    </button>
</div>



<div>
    <Modal item={itemID} open={isModalOpen} on:close={handleClose}/>
</div>