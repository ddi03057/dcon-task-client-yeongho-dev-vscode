<template>
    <Header/>
    <page-content/>
    <LeftMenu/>
    <Footer/>
</template>

<script>
import PageContent from './PageContent.vue'
import {mapActions, mapGetters} from 'vuex'
import Footer from "@/pages/layout/footer/footer"
import LeftMenu from "@/pages/layout/sidebar/LeftMenu";
import Header from "@/pages/layout/header/Header";

export default {
  components: {
    PageContent,
    Footer,
    LeftMenu,
    Header
  },
  computed: {
    ...mapGetters('user', ['userInfo']),
  },
  methods: {
    ...mapActions('locale', ['setLocale']),
    onChangeLocale (locale) {
      this.$i18n.locale = locale
      this.setLocale({
        locale
      })
    },
  },
  watch: {
  },
}
</script>

<style scoped>
/*.full-inner-height, .full-inner-height .container-inner {*/
/*  height: calc(100vh - 40px - 70px - 36px) !important*/
/*}*/

/*.user-create-inner-height, .user-create-inner-height .container-inner {*/
/*  height: calc(100vh - 40px - 70px - 36px - 49px) !important*/
/*}*/
</style>
