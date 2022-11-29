<template>
    <div class="logindata">
      <div class="loginbox">
        <el-container>
          <el-aside width="60%">
            <img src='../../assets/lg.png' style='width: 90%; height:70%'>
          </el-aside>

     
            <el-main>
              <div class="logintext">
               <h2> Hellow, welcome back to us! </h2>
              </div>
                
            <div class="input"> 
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="Username" prop="username">
                  <el-input type="text" maxlength="12" v-model="ruleForm.username"></el-input>
                </el-form-item>
        
                <el-form-item label="Password" prop="password">
                  <el-input type="password" minlength="12" v-model="ruleForm.password" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')">Sign in</el-button>
                  <el-button @click="goBack('ruleForm')">Go back</el-button><br/>
                  <el-link type="primary" @click="register">Click here to register</el-link>&nbsp;&nbsp; 
                  <el-link @click="changePwd">Forget your password?</el-link>
                        
                </el-form-item>
              </el-form> 
            </div>
            </el-main>
        </el-container>
      </div>
    </div>
</template>
<script>
export default {

  name: 'Login',
  data(){
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Password can not be empty'));
      } else {
         callback();
      }
    };
    return{
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
         password: [
          {
            validator: validatePass, trigger: 'blur'
          }
        ],
        username: [
          { required: true, message: 'Username can not be empty', trigger: 'blur' },
          { max: 12, message: 'no more than 12 characters', trigger: 'blur' }
        ]
      }
    };    
  },
  methods: {
    submitForm(formName){
      const _this = this
      this.$refs[formName].validate((valid) => {
        if(valid){
          this.$axios.post('/Login', this.ruleForm).then((res) => {
            const token = res.headers['authorization']
            _this.$store.commit('SET_TOKEN', token)
            _this.$store.commit('SET_USERINFO', res.data.data)
           setTimeout(() => {
            window.location.reload(),100});
             
            _this.$router.push('/');
            
            this.$message({
                    type: 'success',
                    message: 'Login successful!'
                    });
                  
          })
        }
          else{
            console.log('error submit!!');
            return false;
          

        }
      });
    },
    register(){
      this.$router.push('/Register');
    },
    created() {
      
    },
    goBack(){
        this.$router.push('/');
     },
     changePwd(){
      
     }
  }
}

</script>

<style>
    .logindata{
      width: 100%;
      height: 100%;
      min-width: 1000px;
      background-color: #409EFF;
      background-size: 100% 100%;
      background-position: center center;
      overflow: auto;
      background-repeat: no-repeat;
      position: fixed;
      line-height: 100%;
      //padding-top: 150px;
    }
    .el-container{
      weight:100%;
      height: 100%;
    }
    .loginbox{
      background-color: #FFF;
      border-radius: 30px;
      box-shadow: 10px 10px 5px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .08); 
      width: 100%;
      height: 100%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
    }
    .logintext{
      height: 32%; 
      width: 100%;
      text-align: center;
    }

    .input{
      width: 100%;
    }
    .el-aside {
    margin:auto;
    line-height: 250px;
    }  
    .el-main {
        width:100%;
        height: 100%;
        text-align: center;
    }
    


</style>

