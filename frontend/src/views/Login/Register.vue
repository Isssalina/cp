<template>
    <div class="logindata">
      <div class="loginbox">
        <el-container>
          <el-aside width="60%">
            <img src='../../assets/lg.png' style='width: 90%; height:90%'>
          </el-aside>
          <el-main>
            <div class="logintext">
               <h1>Hellow, welcome to us!</h1>
            </div>
                 
            <div class="input"> 
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

                <el-form-item label="Firstname" prop="firstname">
                  <el-input type="text" maxlength="12" v-model="ruleForm.firstname"></el-input>
                </el-form-item>
        
                <el-form-item label="Lastname" prop="lastname">
                  <el-input type="text" maxlength="12" v-model="ruleForm.lastname" auto-complete="off"></el-input>
                </el-form-item>
                
                <el-form-item label="Username" prop="username">
                  <el-input type="text" maxlength="12" v-model="ruleForm.username"></el-input>
                </el-form-item>

                <el-form-item 
                    label="Email" 
                    prop="email"
                    :rules="[
                        {required: true, message: 'E-mail can not be empty', trigger: 'blur'},
                         { type: 'email', message: 'E-mail format is incorrect', trigger: ['blur', 'change'] }
                    ]"
                >
                  <el-input v-model="ruleForm.email" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')">Submit</el-button>
                  <el-button @click="goBack('ruleForm')">Go back</el-button>
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

  name: 'Register',
  data(){
    
    return{
      ruleForm: {
        firstname: '',
        lastname: '',
        username: '',
        email: '',
      },
      rules: {
        firstname: [
          { required: true, message: 'Fistname can not be empty', trigger: 'blur' },
          { max: 12, message: 'no more than 12 characters', trigger: 'blur' }
        ],
        lastname: [
          { required: true, message: 'Lastname can not be empty', trigger: 'blur' },
          { max: 12, message: 'no more than 12 characters', trigger: 'blur' }
        ], 
        username: [
          { required: true, message: 'Username can not be empty', trigger: 'blur' },
          { max: 12, message: 'no more than 12 characters', trigger: 'blur' }
        ]
      }
    };    
  },
  methods: {
    submitForm(){
        var that = this;
        var data = this.ruleForm;
        this.$axios({
            method: 'post',
            url: '/Register',
            data: data
        }).then(function(r){
            if(r.data.code === 0){
                that.router.push("/Login");
            }else{
                that.$message.error(r.data.msg);
            }
        })
    },
   
     goBack(){
        this.$router.push('/');
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
    .loginbox{
      background-color: #FFF;
      border-radius: 30px;
      box-shadow: 10px 10px 5px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .08); 
      width: 75%;
      height: 80%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
    }
    .logintext{
      height: 32%; 
      width: 90%;
    }
    .input{
      width: 80%;
    }
    .el-aside {
    color: #333;
    text-align: center;
    line-height: 350px;
    }  
    .el-main {
        color: #333;
        line-height: 300px;
      }
      body > .el-container {
        margin-bottom: 40px;
      }

</style>

