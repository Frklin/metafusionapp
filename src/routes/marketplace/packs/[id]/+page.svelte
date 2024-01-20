<script>
// @ts-nocheck

    import Pack1032 from '$lib/assets/Packs/5.png';
    import Activity from '$lib/components/itemDetail/Activity.svelte';
    import HistoryPrice from '$lib/components/itemDetail/HistoryPrice.svelte';
    import ItemInfo from '$lib/components/itemDetail/ItemInfo.svelte';
    import PriceBox from '$lib/components/itemDetail/PriceBox.svelte';
    import PromptList from '$lib/components/itemDetail/PromptList.svelte';
    
    
    let pack = {
            id: 1,
            img_path: Pack1032,
            n: 1032,
            price: 0.1,
            owner: '0x1234567890123456789012345678901234567890',
            owner_name: 'Francesco',
            edition: 1
        }
    
    
    
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
    
                        <PriceBox itemPrice={pack.price} />
    
                        <HistoryPrice />
    
                        <Activity />
                    </div>
                
                </div>

            </div>
        </div>
    </div>
    
    
    
    