<template>
	<div :key='forceReload'>
		<el-menu 
		  :default-active="activeIndex"
		  class="el-menu-demo"
		  mode="horizontal"
		  @select="handleSelect"
		  background-color="#409EFF"
		  text-color="#fff"
		  active-text-color="#ffd04b">
		  <el-menu-item index="1" @click="goBack">Home</el-menu-item>
		  <el-submenu index="2">
		      <template slot="title">Stocks</template>
		      <el-menu-item index="2-1" @click="predic">Risk & Growth-rate</el-menu-item>
		      <el-menu-item index="2-2" v-show="showname" @click="sstock">Add optional stocks</el-menu-item>
		  </el-submenu>
		  <el-menu-item index="3" @click="goDocs">Docs</el-menu-item>
		  <el-menu-item index="4" @click="goReco">Recommendation</el-menu-item>
		  <el-menu-item index="5" @click="register" v-show="!showname">Sign Up</el-menu-item>
		  <el-menu-item index="6" @click="Login" v-show="!showname">Log in</el-menu-item>
		  <el-submenu index="7" v-show="showname">
		      <template slot="title">{{user.username}}</template>
		      <el-menu-item index="7-1"@click="userinfo">Your profile</el-menu-item>
		      <el-menu-item index="7-2" @click="ustock">Your stocks</el-menu-item>
		      <el-menu-item index="7-3" @click="logout">Log out</el-menu-item></el-menu-item>
		  </el-submenu>
		</el-menu>
	</div>
</template>

<script>
  export default {
    inject: ['reload'],
    data() {
      return {
        user: {
            username: '',
            userId:''
        },
        showname: false,
		activeIndex:"1",
    forceReload:0
      };
    },
	mounted(){
		// this.activeMenu(this.$route.path);
	},
    methods: {
	  // activeMenu(v){
		//   if(v=='/'){
		// 	this.activeIndex='1';
		//   }else if(v=='/Prediction'){
		// 	this.activeIndex='2-1';
		//   }else if(v=='/docs'){
		// 	this.activeIndex='3';
		//   }else if(v=='/reco'){
		// 	this.activeIndex='4';
		//   }else if(v=='/Register'){
		// 	this.activeIndex='5';
		//   }else if(v=='/Login'){
		// 	this.activeIndex='6';
		//   }
	  // },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      register(){
        this.$router.push('/Register');
      },
      Login(){
        this.$router.push('/Login');
      },
      goBack(){
        this.$router.push('/');
      },
      userinfo(){
        this.$router.push('/Info');
      },
      predic(){
        this.$router.push('/Prediction');
      },
      sstock(){
        this.$router.push('/select');
      },
      ustock(){
        this.$router.push('/ustock');
      },
      goDocs(){
        this.$router.push('/docs');
      },
      goReco(){
        this.$router.push('/reco');
      },
      logout(){
        const _this = this
        // _this.$axios({
        //   method:'get',
        //   url:'/Logout',
        //   headers: {
        //     "Authorization": localStorage.getItem("token")
        //   }
        // }).then((res) => {
        //   _this.$store.commit('REMOVE_INFO')
        //   _this.$router.push('/Login')
        // });
        localStorage.setItem("token", '');
        this.$store.commit('REMOVE_INFO')
       
                 
        this.$router.push('/Login')
        setTimeout(() => {
                 window.location.reload()},100);
        this.$message({
                        type: 'success',
                        message: 'Successfully logged out!'
                        });
                    

    }
                    
    },
    created(){
        if(this.$store.getters.getUser.username){
            this.user.username = this.$store.getters.getUser.username
            this.user.avatar = this.$store.getters.getUser.avatar
            this.showname = true
        };
        // this.activeMenu(this.$route.path);
    },
  activated(){
      if(this.$store.getters.getUser.username){
            this.user.username = this.$store.getters.getUser.username
            this.user.avatar = this.$store.getters.getUser.avatar
            this.showname = true
        };
        // this.activeMenu(this.$route.path);
	
	}
  }
</script>

<style>
.el-menu{
	
}


</style>