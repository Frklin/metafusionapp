<script>
// @ts-nocheck

    import Pack1032 from '$lib/assets/Packs/5.png';
    import Activity from '$lib/components/itemDetail/Activity.svelte';
    import HistoryPrice from '$lib/components/itemDetail/HistoryPrice.svelte';
    import ItemInfo from '$lib/components/itemDetail/ItemInfo.svelte';
    import PriceBox from '$lib/components/itemDetail/PriceBox.svelte';
    
    
    import { page } from '$app/stores';
    import { onMount } from 'svelte';

    let packId;


    let pack = {};

    $: if (packId) {
        fetchPackByID(packId);
    }

    async function fetchPackByID(packId) {
        try {
            const packResponse = await fetch('http://localhost:3000/packet/'+packId);
            if (!packResponse.ok) {
                throw new Error('Network response was not ok');
            }
            pack = await packResponse.json();
            pack.n = packId.slice(-4);

        } catch (err) {
            error = err;
        }
    }



    onMount(async () => {
            packId = $page.params.id; // Get the dynamic parameter from the URL
            fetchPackByID(packId); // Fetch the card data based on the ID
        });

        
    
</script>
    
    
    

<div class="flex w-full flex-col items-start bg-red-400">
    <div class="flex w-full bg-background px-10 pt-10">
        <div class="flex w-full flex-col gap-10 ">
            <!-- TOP -->
            <div class="grid grid-cols-1 lg:grid-cols-7 gap-6 px-10 pt-10">
                <!-- IMAGE -->
                <div class="lg:col-span-3"> 
                    <img src="{pack.img_path}" alt={`pack ${pack.n}`} class="w-full object-cover rounded-md" />
                </div>
                <!-- RIGHT PART -->
                <div class="lg:col-span-4 flex flex-col gap-6">
                    <ItemInfo itemType={0} itemNumber={pack.n} itemOwner={pack.owner_name} itemEdition={pack.edition}/>

                    <PriceBox itemID={pack.id} itemPrice={pack.price} itemType={0} itemOwner={pack.owner} itemListed={pack.isListed}/>

                    <HistoryPrice />

                    <Activity itemID={pack.id} itemType={"packet"}/>
                </div>
            
            </div>

        </div>
    </div>
</div>


    
    