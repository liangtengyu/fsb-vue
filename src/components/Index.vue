<template>
  <div id="div1">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm1" label-width="100px" class="demo-ruleForm">

      <el-form-item label="帐号" prop="input">
        <el-input placeholder="请输入账号" v-model="ruleForm.input" prefix-icon="el-icon-s-custom" max clearable></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input placeholder="请输入密码" prefix-icon="el-icon-key" v-model="ruleForm.password" show-password></el-input>
      </el-form-item>
      <div id="but">
        <el-switch v-model="ruleForm.remeber" active-color="#13ce66" active-value=true inactive-value=false active-text="记住" @change="changeR($event)"></el-switch>
        <el-button type="success" class="bt" plain icon="el-icon-thumb" @click="drawer = true">注册</el-button>
        <el-button type="primary" class="bt" plain icon="el-icon-user" @click="login('ruleForm1')">登陆</el-button>
      </div>




      <el-drawer
        title="注册用户"
        :visible.sync="drawer"
        :direction="direction"
        size="65%"
        :before-close="handleClose">
        <template>
          <el-form :model="regForm" :rules="rulereg" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
            <el-form-item label="帐号" prop="name">
              <el-input v-model="regForm.name"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="regForm.password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="reg('ruleForm2')">立即创建</el-button>
              <el-button @click="resetForm('regForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </template>
      </el-drawer>


    </el-form>
  </div>
</template>


<script>
  export default {
    data() {
      return {
        drawer: false,
        direction: 'rtl',
        wap_sign: "",
        ruleForm: {
          input: '',
          password: '',
          remeber: ''
        },
        regForm: {
          name: '',
          password: ''
        },
        rules: {
          input: [
            {required: true, message: '请输入帐号', trigger: 'blur'},
            {min: 4, max: 16, message: '长度在 4 到 16 个字符', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 4, max: 16, message: '长度在 4 到 16 个字符', trigger: 'blur'}
          ]
        },
        rulereg: {
          name: [
            {required: true, message: '请输入帐号', trigger: 'blur'},
            {min: 4, max: 16, message: '长度在 4 到 16 个字符', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 4, max: 16, message: '长度在 4 到 16 个字符', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      test(e){
        console.log(e)
      },
      login(formName) {
        debugger;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post('http://localhost:9999/login', {
                username: this.ruleForm.input,
                password: this.ruleForm.password,
                rememberMe: this.ruleForm.remeber
              }, {emulateJSON: true}
            ).then((response) => {
              var data = response.body
              if (data.code == 0) {
                localStorage.setItem("fsbToken", data.data)
                console.log("login success")
                this.$router.push({path: '/home'})
              } else {
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
      reg(formName) {
        debugger
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post('http://localhost:9999/reg', {
                username: this.regForm.name,
                password: this.regForm.password,
              }, {emulateJSON: false}
            ).then((response) => {
              var data = response.body
              if (data.code == 0) {

                console.log("注册成功")
                this.$router.push({path: '/home'})
              } else {
                this.$message.error('注册失败');
              }
            }, (response) => {
              console.log(response)
              this.$message.error('注册失败');
              // error callback
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      changeR(val) {
        if (val == 'true') {
          this.$notify.info({
            title: 'tips',
            message: '已经记住密码，下次不用输入咯1'
          });
        } else {
          this.$notify.info({
            title: 'tips',
            message: '关闭记住密码'
          });
        }
      }, handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
      browserRedirect() {
        var sUserAgent = navigator.userAgent.toLowerCase();
        var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
        var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
        var bIsMidp = sUserAgent.match(/midp/i) == "midp";
        var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
        var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
        var bIsAndroid = sUserAgent.match(/android/i) == "android";
        var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
        var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
        if ((bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM)) {
          this.wap_sign = "yes";
          console.log(this.wap_sign)
          this.$notify.info({
            title: 'tips',
            message: '现在正在用手机访问'
          });
        } else {
          this.wap_sign = "no";
          console.log(this.wap_sign)
          this.$notify.info({
            title: 'tips',
            message: '现在正在用电脑访问'
          });
        }
      }
    },
    mounted() {
      this.browserRedirect()
    }
  }
</script>
<style>
  #div1 {
    border-top-width: 20px;
    padding-right: 20px;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 0px;
    margin-top: 300px;
  }

  #but {
    padding-left: 60px;
  }

  .bt {

  }

</style>
