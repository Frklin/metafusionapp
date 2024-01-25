<script lang="ts">
    //@ts-nocheck
    export let items: any;
    export let filteredItems: any;
 
    import SortButton from '$lib/assets/icons/sort.png';

    let showStatusFilter = true;

    let stati = ["All", "Listed", "Not Listed"]
    let selectedStatus = "All"

    function toggleStatusFilter() {
        showStatusFilter = !showStatusFilter;
    }

    function filterStatus(){
        if(selectedStatus === "All"){
            return items;
        } else if(selectedStatus === "Listed"){
            filteredItems = items.filter((item: any) => item.listed === true);
        } else if(selectedStatus === "Not Listed"){
            filteredItems = items.filter((item: any) => item.listed === false);
        }
    }
    function selectStatus(view: string) {
    selectedStatus = view;
    }
 
 </script>
 
 
 <div class="flex flex-col w-full">
     <div class="flex items-centerjustify-start py-3 pr-2 pl-4 w-full rounded-lg  cursor-pointer duration-200  hover:bg-white/10" on:click|stopPropagation={toggleStatusFilter}>
         <span class="text-primary text-base font-semibold leading-6 text-left flex-grow">Status</span>
         <img src={SortButton} class:rotate-180={showStatusFilter} class="w-5 h-5 transition-transform duration-300" alt="sort" />
     </div>
 
     {#if showStatusFilter}
     <div class="flex items-center w-full gap-x-1 rounded-lg justify-between  p-2 bg-card_background">
        {#each stati as status}
        <button on:click={() => selectStatus(status)}
            class:bg-white={selectedStatus === status}
            class:bg-opacity-15={selectedStatus === status}
            class:bg-opacity-0={selectedStatus !== status}
            class="rounded-lg p-2 transition duration-500">
            <span class="text-center text-white {selectedStatus === status ? 'font-semibold' : ''}">{status}</span>
        </button>
        {/each}
      </div>               
     {/if}
 </div>