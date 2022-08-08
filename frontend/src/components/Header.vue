<template>
    <el-menu 
    :default-active="activeIndex" 
    class="el-menu-demo" 
    mode="horizontal" 
    @select="handleSelect"
    text-color="#303133"
    active-text-color="#FFF"> 
    <el-menu-item index="1" @click="goBack">Home</el-menu-item>
    <el-submenu index="2">
        <template slot="title">xxx</template>
        <el-menu-item index="2-1">1</el-menu-item>
        <el-menu-item index="2-2">2</el-menu-item>
        <el-menu-item index="2-3">3</el-menu-item>
    </el-submenu>
    <el-menu-item index="3">Docs</el-menu-item>
    <el-menu-item index="4">xxx</el-menu-item>
    <el-menu-item index="5" @click="register" v-show="!showname">Sign up</el-menu-item>
    <el-menu-item index="6" @click="Login" v-show="!showname">Log in</el-menu-item>
    <el-submenu index="7" v-show="showname">
        <template slot="title">{{user.username}}</template>
        <el-menu-item index="7-1"@click="userinfo">Your profile</el-menu-item>
        <el-menu-item index="7-2">Your stocks</el-menu-item>
        <el-menu-item index="7-3" @click="logout">Log out</el-menu-item></el-menu-item>
    </el-submenu>
    </el-menu>
</template>

<script>
  export default {
    data() {
      return {
        user: {
            username: ''
        },
        showname: false,
      };
    },
    methods: {
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
      logout(){
        const _this = this 
        _this.$axios.get("/Logout", {
            headers:{
                "Authorization": localStorage.getItem("token")
            }
        }).then(res =>{
            _this.$store.commit("REMOVE_INFO")
            _this.$router.push("/")
        })
      }

    },
    created(){
        if(this.$store.getters.getUser.username){
            this.user.username = this.$store.getters.getUser.username
            this.user.avatar = this.$store.getters.getUser.avatar
            this.showname = true
        }
    }
  }
</script>

<style>



</style>