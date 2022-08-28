<template>

<div class="t-main">
    <Header></Header>
    <div class="t-type">
    <el-container>
        <el-aside width="40%"></el-aside>
        <el-main>
        <el-descriptions width="50%"title="UserInfo" direction="vertical" :column="3" border>
            <el-descriptions-item label="Username">{{username}}</el-descriptions-item>
            <el-descriptions-item label="Firstname">{{user.firstname}}</el-descriptions-item>
            <el-descriptions-item label="Lastname">{{user.lastname}}</el-descriptions-item>
            <el-descriptions-item label="E-mail">{{user.email}}</el-descriptions-item>
            <el-descriptions-item label="Password">
            <el-button type="primary" @click="changPwd">Change Password</el-button>
            </el-descriptions-item>

        </el-descriptions>
        </el-main>
        </el-container>
    </div>
</div>

</template>

<script>
    import Header from '../../components/Header'
    export default{
        name: 'Info',
        components: {Header},
        data() {
        return {
          
            username:'',
            user:{
            username:'',
            firstname: '',
            lastname: '',
            email: '',
            }
            
          };
         
        },
        created(){
        if(this.$store.getters.getUser.username){
            this.username = this.$store.getters.getUser.username
            this.avatar = this.$store.getters.getUser.avatar
            this.getUserInfo()
        }
        
      },
      methods: {

          getUserInfo(){
            const _this = this
            _this.$axios.get('/UserInfo',{
              params:{
                username:this.username
              }
            }).then(res =>{
              console.log(res)
              _this.user.username = res.username
              _this.user.firstname = res.firstname
              _this.user.lastname = res.lastname
              _this.user.email = res.email
            })
          },
          changPwd(){
            this.$router.push('/changePwd');
          }
      },
      
    }
</script>

<style>
  .t-main{
    width:100%
  }
  .el-container {
    text-align: center;
    width: 80%;
  }

  .el-aside {
    text-align: center;
    width: 35%;
  }
  .el-main {

    text-align: center;
    line-height: 60px;
  }
</style>