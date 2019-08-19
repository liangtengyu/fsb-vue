<template>
  <div id="div1"  >
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" >

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
      <div id="but">
      <el-switch
        v-model="ruleForm.remeber"
        active-color="#13ce66"
        active-value=true
        inactive-value=false
        active-text="记住"
      @change="changeR($event)">
      </el-switch>



      <el-button type="success" class="bt" plain icon="el-icon-thumb" @click="">注册</el-button>
      <el-button type="primary" class="bt" plain icon="el-icon-user" @click="login('ruleForm')">登陆</el-button>

      </div>
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
        remeber: ''},
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
                this.$message.error('登陆失败了');
              }
            }, (response) => {
              console.log(response)
              this.$message.error('登陆失败了');
              // error callback
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      changeR(val){
        console.log(val)

        if (val){
          this.$notify.info({
            title: 'tips',
            message: '已经记住密码，下次不用输入咯1'
          });
        }
    }
  }
  }
</script>
<style>
  #div1{
    border-top-width: 20px;
    padding-right: 20px;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 0px;
    margin-top: 300px;
  }
  #but{
    padding-left: 60px;
  }
  .bt{

  }

</style>
