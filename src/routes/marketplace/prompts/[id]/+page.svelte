<script>
// @ts-nocheck

    import Prompt1032 from '$lib/assets/Prompts/1234.png';
    import Activity from '$lib/components/itemDetail/Activity.svelte';
    import HistoryPrice from '$lib/components/itemDetail/HistoryPrice.svelte';
    import ItemInfo from '$lib/components/itemDetail/ItemInfo.svelte';
    import PriceBox from '$lib/components/itemDetail/PriceBox.svelte';
	import PromptCardDetail from '$lib/components/PromptCardDetail.svelte';

    
    
    import { page } from '$app/stores';
    import { onMount } from 'svelte';

    let promptId;


    let prompt = {};

    $: if (promptId) {
        fetchPromptByID(promptId);
    }

    async function fetchPromptByID(promptId) {
        try {
            const promptResponse = await fetch('http://localhost:3000/prompt/'+promptId);
            if (!promptResponse.ok) {
                throw new Error('Network response was not ok');
            }
            prompt = await promptResponse.json();
            prompt.n = promptId.slice(-4);

        } catch (err) {
            error = err;
        }
    }



    onMount(async () => {
            promptId = $page.params.id; // Get the dynamic parameter from the URL
            fetchPromptByID(promptId); // Fetch the card data based on the ID
        });

        
    </script>
    
    
    
{#if prompt && prompt.id}
<div class="flex w-full flex-col items-start bg-red-400">
    <div class="flex w-full bg-background px-10 pt-10">
        <div class="flex w-full flex-col gap-10 ">
            <!-- TOP -->
            <div class="grid grid-cols-1 lg:grid-cols-7 gap-6 px-10 pt-10">
                <!-- IMAGE -->
                <div class="lg:col-span-3"> 
                    <!-- <img src="{prompt.img_path}" alt={`prompt ${prompt.n}`} class="w-full object-cover rounded-md" /> -->
                    <PromptCardDetail item={prompt} />
                </div> 

                <!-- RIGHT PART -->
                <div class="lg:col-span-4 flex flex-col gap-6">
                    <ItemInfo itemType={1} itemNumber={prompt.n} itemOwner={prompt.owner} itemEdition={prompt.collectionId}/>

                    <PriceBox itemID={prompt.id} itemPrice={prompt.price} itemType={1} itemOwner={prompt.owner} itemListed={prompt.isListed}/>

                    <HistoryPrice itemID={prompt.id} itemType={"prompt"}/>

                    <Activity itemID={prompt.id} itemType={"prompt"}/>
                </div>
            
            </div>

        </div>
    </div>
</div>
{/if}



