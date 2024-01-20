<script lang="ts">

    export let items: any;
    export let itemType: number;
    
</script>



<div class="flex flex-col w-full divide-y divide-white/20 px-2">
    <div class="grid grid-cols-5 gap-4 px-2 py-2 text-sm text-center font-semibold text-secondary" style="grid-template-columns: 1.5fr 1.8fr 1fr 1fr 1fr;">
        <span>Item</span>
        <span>Last Sale</span>
        <span>Owner</span>
        <span>Time Listed</span>
        <span class="sr-only">Actions</span>
      </div>
    <div class="flex w-full flex-col divide-y divide-white/10 px-2">
    {#each items as item (item.id)}
        <a href={'/marketplace/cards/'+item.n}>
            <div class="flex items-center p-4 hover:bg-white/20 duration-100">
            <img src={item.img_path} alt={`item ${item.n}`} class="w-12 h-12 rounded-full object-cover mr-4" />
            <div class="flex flex-grow items-center justify-between">
                <div class="flex flex-col">
                    <span class="text-lg font-bold text-primary">Meta{itemType == 2 ? 'Fusion' : itemType == 1 ? "Prompt" : "Packs"} #{item.n}</span>
                    <span class="text-sm text-secondary">{item.price} ETH</span>
                </div>
                <div class="text-right">
                    <div class="text-sm text-secondary">Last sale: 10.12 ETH</div>
                    </div>
                    <div class="text-sm text-primary">item.owner</div>
                    <div class="text-sm text-secondary">2h</div>
                    <button class="bg-blue-500 text-white rounded-xl px-4 py-2">Buy Now</button>
                </div>
            </div>
        </a>
    {/each}
    </div>
</div>