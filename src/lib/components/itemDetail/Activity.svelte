<script>

let item_activity = [
        {id: 14, event: "Sale", price: 0.5, from: "Andrea", to: "Francesco", date: "2w ago"},
        {id: 13, event: "Sale", price: 0.5, from: "Claudio", to: "Andrea", date: "1y ago"},
        {id: 15, event: "Sale", price: 0.5, from: "Andrea", to: "Claudio", date: "1y ago"},
        {id: 16, event: "Sale", price: 0.5, from: "Claudio", to: "Andrea", date: "1y ago"},
        {id: 17, event: "Sale", price: 0.5, from: "Andrea", to: "Claudio", date: "1y ago"},
        {id: 18, event: "Sale", price: 0.5, from: "Claudio", to: "Andrea", date: "1y ago"},
        {id: 19, event: "Sale", price: 0.5, from: "Andrea", to: "Claudio", date: "1y ago"},
        {id: 20, event: "Sale", price: 0.5, from: "Claudio", to: "Andrea", date: "1y ago"},
        {id: 12, event: "Mint", price: 0.5, from: "Null", to: "Claudio", date: "2y ago"},
    ]

</script>


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
            {#each item_activity as activity (activity.id)}
            <div class="grid grid-cols-5 text-start items-center px-8 py-3 hover:bg-white/20 duration-100">
                <span class="text-sm font-semibold text-primary">{activity.event}</span>
                <span class="text-xs text-primary">{activity.price} ETH</span>
                <span class="text-sm text-button">{activity.from}</span>
                <span class="text-sm text-button">{activity.to}</span>
                <span class="text-sm text-secondary">{activity.date}</span>
            </div>
            {/each}
        </div>
    </div>
</div>