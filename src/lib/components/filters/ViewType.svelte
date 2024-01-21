<script lang='ts'>
    //@ts-nocheck

    export let selectedView: string;

    import {views} from '$lib/constants';
    import ListButton from '$lib/assets/icons/list.png';
    import GridButton from '$lib/assets/icons/grid.png';
    import TableButton from '$lib/assets/icons/table.png';

    let icons = {
        list: ListButton,
        grid: GridButton,
        table: TableButton,
    };

    function selectView(view: string) {
        selectedView = view;
    }
</script>



<div class="flex items-center gap-x-1 rounded-xl bg-card_background p-1">
    {#each views as view}
    <button on:click={() => selectView(view)}
        class:bg-white={selectedView === view}
        class:bg-opacity-15={selectedView === view}
        class:bg-opacity-0={selectedView !== view}
        class="rounded-lg p-2 transition duration-500">
        <img src={icons[view]}
            class:opacity-50={selectedView !== view}
            alt={view}
            class="w-6 h-6 hover:opacity-100 duration-200" />
    </button>
    {/each}
  </div>