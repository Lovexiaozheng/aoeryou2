<template>
  <section class="nes-container with-title">
    <h3 class="title">注册界面</h3>
    <div id="inputs" class="item">
      <div class="nes-field">
        <label for="name_field">注册账号：</label>
        <input type="text" id="name_field" class="nes-input" v-model="username" placeholder="请输入您要注册的账号" />
      </div>

      <div class="nes-field">
        <label for="inline_field">您的密码：</label>
        <input type="password" id="inline_field" v-model="password" class="nes-input is-success" placeholder="请输入您的密码" />
      </div>

      <div class="nes-field email-field">
        <label for="warning_field">您的邮箱：</label>
        <div class="email-input-wrapper">
          <input type="text" id="warning_field" v-model="email" class="nes-input is-warning" placeholder="请输入您的邮箱"
            style="position: relative" />
          <button type="button" class="nes-btn is-warning send-email-code" @click="sendEmailCode" v-show="isEmailValid">
            发送验证码
          </button>
        </div>
      </div>

      <div class="nes-field">
        <label for="error_field">邮箱验证码：</label>
        <input type="text" id="error_field" v-model="emailcode" class="nes-input is-error" placeholder="请输入邮箱收到的验证码" />
      </div>
    </div>
    <!---->
    <!---->
    <span v-text="loginMsg" style="color: red"></span>
    <div class="login">
      <button type="button" class="nes-btn is-primary" @click="login">
        返回登录
      </button>
      <button type="button" class="nes-btn is-success" @click="register">
        注册账号
      </button>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "Register",
  data() {
    return {
      username: "",
      password: "",
      email: "",
      emailcode: "",
      loginMsg: "",
    };
  },
  computed: {
    isEmailValid() {
      const emailRegex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return emailRegex.test(this.email);//匹配则返回true
    },
  }, //验证邮箱机制
  methods: {
    login() {
      this.$router.push({
        path: "/login",
      });
    },
    register() {
      //注册
      let _this = this;
      if (this.username.length == 0) {
        _this.loginMsg = "用户名不能为空！";
      } else if (this.password.length == 0) {
        _this.loginMsg = "密码不能为空！";
      } else if (this.email.length == 0) {
        _this.loginMsg = "邮箱不能为空！";
      } else if (this.emailcode.length == 0) {
        _this.loginMsg = "邮箱验证码不能为空！";
      } else {
        axios
          .post(
            "http://47.115.209.249:8080/user/register",
            {
              username: this.username,
              password: this.password,
              email: this.email,
              code: this.emailcode,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then(function (response) {
            console.log(response);
            if (response.data.code == 200) {
              _this.loginMsg = "注册成功！";
              alert("注册成功！即将为您跳转到登录界面");
              _this.$router.push({
                path: "/login",
              });
            } else {
              _this.loginMsg = "注册失败！检查您的邮箱验证码是否正确！";
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },

    //发送邮箱验证码
    sendEmailCode() {
      const _this = this;
      //发json不是发表单
      var params = new URLSearchParams();
      params.append("email", this.email);

      axios
        .post(
          "http://47.115.209.249:8080/user/sendCode",
          {
            email: this.email,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then(function (response) {
          console.log(response);
          if (response.data.code == 200) {
            alert("验证码已发送，请检查您的邮箱！");
          } else {
            alert("发送失败，请稍后重试！");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
/* 登录容器样式 */
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
}

/* NES 容器样式 */
.nes-container {
  /* 基本容器样式 */
  margin: 0 auto;
  margin-top: 10%;
  margin-bottom: 2rem;
  width: 100%;
  max-width: 600px;
  padding: 2rem;
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.176);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;

  /* 修复基于 Webkit 浏览器的 3D 渲染错误 */
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

/* 具有标题的 NES 容器的附加样式 */
.nes-container.with-title {
  padding-top: 3rem;
}

.nes-container.with-title::before,
.nes-container.with-title::after {
  /* 容器标题背景的通用样式 */
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2rem;
  background-color: #fff;
  border-radius: 3px 3px 0 0;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.176);
  z-index: -1;
}

/* NES 容器标题样式 */
.nes-container.with-title .title {
  position: relative;
  z-index: 1;
  margin: 0;
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: #212529;
  background-color: #fff;
  border-radius: 3px 3px 0 0;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.176);
}

/* NES 容器内项目样式 */
.nes-container .item {
  margin-bottom: 1rem;
}

.nes-container .item:last-child {
  margin-bottom: 0;
}

.nes-container .showcode {
  position: absolute;
  top: 0;
  right: 0;
  margin: 0;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
  background-color: #212529;
  border: 0;
  border-radius: 0 3px 0 3px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.176);
  cursor: pointer;/* 鼠标悬停时的样式 */
  transition: all 0.3s ease;
}
  /* 按钮悬停、聚焦和激活状态 */
.nes-container .showcode:hover {
  background-color: #000;
}
  /* 按钮聚焦 */
.nes-container .showcode:focus {
  outline: none;
}
  /* 按钮激活状态 */
.nes-container .showcode:active {
  background-color: #000;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.176);
  transform: translateY(3px);
}

.nes-container .showcode:disabled {
  background-color: #212529;
  box-shadow: none;
  cursor: not-allowed;
}

  /* 按钮禁用状态 */
.nes-container .showcode:disabled:hover {
  background-color: #212529;
}
 /* 按钮颜色变体 */
.nes-container .showcode:disabled:active {
  background-color: #212529;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.176);
  transform: translateY(0);
}

.nes-container .showcode.is-disabled {
  background-color: #212529;
  box-shadow: none;
  cursor: not-allowed;
}

.nes-container .showcode.is-disabled:hover {
  background-color: #212529;
}

.nes-container .showcode.is-disabled:active {
  background-color: #212529;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.176);
  transform: translateY(0);
}

.nes-container .showcode.is-primary {
  background-color: #212529;
}

.nes-container .showcode.is-primary:hover {
  background-color: #000;
}

.nes-container .showcode.is-primary:active {
  background-color: #000;
}

.nes-container .showcode.is-primary.is-disabled {
  background-color: #212529;
}

.nes-container .showcode.is-primary.is-disabled:hover {
  background-color: #212529;
}

.nes-container .showcode.is-primary.is-disabled:active {
  background-color: #212529;
}

.nes-container .showcode.is-success {
  background-color: #212529;
}

.nes-container .showcode.is-success:hover {
  background-color: #000;
}

.nes-container .showcode.is-success:active {
  background-color: #000;
}

.nes-container .showcode.is-success.is-disabled {
  background-color: #212529;
}

.nes-container .showcode.is-success.is-disabled:hover {
  background-color: #212529;
}

.nes-container .showcode.is-success.is-disabled:active {
  background-color: #212529;
}

.nes-container .showcode.is-warning {
  background-color: #212529;
}

.nes-container .showcode.is-warning:hover {
  background-color: #000;
}

/* 电子邮件输入字段 */
.email-field {
  position: relative;
}
/* 和发送验证码按钮对齐 */
.email-input-wrapper {
  display: inline;
  position: relative;
}

.send-email-code {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  padding: 0 1rem;
}
</style>
