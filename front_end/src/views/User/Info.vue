<template>

<div class="t-main">
    <div class="t-type">
    <el-container style="display: unset !important;">
        <el-aside width="40%"></el-aside>
        <el-main>
        <el-descriptions width="50%"title="UserInfo" direction="vertical" :column="3" border>
            <el-descriptions-item label="Username">{{username}}</el-descriptions-item>
            <el-descriptions-item label="Firstname">{{user.firstname}}</el-descriptions-item>
            <el-descriptions-item label="Lastname">{{user.lastname}}</el-descriptions-item>
            <el-descriptions-item label="E-mail">{{user.email}}</el-descriptions-item>
            <el-descriptions-item label="Password">
            <el-button type="primary" @click="dialogFormVisible = true">Change Password</el-button>
            <el-dialog title="Authentication" :visible.sync="dialogFormVisible">
              <el-form :model="user" v-show="noVcode">
                <el-form-item label="username" :label-width="formLabelWidth" >
                  <el-input v-model="user.name" autocomplete="off"></el-input>
                   <el-link type="primary" @click="sendVcode">Send verification code to your email</el-link>
                </el-form-item>
                
                <el-form-item label="verification code" :label-width="formLabelWidth">
                  <el-input v-model="user.code" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>  
              <div slot="footer" class="dialog-footer" v-show="noVcode">
                <el-button @click="dialogFormVisible = false">Cancel</el-button>
                <el-button type="primary" @click="confrimVcode">Submit</el-button>
              </div>

              <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" v-show="!noVcode">
                <el-form-item label="Please enter your new password" prop="pass">
                  <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Please enter your password again" prop="checkPass">
                  <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>   
              <div slot="footer" class="dialog-footer" v-show="!noVcode">
                <el-button @click="dialogFormVisible = false">Cancel</el-button>
                <el-button type="primary" @click="changePwd">Submit</el-button>
              </div>
            </el-dialog>
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
           var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please enter password'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please enter the password again'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('The passwords entered twice do not match!'));
        } else {
          callback();
        }
      };
        return {
          
            username:'',
            user:{
            username:'',
            firstname: '',
            lastname: '',
            email: '',
            code:'',
            password:'',
            cPassword:'',
            },
             dialogFormVisible: false,
             noVcode: true,
              ruleForm: {
                  pass: '',
                  checkPass: '',
                },
                rules: {
                  pass: [
                    { validator: validatePass, trigger: 'blur' }
                  ],
                  checkPass: [
                    { validator: validatePass2, trigger: 'blur' }
                  ],
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
          sendVcode(){
            
             const _this = this
            _this.$axios({
                method:'post',
                url:'/SendVCode',
                data:{
                  username: this.username
                }
            }).then(res =>{
                console.log(res)
                this.$message({
                    type: 'success',
                    message: 'A verification code has been sent, please check your email.'
                    });
            })
           
            
          },
          confrimVcode(){
            const _this = this
            _this.$axios({
                method:'get',
                url:'/ConfirmVCode',
                params:{
                  username: this.username,
                  ccode:this.user.code
                }
            }).then(res =>{
                console.log(res)
                this.noVcode = false
                 this.$message({
                  message: 'Email verification is successful, please enter your new password',
                  type: 'success'
                });
            })
           
          },
          changePwd(){
            const _this = this
            _this.$axios({
                method:'post',
                url:'/ChangePassword',
                data:{
                  username: this.username,
                  password: this.ruleForm.pass
                }
            }).then(res =>{
                console.log(res)
                this.dialogFormVisible = false
                this.$message({
                  message: 'Password changed successfully, please log in again',
                  type: 'success'
                });
                this.$router.push('/Login');
                setTimeout(() => {
                    window.location.reload()}, 1000);
                
            })
           
          }
      },
      
    }
</script>

<style>
  .t-main{
    width:80%;
	margin: auto;
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