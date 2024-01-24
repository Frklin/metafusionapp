<script lang="ts">
	import { onMount } from "svelte";
    import Chart from "chart.js";

    
    export let priceHistory: any = [];
    
    function renderChart() {
    // var ctx = document.getElementById("price").getContext("2d");
    //     var chart = new Chart(ctx, {
    //     type: "line",
    //     data: {
    //         labels: ["January", "February", "March", "April", "May", "June", "July"],
    //         datasets: [
    //         {
    //             label: "My First dataset",
    //             backgroundColor: "rgb(255, 99, 132)",
    //             borderColor: "rgb(255, 99, 132)",
    //             data: [0, 10, 5, 2, 20, 30, 45]
    //         }
    //         ]
    //     },
    //     options: {}
    //     });
    }

    onMount(() => {
        renderChart();
    });

</script>



<div class="flex flex-col w-full border bg-card_background border-white/20 rounded-xl h-[180px]">
    <div class="flex flex-col h-full items-start divide-y divide-white/20 pt-2 gap-2">
        <h3 class="font-semibold text-white pl-4">Price History</h3>
        <div class="flex flex-row justify-between w-full h-full rounded-b-xl  ">
            {#if priceHistory.length == 0}
            <div class="flex flex-col items-center w-full justify-center h-full">
                <h1 class="text-3xl font-semibold text-secondary">No Price History</h1>
            </div>
            {:else}
                <!-- <canvas id="price"></canvas> -->
            {/if}
        </div>
    </div>
</div>
