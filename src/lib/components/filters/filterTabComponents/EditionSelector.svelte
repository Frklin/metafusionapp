<script lang="ts">
    //@ts-nocheck
 
     import SortButton from '$lib/assets/icons/sort.png';
 
     let showEditionFilter: boolean = true;
 
     function toggleEditionFilter() {
         showEditionFilter = !showEditionFilter;
     }
 


 </script>
 
 
 
 
 
 <div class="flex flex-col w-full">
     <div class="flex items-center justify-start py-3 pr-2 pl-4 w-full rounded-lg  cursor-pointer duration-200  hover:bg-white/10" on:click|stopPropagation={toggleEditionFilter}>
         <span class="text-primary text-base font-semibold leading-6 text-left flex-grow">Edition</span>
         <img src={SortButton} class:rotate-180={showEditionFilter} class="w-5 h-5 transition-transform duration-300" alt="sort" />
     </div>
 
     {#if showEditionFilter}
     <div class="flex flex-col gap-4 mt-4 w-full px-4 pb-4">
         {#each [1,2] as Edition}
         <div class="flex flex-row w-full items-center justify-center self-stretch ">
             <label for="{Edition}" class="text-secondary text-sm font-semibold leading-6 text-left flex-grow hover:text-white/80 cursor-pointer">{Edition}° Edition</label>
             <input type="checkbox" 
                     name="{Edition}" 
                     id="{Edition}"
                     class="w-4 h-4  text-button bg-card_background border-white/20 rounded dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
         </div>
         {/each}
     </div>
     {/if}
 </div>