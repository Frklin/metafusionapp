<script>
// @ts-nocheck

    import Prompt1032 from '$lib/assets/Prompts/1234.png';
    import Activity from '$lib/components/itemDetail/Activity.svelte';
    import HistoryPrice from '$lib/components/itemDetail/HistoryPrice.svelte';
    import ItemInfo from '$lib/components/itemDetail/ItemInfo.svelte';
    import PriceBox from '$lib/components/itemDetail/PriceBox.svelte';
    import PromptList from '$lib/components/itemDetail/PromptList.svelte';
    
    
    let prompt = {
            id: 1,
            img_path: Prompt1032,
            n: 1032,
            price: 1.0,
            isListed: false,
            owner: '0x6fd304ECb50e48e4358E20027e73298EB72915Df',
            owner_name: 'Francesco',
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
                        <img src="{prompt.img_path}" alt={`prompt ${prompt.n}`} class="w-full object-cover rounded-md" />
                    </div>
                    <!-- RIGHT PART -->
                    <div class="lg:col-span-4 flex flex-col gap-6">
                        <ItemInfo itemType={1} itemNumber={prompt.n} itemOwner={prompt.owner_name} itemEdition={prompt.collection}/>
    
                        <PriceBox itemID={prompt.id} itemPrice={prompt.price} itemType={1} itemOwner={prompt.owner} itemListed={prompt.isListed}/>
    
                        <HistoryPrice />
    
                        <Activity />
                    </div>
                
                </div>

            </div>
        </div>
    </div>
    
    
    
    