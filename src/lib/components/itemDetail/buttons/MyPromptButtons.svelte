<script lang="ts">

    export let itemListed: boolean;



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




<div class="flex flex-col justify-center items-center w-full h-full  rounded-b-xl">
    <button on:click={()=> listItem()} class="flex flex-row justify-center items-center w-full h-full {itemListed ? 'bg-red-500 hover:bg-red-400' : 'hover:bg-blue-500  bg-button'}  duration-200 rounded-b-xl">
        <h4 class="text-sm font-semibold text-primary">{itemListed ? 'Remove Listing' : 'List Item'}</h4>
    </button>
</div>