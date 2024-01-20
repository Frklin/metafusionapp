<script lang="ts">

    export let itemType: number;
    export let itemNumber: number;
    export let itemOwner: string;
    export let itemEdition: number;
</script>



<div class="flex flex-col items-start justify-center w-full  gap-4">
    <h4 class="text-base font-normal text-button">{itemEdition}° Edition</h4>
    <div class="flex flex-col items-start justify-center gap-2">
        <h1 class="text-3xl font-semibold text-primary">Meta{itemType == 0 ? 'Pack' :  itemType == 1 ? 'Prompt' : 'Fusion'} #{itemNumber}</h1>
        <div class="flex flex-row gap-1">
            <h4 class="text-sm font-normal text-secondary">Owned by</h4>
            <h4 class="text-sm font-normal text-button">{itemOwner}</h4>
        </div>
    </div>
</div>