<template>
  <div class="dashboard-container">
    <div v-show="!hasLogin" class="dashboard-text"> {{ username }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
    ])
  },
  data(){
    return{
      user:{
        username:'welcome',
      },
      hasLogin: false,
    };
  },
  createed(){
    if(this.getInfo()){
      this.user.username = this.getInfo.username
      this.hasLogin = true
    }

  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
