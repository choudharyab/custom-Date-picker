<div class="calendar"  >
  <svelte:component
    {viewContextKey}
    this={$component === 'date-view' ? DateView : ""}
    on:chosen
  />
</div>

<script>
  import { contextKey } from '../calendarUtils/context'
  import { getContext } from 'svelte'
  import DateView from './date-view/DateView.svelte'
  
  export let viewContextKey

  const { component } = getContext(contextKey)
</script>

<style>
  .calendar {
    box-sizing: border-box;
    position: relative;
    user-select: none;
    width: 100%;
    padding-top: 0;
    width: 340px;
    height: 345px;
  }
</style>