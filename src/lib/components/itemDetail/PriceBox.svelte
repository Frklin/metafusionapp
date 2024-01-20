<script lang="ts">
    import { buyPacket, buyPrompt, buyImage } from '$lib/metafusion_interactions';
    export let itemID: number;
    export let itemPrice: number;
    export let itemType: number;

    function convertToUSDT() {
        return itemPrice * 2470;
    }


    function buyItem() {
        if (itemType == 0) {
            buyPacket(itemID, itemPrice.toString());
        } else if (itemType == 1) {
            buyPrompt(itemID, itemPrice.toString());
        } else {
            buyImage(itemID, itemPrice.toString());
        }
        
    }
</script>


<div class="flex flex-col w-full border border-white/20 bg-card_background rounded-xl h-[150px]">
    <div class="flex flex-col gap-2 p-4">
        <h4 class="text-xs font-normal text-secondary">Current Price</h4>
        <div class="flex flex-row gap-2 items-baseline">
            <h1 class="text-3xl font-semibold text-white">{itemPrice} ETH</h1>
            <h4 class="text-sm font-normal text-secondary">$ {convertToUSDT()}</h4>
        </div>
    </div>

    <!-- Button -->
    <div class="flex flex-col justify-center items-center w-full h-full  rounded-b-xl">
        <button on:click={()=>buyItem()} class="flex flex-row justify-center items-center w-full h-full bg-button rounded-b-xl">
            <h4 class="text-sm font-semibold text-primary">Buy Now</h4>
        </button>
    </div>
</div>