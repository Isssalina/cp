<template>
  <div id="app">
	<Header></Header>
    <router-view v-if="isRouterShow"/>
  </div>
</template>
<script>
	import Header from './components/Header'
	export default{
	    components: {Header},
      provide () {
      return {
        reload: this.reload  //把方法传递给下级组件
      }
    },
    data() {
      return {
        isRouterShow: true, //定义一个变量控制v-if
        user: {
            username: '',
            userId:''
        },
      }
    },
    methods: {
      async reload () {  //触发显示隐藏
        this.isRouterShow = false
        await this.$nextTick()
        this.isRouterShow = true
      },
      

	},
  created(){
        if(this.$store.getters.getUser.username){
            this.user.username = this.$store.getters.getUser.username
            this.user.avatar = this.$store.getters.getUser.avatar
            this.showname = true
        };
  }
  
  }
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
  width:100%;
  margin: 0 auto
  
}
  .el-main {    
    text-align: center;
    line-height: 250px;
  }
  .el-container{
    width:100% !important;
    height:100%;
  }

</style>