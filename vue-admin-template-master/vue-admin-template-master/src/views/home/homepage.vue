<template>
  <div class="dashboard-container">
    <div class="dashboard-text">welcome!</div>
    <el-button type="primary" @click="handlelogin">Log in </el-button>
    <el-button type="success">成功按钮</el-button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Homepage',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
    handlelogin(){
      this.$router.push('/login')
    }
  },
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
