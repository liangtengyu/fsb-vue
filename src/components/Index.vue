<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

      <el-form-item label="帐号" prop="input">
      <el-input
        placeholder="请输入账号"
        v-model="ruleForm.input"
        prefix-icon="el-icon-s-custom"
        max
        clearable>
      </el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
      <el-input placeholder="请输入密码"  prefix-icon="el-icon-key" v-model="ruleForm.password" show-password></el-input>
      </el-form-item>
      <el-switch
        v-model="ruleForm.remeber"
        active-color="#13ce66"
        inactive-color="#ff4949"
        active-value=true
        inactive-value=false
        title="记住我">
      </el-switch>

      <el-button type="primary" plain icon="el-icon-user" @click="login('ruleForm')">登陆</el-button>
    </el-form>
  </div>
</template>


<script>
  export default {
    data() {
      return {
        ruleForm: {
        input: '',
        password: '',
        remeber: true},
        rules: {
          input: [
            { required: true, message: '请输入帐号', trigger: 'blur' },
            { min: 4, max: 16, message: '长度在 4 到 16 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 4, max: 16, message: '长度在 4 到 16 个字符', trigger: 'blur' }
          ]
        }
      }
    },methods:{
      login(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post('http://localhost:9999/login',{
                username:this.ruleForm.input,
                password:this.ruleForm.password,
                rememberMe:this.ruleForm.remeber
              },{emulateJSON:true}

            ).then((response) => {
              var data=response.body
              if (data.code == 0){
                localStorage.setItem("fsbToken",data.data)
                console.log("login success")
                this.$router.push({path: '/home'})
              }else {
                alert("登录失败")
              }
            }, (response) => {
              console.log(response)
              alert("登录失败")
              // error callback
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });


      }
    }
  }
</script>
