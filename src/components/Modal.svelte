<script>
  import { onMount, createEventDispatcher, getContext } from 'svelte'
  import { contextKey } from './calendarUtils/context.js'

  const { isOpen, isClosing, config, resetView } = getContext(contextKey)
  const dispatch = createEventDispatcher()

  let popover
  let w
  let triggerContainer
  let contentsAnimated
  let contentsWrapper
  let translateY = 81
  let translateX = 240

  export let trigger

  export function close () {
    isClosing.set(true)
    once(contentsAnimated, 'animationend', () => {
      isClosing.set(false)
      isOpen.set(false)
      dispatch('closed')
    })
  }

  const once = (el, evt, cb) => {
  if (!el) { return }
  function handler () {
    cb.apply(this, arguments)
    el.removeEventListener(evt, handler)
  }
  el.addEventListener(evt, handler)
}

  function checkForFocusLoss (evt) {
    if (!$isOpen) return
    let el = evt.target
    do {
      if (el === popover) {
        return
      }
      el = el.parentNode
    } while (el)
    close()
  }

  onMount(() => {
    config.closeOnFocusLoss && document.addEventListener('click', checkForFocusLoss)
    if (!trigger) { return }
    triggerContainer.appendChild(trigger.parentNode.removeChild(trigger))

    return () => {
      config.closeOnFocusLoss && document.removeEventListener('click', checkForFocusLoss)
    }
  })

  const doOpen = async e => {
    isOpen.set(true)
    resetView()
    dispatch('opened')
  }
</script>

<svelte:window bind:innerWidth={w} />
<div class="sc-popover" bind:this={popover}>
  <div class="trigger" on:click={doOpen} bind:this={triggerContainer}>
    <slot name="trigger">
    </slot>
  </div>
  <div 
    class="contents-wrapper" 
    class:visible={$isOpen}
    class:shrink={$isClosing}
    style="top: {translateY}px; left: {translateX}px" 
    bind:this={contentsWrapper}>
    <div class="wrapper" bind:this={contentsAnimated}>
      <div class="contents-inner">
        <slot name="contents"></slot>
      </div>
    </div>
  </div>
</div>

<style>
  .sc-popover { 
    position: relative;
  }

  .contents-wrapper { 
    position: fixed;
    transition: none;
    z-index: 2;
    display: none;
  }

  .contents-wrapper.visible { 
    display: block;
  }

  .contents-wrapper.visible .wrapper { 
    opacity: 1; 
    transform: scale(1);
    display: block;
  }
  
  .contents-wrapper.shrink .wrapper { 
    animation: shrink 150ms forwards cubic-bezier(.92,.09,.18,1.05);
  }

  .wrapper { 
    background: #fff;
    box-shadow: 0px 10px 26px rgba(0,0,0,0.4) ;
    opacity: .8; 
    padding-top: 0;
    display: none;
    animation: grow 200ms forwards cubic-bezier(.92,.09,.18,1.05);
  }

  .contents-inner { 
    animation: fadeIn 400ms forwards;
  }

  @keyframes grow { 
    0% { 
      transform: scale(.9,.1); 
      opacity: 0; 
    }
    30% { 
      opacity: 1; 
    }
    100% { 
      transform: scale(1);
    }
  }

  @keyframes shrink { 
    0% { 
      transform: scale(1); 
      opacity: 1; 
    }
    70% { 
      opacity: 1; 
    }
    100% { 
      opacity: 0; 
      transform: scale(.9,.1);
    }
  }

  @keyframes fadeIn { 
    0% { 
      opacity: 0; 
    }
    50% { 
      opacity: 0;
    }
    100% { 
      opacity: 1; 
    }
  }
</style>
