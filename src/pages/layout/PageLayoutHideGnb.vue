<template>
  <page-content />
</template>

<script>
import PageContent from './PageContent.vue'

export default {
  components: {
    PageContent
  },
  mounted () {
    window.hideGnb()
  },
  beforeDestroy () {
    window.showGnb()
  }
}
</script>

