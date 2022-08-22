<template>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="username" prop="username">
            <el-input v-model.number="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="password" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="confirm password" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">submit</el-button>
            <el-button @click="goBack">cancel</el-button>
        </el-form-item>
        </el-form>
</template>
<script>
  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please input new password'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please re-enter the password'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('The passwords entered twice do not match!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          pass: '',
          checkPass: '',
          username: ''
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          username: [
          { required: true, message: 'Username can not be empty', trigger: 'blur' },
          { max: 12, message: 'no more than 12 characters', trigger: 'blur' }
        ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        const _this = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            _this.$axios({
                url:'/ChangePassword',
                method:'post',
                data:{
                    username:this.ruleForm.username,
                    password:this.ruleForm.pass
                }
            }).then((res) => {
                console.log(res)
                this.$router.push('/Login')
            })
          } else {
            console.log('error submit!!');
            return false;
            this.$router.push('/changePwd')
          }
        });
      },
      goBack(){
        this.$router.push('/');
     }
    }
  }
</script>