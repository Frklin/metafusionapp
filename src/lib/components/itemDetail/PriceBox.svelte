<script lang="ts">
       //@ts-nocheck
    import { buyPacket, buyPrompt, buyImage } from '$lib/metafusion_interactions';
    import {user_pk, weiToETH} from '$lib/index.js';
	
    import MyCardButtons from './buttons/MyCardButtons.svelte';
	import MyPromptButtons from './buttons/MyPromptButtons.svelte';
    import MyPackButtons from './buttons/MyPackButtons.svelte';
    
    
    export let itemID: number;
    export let itemPrice: number;
    export let itemType: number;
    export let itemOwner: string;
    export let itemListed: boolean;

    function convertToUSDT() {
        return weiToETH(itemPrice) * 2470;
    }


    function buyItem() {
        let price = weiToETH(itemPrice);
        if (itemType == 0) {
            buyPacket(itemID, price.toString());
        } else if (itemType == 1) {
            buyPrompt(itemID, price.toString());
        } else {
            buyImage(itemID, price.toString());
        }
        
    }

    $: isMine = itemOwner === user_pk;

    </script>


<div class="flex flex-col w-full border border-white/20 bg-card_background rounded-xl {(isMine&&itemType!=1) ? 'h-[180px]' : 'h-[150px]'}">
    {#if itemListed}
    <div class="flex flex-col gap-2 p-4">
        <h4 class="text-xs font-normal text-secondary">Current Price</h4>
        <div class="flex flex-row gap-2 items-baseline">
                <h1 class="text-3xl font-semibold text-white">{weiToETH(itemPrice)+' ETH'}</h1>
            <h4 class="text-sm font-normal text-secondary"> {itemListed ? '$' + convertToUSDT() : ''}</h4>
        </div>
    </div>
    {:else}
    <div class="flex justify-center items-center h-full w-full"><h1 class="text-3xl font-semibold text-secondary">Item Not Listed</h1></div>
    {/if}

    {#if isMine}
        {#if itemType == 0}
            <MyPackButtons bind:itemListed itemID={itemID} itemPrice={itemPrice}/>
        {:else if itemType == 1}
            <MyPromptButtons bind:itemListed itemID={itemID} itemPrice={itemPrice}/>
        {:else}
            <MyCardButtons bind:itemListed itemID={itemID} itemPrice={itemPrice}/>
        {/if}
    {:else}
    {#if itemListed}
    <div class="flex flex-col justify-center items-center w-full h-full  rounded-b-xl">
        <button on:click={()=>buyItem()} class="flex flex-row justify-center items-center w-full h-full bg-button hover:bg-blue-500 duration-200 rounded-b-xl">
            <h4 class="text-sm font-semibold  text-primary">Buy Now</h4>
        </button>
    </div>
    {/if}
    {/if}
</div>