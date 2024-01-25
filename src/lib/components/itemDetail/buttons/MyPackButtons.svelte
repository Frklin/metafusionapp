
<script lang='ts'>
   //@ts-nocheck
    export let itemListed: boolean;
    export let itemID: number;
    export let itemPrice: number;

    import { openPacket, unlistPacket } from '$lib/metafusion_interactions';
    import Modal from '$lib/components/itemDetail/buttons/ListModal.svelte';

    let isModalOpen = false;
    const handleClose = () => {
        isModalOpen = false;
    }

    function openPack() {
        openPacket(itemID).then((res) => {
            let numPacketOpened = localStorage.getItem("numPacketOpened") || 0
            let updatedNumPacketOpened = numPacketOpened + 1
            localStorage.setItem("numPacketOpened", updatedNumPacketOpened);
            location.replace('/collection');
        });
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
        unlistPacket(itemID).then((res) => {
                location.reload();
                itemListed = false;
            });
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
    <button  data-modal-target="crud-modal" data-modal-toggle="crud-modal" on:click={()=>listUnlistItem() } class="flex flex-row justify-center items-center w-full h-full border {itemListed ? 'bg-red-500 hover:bg-red-400' : 'hover:bg-blue-500  bg-button'}  duration-200  border-white/20 rounded-xl">
        <h4 class="text-base font-semibold text-primary">{itemListed? 'Remove Listing' : 'List Item'}</h4>
    </button>
    
</div>

<div>
    <Modal item={itemID} itemType={'packet'} open={isModalOpen} itemListed={itemListed} on:close={handleClose}/>
</div>