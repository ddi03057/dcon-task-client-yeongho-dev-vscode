<template>
  <div
    :class="[{'collapsed' : collapsed}]"
    calss="dcon-menu-left"
  >
    <div class="dcon-left">
<!--    <footer>-->
      <div class="footer bg-secondary">
        <div>
          <div>
            <div class="dropdown">
              <button class="btn btn-warning dropdown-toggle" type="button" id="dropdownMenuButton1"
                      data-bs-toggle="dropdown" aria-expanded="false">
                {{ $t('common.lang.select') }}
              </button>
              collapsed==={{collapsed}}
              Copyright © 2022 DC-ON All Rights Reserved>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><a class="dropdown-item" href="#" @click="footerChangeLanguage('ko')">한국어</a></li>
                <li><a class="dropdown-item" href="#" @click="footerChangeLanguage('en')">English</a></li>
              </ul>
            </div>

          </div>
        </div>

      </div>
    </div>
  </div>

</template>


<script>
import VueCookie from 'vue-cookies'
import {LOCALE_COOKIE_NAME} from '@/constants/constants'
import {footerChangeLang} from "@/utils/validation";
import {mapActions, mapState} from "vuex";

export default {
  name: 'base-footer',
  components: {},
  data() {
    return {
      value: '',
      isOnMobile: false,
      selected: null,
      collapsed: false,
    }
  },

  methods: {
    ...mapActions('locale', ['setLocale']),
    footerChangeLanguage(locale){

      this.$i18n.locale = locale
      this.setLocale({
        locale
      })
     footerChangeLang(locale)
    }
  },
  watch: {
    value () {
      this.$emit('change', this.value)
      // VueCookie.set(LOCALE_COOKIE_NAME, this.value, '30d', '/', 'opsnow.com')

      this.footerChangeLanguage(this.value)
      //  footerChangeLang(this.value)

    }
  },
  beforeMount() {
    this.value = VueCookie.get(LOCALE_COOKIE_NAME) || 'ko'
  }
}
</script>
<style scoped>

.footer {
/*  background-color: lightgray;*/
  height: 7.7%;
  position: fixed;
  bottom: 0;
  width: 100%;
  /*padding: 30px;*/
  padding-left: 65px;
}

</style>

