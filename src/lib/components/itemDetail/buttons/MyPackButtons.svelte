
<script lang='ts'>

    export let itemListed: boolean;

    function openPacket() {
        console.log('opening packet');
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
        console.log('listing item');
    }

    function unlistItem() {
        itemListed = false;
        console.log('unlisting item');
    }


</script>




<!-- Button -->
<div class="flex flex-row justify-center items-center w-full h-full rounded-xl gap-4 p-4">
    <button on:click={()=>openPacket()} class="flex flex-row justify-center items-center w-full h-full hover:bg-green-400 duration-200  bg-green-500 rounded-xl">
        <h4 class="text-base font-semibold text-primary">Open Packet</h4>
    </button>
    <button on:click={()=>listUnlistItem()}  class="flex flex-row justify-center items-center w-full h-full border {itemListed? 'bg-red-500 hover:bg-red-400' : 'hover:bg-blue-500  bg-button'}  duration-200 border-white/20 rounded-xl">
        <h4 class="text-base font-semibold text-primary">{itemListed? 'Remove Listing' : 'List Item'}</h4>
    </button>
    
</div>