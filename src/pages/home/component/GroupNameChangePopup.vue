<template>
  <g-popup :title="this.groupOrgName+' '+$t('pages_home_title')" width="600" :background-click="false">
    <template #body>
      <div class="-wrapper -bg-white -pb-10">
        <div class="-label -width-100">
          <div class="-wrapper">
            <p style="font-size: 14px">{{$t('pages_home_title')}}</p>
          </div>
        </div>
        <div class="-font-size-12 mw-800 -width-100">
          <g-input-text-label :label="$t('pages_home_title')" star class="-mt-8">
              <g-input-text
                id="change-group_name"
                class="-width-100"
                maxlength="25"
                :placeholder="$t('pages_home_title')"
                v-model="groupName"
                :invalid="invalid"
                @keyup-enter="onClickSave"
              />

          </g-input-text-label>

        </div>
      </div>


    </template>
    <template #footer>
      <g-button @click="onClickClose" variant="secondary"><span>{{$t('common.cancel')}}</span></g-button><!--
      --><g-button @click="onClickSave" :disabled="!isSelected"><span>{{$t('pages_home_title')}}</span></g-button>
    </template>
  </g-popup>
</template>

<script>
import {mapGetters} from "vuex";
//import {ValidationObserver, ValidationProvider} from 'vee-validate'
//import FailPopup from "@/pages/group/components/FailPopup";

export default {
  components: {
   // ValidationObserver,
  //  ValidationProvider
  },
  data() {
    return {
      groupId: '',
      groupName:'',
      groupOrgName:'ss',
      selectedValue: {},
      groupKey: '',
      validObserver: null,
      isOk : false
    }

  },

  props: {
    instKey: {
      type: String,
      default: null
    },
    onChangeNemeSend: {
      type: Function,
      defalut: () => () => {}
    },
    selectedChangeGroupId: {
      type: String,

    }
  },

  computed: {
   // ...mapGetters('group', ['groupChangeId','popUpGroupList','updateGroupName']),
    ...mapGetters('user', ['userInfo']),

    isSelected () {

      return Object.keys(this.groupName).length !== 0 &&
             this.groupOrgName !== this.groupName
    },
  },
  methods: {
   // ...mapActions('group', ['putGroupWithId','getPopupGroupList']),
    onClickClose() {
      this.$popupManager.close(this.instKey)
    },
    parmaLenthCheck(str){
      let charLength = 0;
      for(let i = 0; i < str.length; i++) {
        charLength += 1;
  /*      ch1 = str.charAt(i);
        if(escape(ch1).length > 4) {
          charLength += 2;
        } else {
          charLength += 1;
        }*/
      }
      return charLength
    },
    is_hangul_char(ch) {
      let c = ch.charCodeAt(0);
      if( 0x1100<=c && c<=0x11FF ) return true;
      if( 0x3130<=c && c<=0x318F ) return true;
      if( 0xAC00<=c && c<=0xD7A3 ) return true;
      return false;
    },

    async onClickSave() {

  /*    if(this.parmaLenthCheck(this.groupName) >= 26){

        this.$showToast(this.$t('pages_group_change_name_han_length'))
        this.isOk = false
        return false
      }else{
        this.isOk = true
      }*/
/*      if(this.groupOrgName === this.groupName){
        const failPopupData = {}
        failPopupData.errorCode = '99'
        failPopupData.code  =ERROR_CODE
        failPopupData.errorMessage = this.$t('group_change_name_duplicate')

        const selectedInviteFailMessage = JSON.stringify(failPopupData)
        this.$popupManager.open(FailPopup, {
          onInviteUserSendFail: (selectedValue) => {
            this.selectedManager = selectedValue
          },
          selectedInviteFailMessage
        })
        this.isOk = false
      }*/
      if(this.isOk){
        let param = {}
      //  param.serviceCode = MARKET_SERVICE_CODE
        param.siteCode = this.userInfo.siteCode
        param.userEmail = this.userInfo.userEmail
        param.groupId = this.groupId
        param.groupName = this.groupName
        param.groupOrgName = this.groupOrgName

      //  await this.putGroupWithId(param)
     //   let updateResult = await this.updateGroupName
        let updateResult =0

        if (0 === updateResult.code) {

            if (this.onChangeNemeSend) {
              await this.onChangeNemeSend(this.groupName)
              this.$showToast(this.$t('pages_home_title'))
            }

        }
      }

    },

    async getInit(){

    //  this.$showToast(this.$t('pages_group_change_name_han_length'))
      let paramValue = JSON.parse(this.selectedChangeGroupId)

      let param = {}
      this.groupId = paramValue.groupId


      param.needAdminInfo = '0'

      this.groupName = paramValue.groupName.trim()
      this.groupOrgName = paramValue.groupName.trim()

    },


  },
  beforeMount() {
    this.getInit()
  },
}

</script>
