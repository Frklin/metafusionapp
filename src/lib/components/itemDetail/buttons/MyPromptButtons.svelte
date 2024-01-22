<script lang="ts">

    export let itemListed: boolean;
    export let itemID: number;
    export let itemPrice: number;

    import { listPrompt, unlistPrompt } from '$lib/metafusion_interactions';
    import Modal from '$lib/components/itemDetail/buttons/ListModal.svelte';

    let isModalOpen = false;
    const handleClose = () => {
        isModalOpen = false;
    }


    function listUnlistItem() {
        if (itemListed) {
            unlistItem();
        } else {
            openModal();
        }        
    }

    function openModal() {
        isModalOpen = true;
    }

    function unlistItem() {
        unlistPrompt(itemID).then((res) => {
                location.reload();
                itemListed = false;
            });
    }



</script>




<div class="flex flex-col justify-center items-center w-full h-full  rounded-b-xl">
    <button on:click={()=> listUnlistItem()} class="flex flex-row justify-center items-center w-full h-full {itemListed ? 'bg-red-500 hover:bg-red-400' : 'hover:bg-blue-500  bg-button'}  duration-200 rounded-b-xl">
        <h4 class="text-sm font-semibold text-primary">{itemListed ? 'Remove Listing' : 'List Item'}</h4>
    </button>
</div>



<div>
    <Modal item={itemID} itemType={'prompt'} open={isModalOpen} itemListed={itemListed} on:close={handleClose}/>
</div>