<script>
// @ts-nocheck

import image1032 from '$lib/assets/NFTs/7843.jpg';
import prompt1234 from '$lib/assets/Prompts/1234.png';
import prompt1423 from '$lib/assets/Prompts/1423.png';
import Activity from '$lib/components/itemDetail/Activity.svelte';
import HistoryPrice from '$lib/components/itemDetail/HistoryPrice.svelte';
import ItemInfo from '$lib/components/itemDetail/ItemInfo.svelte';
import PriceBox from '$lib/components/itemDetail/PriceBox.svelte';
import PromptList from '$lib/components/itemDetail/PromptList.svelte';
import { page } from '$app/stores';
import { onMount } from 'svelte';

let cardId;


let card = {};

$: if (cardId) {
    fetchCardByID(cardId);
}

async function fetchCardByID(cardID) {
    try {
        const cardResponse = await fetch('http://localhost:3000/card/' + cardID);
        if (!cardResponse.ok) {
            throw new Error('Network response was not ok');
        }
        card = await cardResponse.json();
        card.img_path = 'http://localhost:3000/card/' + cardId + '/image';
        card.n = cardId.slice(-4);
    } catch (err) {
        error = err;
    }
}



onMount(async () => {
        cardId = $page.params.id; // Get the dynamic parameter from the URL
        fetchCardByID(cardId); // Fetch the card data based on the ID
    });


</script>



{#if card && card.id}
<div class="flex w-full flex-col items-start bg-red-400">
    <div class="flex w-full bg-background px-10 pt-10">
        <div class="flex w-full flex-col gap-10 ">
            <!-- TOP -->
            <div class="grid grid-cols-1 lg:grid-cols-7 gap-6 px-10 pt-10">
                <!-- IMAGE -->
                <div class="lg:col-span-3"> 
                    <img src="{card.img_path}" alt={`Card ${card.n}`} class="w-full object-cover rounded-md" />
                </div>
                <!-- RIGHT PART -->
                <div class="lg:col-span-4 flex flex-col gap-6">
                    <ItemInfo itemType={2} itemNumber={card.n} itemOwner={card.owner} itemEdition={card.collectionId}/>

                    <PriceBox itemID={card.id} itemPrice={card.price} itemType={2} itemOwner={card.owner} itemListed={card.isListed}/>

                    <HistoryPrice />

                    <Activity itemID={card.id} itemType={"card"}/>
                </div>
            
            </div>
            <!-- BOTTOM -->
            <div class="w-full px-10 pb-20">
                <PromptList prompts={card.prompts} />
            </div>
        </div>
    </div>
</div>
{/if}


