<script lang='ts'>
	import { onMount } from "svelte";
    import { addressFormatter, weiToETH } from "$lib";

    export let itemID: number;
    export let itemType: String;

    let item_activity: any;
    async function get_item_activity() {
        try{
        const res = await fetch('http://localhost:3000/'+itemType+'/'+itemID+'/transactions');
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        item_activity = await res.json();
        } catch (err) {
            console.log(err);
        }
}

onMount(async () => {
    await get_item_activity();
});
</script>

{#if item_activity}
<div class="flex flex-col w-full border divide-y divide-white/20 border-white/20 rounded-xl bg-card_background">
        <h3 class="font-semibold text-white px-4 py-2 ">Item Activity</h3>
    <div class="flex flex-col px-4 pt-2 divide-y divide-white/20">
        <div class="grid grid-cols-5 text-sm font-semibold text-secondary text-start px-10 pb-2">
            <span>Event</span>
            <span>Price</span>
            <span>From</span>
            <span>To</span>
            <span>Date</span>
        </div>
        <div class="flex flex-col h-[180px] overflow-auto divide-y scrollbar px-2 divide-white/20" style="">
            {#each item_activity as activity}
            <div class="grid grid-cols-5 text-start items-center px-8 py-3 hover:bg-white/20 duration-100">
                <span class="text-sm font-semibold text-primary">Sell</span>
                <span class="text-xs text-primary">{weiToETH(activity.price)} ETH</span>
                <span class="text-sm text-button">{addressFormatter(activity.seller)}</span>
                <span class="text-sm text-button">{addressFormatter(activity.buyer)}</span>
                <span class="text-sm text-secondary">2h ago</span>
            </div>
            {/each}
        </div>
    </div>
</div>
{/if}
