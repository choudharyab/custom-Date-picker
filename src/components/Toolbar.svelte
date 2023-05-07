<div class="toolbar">
  <button type="button" class="button" on:click|preventDefault={progress}>
    {calendarApplyText}
  </button>
</div>

<script>
  import { getContext, createEventDispatcher } from 'svelte'
  import { contextKey } from './calendarUtils/context.js'

  export let calendarApplyText = "Apply"
  
  const dispatch = createEventDispatcher()

  const { config, component, isDateChosen } = getContext(contextKey)

  
  function progress () {
      isDateChosen.set(false)
    if ($component === 'date-view') {
      isDateChosen.set(true)
      dispatch('close')
  
    } 
  }
</script>

<style>
  .toolbar {
    padding: 0;
    display: flex;
    flex: 1 0 auto;
    justify-content: center;
  }

  .button {
    font-size: 16px;
    flex: 1 0 auto;
    padding: 12px 6px;
    border: 0;
    font-weight: 500;
    color: var(--modal-button-text-color);
    background-color: var(--modal-background-button-color);
    max-width: 340px;
  }

  @media (min-width: 600px) {
    .toolbar {
      border-top: 1px solid var(--toolbar-border-color);
      padding: 6px;
      justify-content: flex-end;
    }

    .button {
      flex: 0 0 auto;
      padding: 6px 12px;
      border-radius: 5px;
    }
  }
</style>