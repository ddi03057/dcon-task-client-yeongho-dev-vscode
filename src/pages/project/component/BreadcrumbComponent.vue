<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item" :lastitem="item.lastItem" v-for="(item,index) in breadcrumbItems" :key="item.text" >
        <a v-if="index+1 < breadcrumbItems.length" class="" :href="item.link" target="_self" aria-current="location">
          {{item.text}}
        </a>
        <span v-if="index+1 == breadcrumbItems.length" aria-current="location" text="issue" active="true"
              activeclass="router-link-active" disabled="false"
              exact="false"
              exactactiveclass="router-link-exact-active"
              replace="false" routercomponentname="router-link"
              target="_self">
          {{item.text}}
        </span>
      </li>
    </ol>
  </nav>
</template>

<script>
export default {
  name: "BreadcrumbComponent",

  props: {
    breadcrumbItems: {
      type: Array,
      default: () => []
    },
    projectId: {
      type: String,
      default: ''
    },
  },
}
</script>

<style scoped>

</style>