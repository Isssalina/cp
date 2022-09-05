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
    import Qs from 'qs'
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
              _this.user.username = res.data.data.username
              _this.user.firstname = res.data.data.firstName
              _this.user.lastname = res.data.data.lastName
              _this.user.email = res.data.data.email
            })
          },
          changPwd(){
           
            this.$prompt('Please input your username', 'Authentication', {
              confirmButtonText: 'submit',
              cancelButtonText: 'cancel',

            }).then(({ value }) => {
           
            
            const _this = this
            
            console.log(value)
            _this.$axios({
              method:'post',
              url:'/sendVCode',
              params:{
                username: value
              }
            }).then(res =>{
            console.log(res)
            _this.$prompt('Please enter the verification code received by the email address bound to your account', 'E-mail verification', {
            confirmButtonText: 'submit',
            cancelButtonText: 'cancel',

            }).then(({comCode})=> {
              
            _this.$axios.get('/confirmVCode',{
            data:{
            username:_this.username,
            ccode: comCode
            }
            }).then(res =>{
            console.log(res)
            _this.$router.push('/changePwd');
            })
            })
              });
            }).catch(() => {
              this.$message({
                type: 'info',
                message: 'Cancel input'
              });       
            });
      
           
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