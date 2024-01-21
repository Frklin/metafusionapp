<script lang='ts'>

    export let filteredItems: any;
    export let selectedSort: any;

    import { sortOptions } from '$lib/constants';
    import SortButton from '$lib/assets/icons/sort.png';

    let showSortDropdown = false;
    let sortCriteria = sortOptions[0].sortFunction;

    function toggleDropdown() {
        showSortDropdown = !showSortDropdown;
    }

    function applySort(sortFunction: any) {
        sortCriteria = sortFunction;
        showSortDropdown = false; 
        selectedSort = sortOptions.find(option => option.sortFunction === sortFunction);
    }

    $: filteredItems = filteredItems.sort(sortCriteria);


</script>





<div class="flex items-center justify-start rounded-xl border border-card_background py-3 pr-2 pl-4 min-w-[200px] cursor-pointer hover:border-white/20 duration-200" on:click|stopPropagation={toggleDropdown}>
    <span class="text-primary text-opacity-90 text-base font-semibold leading-6 text-left flex-grow">{selectedSort.name}</span>
    <img src={SortButton} class:rotate-180={showSortDropdown} class="w-5 h-5 transition-transform duration-300" alt="sort" />
</div>

<!-- SORT OPTIONS DROPDOWN -->
{#if showSortDropdown}
  <div class="absolute z-10 w-full bg-card_background mt-2 rounded-xl shadow-lg sort-dropdown">
    <ul class="py-1">
      {#each sortOptions as option}
        <li>
          <a href="#" class="block items-center justify-end rounded-xl border border-card_background py-3 pr-2 cursor-pointer hover:bg-white/20" on:click|preventDefault={() => applySort(option.sortFunction)}>
            <span class=" text-primary text-opacity-90 text-base font-semibold leading-6 pr-8 pl-4 ">{option.name}</span>
          </a>
        </li>
      {/each}
    </ul>
  </div>
{/if}