<script lang="ts">
	import { onMount } from "svelte";
    import Chart from "chart.js/auto";

    
    let ctx: HTMLCanvasElement | undefined;
    let chart: Chart | undefined;


    export let itemID: number;
    export let itemType: String;
    // export let priceHistory: any[] = [{date: 0, price: 10000000000000000},{date: 1, price: 10000000000000000},{date: 2, price: 10000000000000000},{date: 3, price: 10000000000000000}];
    let priceHistory: any[];
    async function get_priceHistory() {
        try {
            priceHistory = [];
            const res = await fetch('http://metafusion.homeworkheroes.it:3000/' + itemType + '/' + itemID + '/transactions');
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            let count = 0;
            let activity = await res.json();
            for (let i = 0; i < activity.length; i++) {
                if (activity[i].price != 0) {
                    priceHistory.push({ date: count, price: activity[i].price });
                    count++;
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    function createChart() {
        chart = new Chart(ctx, {
        type: "line",
        data: {
        labels: priceHistory.map(item => item.date),
        datasets: [{
            label: "Price",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            borderColor: "rgb(255, 99, 132)",
            data: priceHistory.map(item => item.price),
            tension: 0.4, // This will make the line smoother
        }]
        },
        options: {
        layout: {
            padding: {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10
            }
        },
        scales: {
            y: { // defining the Y-axis
            title: {
                display: true,
                text: 'Price (ETH)'
            }
            },
            x: { // defining the X-axis
            title: {
                display: true,
                text: 'Transaction'
            }
            }
        },
        elements: {
            line: {
            borderWidth: 3
            }
        },
        responsive: true,
        maintainAspectRatio: false, // This will allow the chart to fill the container
        }
    });
    }
    onMount(async () => {
        // wait 2 seconds for the page to load
        await get_priceHistory();
        await new Promise(r => setTimeout(r, 2000));
        createChart();
    });

    $: if (ctx) {
    if (chart) {
        chart.destroy();
    }
    chart = new Chart(ctx, {
        type: "line",
        data: {
        labels: priceHistory.map(item => item.date),
        datasets: [{
            label: "Price",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            borderColor: "rgb(255, 99, 132)",
            data: priceHistory.map(item => item.price),
            tension: 0.4, // This will make the line smoother
        }]
        },
        options: {
        layout: {
            padding: {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10
            }
        },
        scales: {
            y: { // defining the Y-axis
            title: {
                display: true,
                text: 'Price (ETH)'
            }
            },
            x: { // defining the X-axis
            title: {
                display: true,
                text: 'Transaction'
            }
            }
        },
        elements: {
            line: {
            borderWidth: 3
            }
        },
        responsive: true,
        maintainAspectRatio: false, // This will allow the chart to fill the container
        }
    });
    }

$: console.log(priceHistory);
</script>


{#if priceHistory}
<div class="flex flex-col w-full border bg-card_background border-white/20 rounded-xl h-[180px]">
    <div class="flex flex-col h-full items-start divide-y divide-white/20 pt-2 gap-2">
        <h3 class="font-semibold text-white pl-4">Price History</h3>
        <div class="flex flex-row justify-between w-full h-full rounded-b-xl  ">
            {#if priceHistory.length == 0}
            <div class="flex flex-col items-center w-full justify-center h-full">
                <h1 class="text-3xl font-semibold text-secondary">No Price History</h1>
            </div>
            {:else}
                <div class="w-full h-full">
                    <canvas bind:this={ctx}  id="price"></canvas>
                </div>
            {/if}
        </div>
    </div>
</div>
{/if}
