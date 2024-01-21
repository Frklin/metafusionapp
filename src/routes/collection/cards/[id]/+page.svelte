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



let card = {
        id: 43423800344763272947996792372586800463640240757845045274316701742183960645741n,
        img_path: image1032,
        n: 1032,
        price: 1.0,
        owner: '0x6fd304ECb50e48e4358E20027e73298EB72915Df',
        owner_name: 'Francesco',
        isListed: true,
        prompts:
        [
            {promptid: `1234`, category: 'character', name: 'Human', rarity: 0.6, price: 0.1, img_path: prompt1234},
            {promptid: `1423`, category: 'handoff', name: 'knife', rarity: 0.3, price: 0.2, img_path: prompt1423},
        ],
        collection: 1
    }



</script>




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
                    <ItemInfo itemType={2} itemNumber={card.n} itemOwner={card.owner_name} itemEdition={card.collection}/>

                    <PriceBox itemID={card.id} itemPrice={card.price} itemType={2} itemOwner={card.owner} itemListed={card.isListed}/>

                    <HistoryPrice />

                    <Activity />
                </div>
            
            </div>
            <!-- BOTTOM -->
            <div class="w-full px-10 pb-20">
                <PromptList prompts={card.prompts} />
            </div>
        </div>
    </div>
</div>



