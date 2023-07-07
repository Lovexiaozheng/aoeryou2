<template>
  <div class="box">
    <p class="title">Container.is-dark</p>
    <div class="layout_page" id="content-inner">
      <div class="aside_content" id="aside_content">
        <div class="card-widget card-info">
          <div class="card-content">
            <div class="avatar" style="text-align: center">
              <hr />
              <hr />
              <div class="nes-container is-rounded is-dark">
                <img class="nes-avatar is-rounded is-large" style="image-rendering: pixelated" v-bind:src="user.avatar"
                  alt="avatar" />
                <div class="nes-text is-primary">{{ user.username }}</div>
                <div class="author-info__description">
                  这个家伙很懒，什么都没写。
                </div>
              </div>
            </div>
            <div class="card-info-social-icons is-center">
              <a class="social-icon" href="#" target="_blank">
                <i class="fa fa-github"></i>
              </a>
            </div>
          </div>
        </div>

        <div class="tool">
          <button class="nes-btn" onclick="document.getElementById('dialog-default').showModal();">
            修改信息
          </button>
          <button type="button" class="nes-btn is-primary" @click="gotolist">
            商品列表
          </button>
          <button type="button" class="nes-btn is-success" @click="gotoorder">
            订单列表
          </button>
          <button type="button" class="nes-btn is-warning" @click="gotofavorites">
            收藏列表
          </button>
          <button type="button" class="nes-btn is-error" @click="loginOut">
            退出登录
          </button>
          <section>
            <dialog class="nes-dialog" id="dialog-tixian">
              <form method="dialog">
                <h1 style="text-align: center">余额提现</h1>
                <div class="nes-field is-inline">
                  <label for="error_field">提现：</label>
                  <input type="text" id="error_field" class="nes-input is-error" v-model="crashout"
                    placeholder="请输入要提现的余额" />
                </div>
                <menu class="dialog-menu" style="text-align: center">
                  <button class="nes-btn">取消</button>
                  <button class="nes-btn is-success" @click="withdraw">
                    确认
                  </button>
                </menu>
              </form>
            </dialog>
            <dialog class="nes-dialog" id="dialog-chongzhi">
              <form method="dialog">
                <h1 style="text-align: center">充值余额</h1>
                <div class="choice">
                  <p>请选择充值的金额</p>
                </div>
                <div class="recharge_hurg">
                  <ul>
                    <li :class="[index == status ? 'bechoice' : '']" v-for="(item, index) in list" :key="index"
                      @click="choicePrice(index, item.price)">
                      {{ item.price }}元
                    </li>
                    <li>
                      <input id="otheramount" type="number" placeholder="其他金额" @click="choiceother" v-model="question"
                        onkeyup="this.value=this.value.replace(/\D/g,'')"
                        oninput="  if(value>999999)value=999999;if(value.length>7)value=value.substring(0,7)" />
                    </li>
                    <p class="recharge_hurg_price">
                      充值金额：
                      <span>{{ thePrice }}.00</span><span style="color: black">元</span>
                    </p>
                    <button class="recharge_btn" @click="recharge">充值</button>
                    <br />
                    <br />

                    <button class="recharge_btn nes-text is-primary" style="background-color: antiquewhite">
                      返回
                    </button>
                  </ul>
                </div>
              </form>
            </dialog>

            <dialog class="nes-dialog" id="dialog-default">
              <form method="dialog">
                <h1 style="text-align: center">修改信息</h1>
                <div class="nes-field">
                  <label for="name_field">您的昵称：</label>
                  <input type="text" id="name_field" class="nes-input is-success" v-model="user.username" />
                </div>
                <div class="nes-field">
                  <label for="inline_field">您的旧密码：</label>
                  <input type="password" id="inline_field" class="nes-input is-success" v-model="oldtoken"
                    placeholder="请输入您的旧密码" />
                </div>
                <div class="nes-field">
                  <label for="inline_field">您的新密码：</label>
                  <input type="text" id="inline_field" class="nes-input is-success" v-model="newtoken"
                    placeholder="不改密码则不填" />
                </div>
                <div class="nes-field">
                  <label for="inline_field">您的头像：</label>
                  <div>
                    <img class="nes-avatar is-rounded is-large" style="image-rendering: pixelated"
                      v-bind:src="user.avatar" alt="avatar" />
                  </div>

                  <label class="nes-btn is-warning" @change="picfile">
                    <span>更改头像请点此上传文件</span>
                    <input type="file" id="inline_field" class="nes-input is-success" placeholder="不改头像则不填" />
                  </label>
                </div>

                <menu class="dialog-menu">
                  <button class="nes-btn">返回</button>
                  <button class="nes-btn is-primary" @click="modify">
                    确认更改
                  </button>
                </menu>
              </form>
            </dialog>
          </section>
          <button type="button" class="nes-btn is-disabled">Disabled</button>
        </div>

        <hr />
        <h2>信息一览</h2>

        <div class="nes-container is-rounded">
          <span>您的账号为：{{ user.username }}</span>
          <br />

          <span>您的邮箱为：{{ user.email }}</span>

          <div class="webinfo-site-uv-name">
            当前余额:{{ balance }}
            <span class="nes-text is-primary" onclick="document.getElementById('dialog-chongzhi').showModal();"><u>
                充值</u></span>
            <span class="nes-text is-success" onclick="document.getElementById('dialog-tixian').showModal();"><u>
                提现</u></span>
          </div>

          <span>是否已完成实名认证：{{ user.certification }}</span>
        </div>
      </div>

      <article id="page">
        <div class="article-container">
          <hr />
          <h2>交易记录</h2>
          <div class="skillbox">
            <div class="skillbar">
              <span>总共已完成订单：{{ Finished }}（单）</span>
              <progress class="nes-progress is-primary" :value="Finished" max="100"></progress>
            </div>
            <div class="skillbar">
              <span>总共已售商品：{{ Agoodnum }}（个）</span>
              <progress class="nes-progress is-success" :value="Agoodnum" max="100"></progress>
            </div>
            <div class="skillbar">
              <span>正在审核的商品：{{ Bgoodnum }}（个）</span>
              <progress class="nes-progress is-warning" :value="Bgoodnum" max="100"></progress>
            </div>
            <div class="skillbar">
              <span>被驳回的商品：{{ Cgoodnum }}（个）</span>
              <progress class="nes-progress is-error" :value="Cgoodnum" max="100"></progress>
            </div>
          </div>

          <hr />
          <h2>快捷导航</h2>
          <div class="tool">
            <a href="" target="_blank" rel="noopener noreferrer">首页</a>
            <a href="" target="_blank" rel="noopener noreferrer">用户</a>
            <a href="" target="_blank" rel="noopener noreferrer">后台</a>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "User",
  data() {
    return {
      user: {
        username: "",
        email: "",
        token: "",
      }, //用户信息
      isUserReady: false, //用户信息是否加载完毕
      oldtoken: "",
      newtoken: "",
      certification: "",
      avatar: "",
      ko: "",
      question: "",
      status: 0,//充值标签选择状态
      balance: 0, //余额
      thePrice: 10,
      confirm: "",
      crashout: "",
      Agoodnum: 0, //已售商品数量
      Bgoodnum: 0, //审核中商品数量
      Cgoodnum: 0, //被驳回商品数量
      Finished: 0, //已完成订单数量

      list: [
        { price: 10 },
        { price: 20 },
        { price: 30 },
        { price: 50 },
        { price: 100 },
        { price: 300 },
        { price: 500 },
        { price: 1000 },
      ],
    };
  },
  created() {
    this.user = JSON.parse(localStorage.getItem("user"));
    if (this.user == null) {
      alert("您还未登录，为您跳转到登录处");
      this.$router.push({ path: "/login" });
    }

    axios //用户信息
      .get("http://47.115.209.249:8080/user", {
        headers: { satoken: this.user.token },
      })
      .then((res) => {
        this.user = res.data.data;
        localStorage.setItem("userId", JSON.stringify(res.data.data.id));
        if (this.user.certification == true) {
          this.certification = "是";
        } else {
          this.certification = "否";
        } //是否实名认证
      })
      .catch((err) => {
        console.log(err);
      });
    axios //用户余额
      .get("http://47.115.209.249:8080/account", {
        headers: { satoken: this.user.token },
      })
      .then((res) => {
        console.log(res);

        if (res.data.code == 200) this.balance = res.data.data;
        else this.balance = "获取失败";
      })
      .catch((err) => {
        console.log(err);
      });

    axios //已售商品数量
      .get("http://47.115.209.249:8080/user/soldCommodities", {
        headers: { satoken: this.user.token },
      })
      .then((res) => {
        console.log(res);
        this.Agoodnum = res.data.data.length;
      })
      .catch((err) => {
        console.log(err);
      });
    axios //审核中商品数量
      .get("http://47.115.209.249:8080/user/auditingCommodities", {
        headers: { satoken: this.user.token },
      })
      .then((res) => {
        console.log(res);
        this.Bgoodnum = res.data.data.length;
      })
      .catch((err) => {
        console.log(err);
      });
    axios //被驳回商品数量
      .get("http://47.115.209.249:8080/user/failedCommodities", {
        headers: { satoken: this.user.token },
      })
      .then((res) => {
        console.log(res);
        this.Cgoodnum = res.data.data.length;
      })
      .catch((err) => {
        console.log(err);
      });
    axios //已完成订单数量
      .get("http://47.115.209.249:8080/orders/completedList", {
        headers: { satoken: this.user.token },
      })
      .then((res) => {
        console.log(res);
        this.Finished = res.data.data.length;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  watch: {
    user(newValue) {
      if (newValue !== null) {
        this.isUserReady = true;
      } else {
        this.user = JSON.parse(localStorage.getItem("user"));
      }
    },
  },
  methods: {
    // 提现
    withdraw() {
      this.user = JSON.parse(localStorage.getItem("user"));
      if (this.user.balance == 0) {
        alert("您的余额为0，无法提现");
      } else if (this.user.balance < this.crashout) {
        alert("您的余额不足，无法提现");
      } else if (this.crashout == "") {
        alert("请输入提现金额");
      } else {
        var params = new URLSearchParams();
        params.append("money", this.crashout);
        axios
          .post("http://47.115.209.249:8080/account/withdraw", params, {
            headers: {
              satoken: this.user.token,
              "Content-Type": "application/x-www-form-urlencoded",
            },
          })
          .then((res) => {
            console.log(res);
            if (res.data.code == 200) {
              alert(
                "名称：" +
                this.user.username +
                "\n" +
                "提现金额：" +
                this.crashout +
                "\n" +
                "提现成功"
              );
              //刷新页面
              window.location.reload();
            } else {
              alert(res.data.msg);
              //刷新页面
            }
          });
      }
    },
    // 充值
    recharge() {
      this.user = JSON.parse(localStorage.getItem("user"));

      // console.log(this.confirm = parseInt(this.thePrice))
      if (this.user.username == "" || this.user.email == "") {
        alert("请先完善个人信息");
      } else {
        this.confirm = parseInt(this.thePrice);

        axios
          .post(
            "http://47.115.209.249:8080/account/recharge",
            { balance: this.confirm },
            { headers: { satoken: this.user.token } }
          )
          .then((res) => {
            console.log(res);
            if (res.data.code == 200) {
              alert(
                "名称：" +
                this.user.username +
                "\n" +
                "充值的金额为：" +
                this.confirm +
                "元"
              );
              window.location.reload(); //刷新页面
            } else {
              alert("充值失败");
              window.location.reload(); //刷新页面
            }
          });
      }
    },

    //充值
    choicePrice(index, price) {
      this.status = index;
      this.thePrice = price;
    },
    choiceother() {
      this.status = null;
      //当`question`为空时
      if (this.question == "") {
        this.thePrice = 0;
      }
    },
    //退出登录
    loginOut() {
      localStorage.clear("user");
      console.log("退出登录");
      alert("您已退出登录，为您跳转到登录处");
      this.$router.push({ path: "/login" });
      window.location.reload(); //刷新页面
    },
    //头像修改
    picfile(e) {
      // 上传照片

      this.avatar = e.target.files[0];
      /* eslint-disable no-undef */
      alert("上传成功");
    }, //信息修改
    modify() {
      this.user = JSON.parse(localStorage.getItem("user"));
      if (this.avatar != null) {
        let param = new FormData(); // 创建form对象
        param.append("avatar", this.avatar);

        axios
          .put("http://47.115.209.249:8080/user/avatar", param, {
            headers: { satoken: this.user.token },
          })
          .then((res) => {
            alert("修改成功");
            this.$router.push({ path: "/user" });
          })
          .catch((err) => {
            console.log(err);
          });
      }
      if (this.newtoken == "") {
        axios
          .put("http://47.115.209.249:8080/user/username", this.user.username, {
            headers: { satoken: this.user.token },
          })
          .then((res) => {
            alert("修改成功");
          })
          .catch((err) => {
            console.log(err);
          });
      }
      if (this.newtoken != "" && this.oldtoken != "") {
        if (this.user.password == this.oldtoken) {
          var params = new URLSearchParams();
          params.append("oldPassword", this.oldtoken);
          params.append("newPassword", this.newtoken);
          axios
            .put("http://47.115.209.249:8080/user/password", params, {
              headers: { satoken: this.user.token },
            })
            .then((res) => {
              alert("修改成功");
              this.$router.push({ path: "/user" });
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          alert("原密码错误!请重新检查");
        }
      }
    }, //跳转到收藏夹
    gotofavorites() {
      this.$router.push({ path: "/favorites" });
    },
    //跳转到订单列表
    gotoorder() {
      this.$router.push({ path: "/orders" });
    },
    //跳转到商品列表
    gotolist() {
      this.$router.push({ path: "/list" });
    },
  },

  watch: {
    // 如果 `question` 发生改变，这个函数就会运行
    question: function (newQuestion, oldQuestion) {
      //如果第一位数为0时
      if (this.question[0] == "0") {
        this.question = "";
        this.thePrice = 0;
      }
      //如果question为空时
      if (this.question == "") {
        this.thePrice = 0;
      } else {
        this.question = this.question.replace(/\D/g, "");
        this.thePrice = this.question;
       
      }
    },
  },
};
</script>

<style>
.choice {
  width: 100%; /* 将元素的宽度设置为 100% */
  margin-top: 1rem; /* 将元素的顶部边距设置为 1rem */
  margin-bottom: 1rem; /* 将元素的底部边距设置为 1rem */
}

/* 多选选项内文本的样式 */
.choice p {
  font-size: 1.1rem; /* 将文本的字号设置为 1.1rem */
  margin-left: 2%; /* 将文本的左边距设置为 2% */
}

/* 充值选项列表的样式 */
.recharge_hurg ul {
  flex-direction: row; /* 将 flex 容器的方向设置为水平方向 */
  width: 100%; /* 将元素的宽度设置为 100% */
  flex-wrap: wrap; /* 允许 flex 项目换行 */
  display: flex; /* 将元素的 display 属性设置为 flex */
  flex-wrap: wrap; /* 允许 flex 项目换行 */
  justify-content: center; /* 在水平方向上将 flex 项目居中 */
}

/* 选中的充值选项的样式 */
.bechoice {
  background: green !important; /* 将元素的背景颜色设置为绿色 */
  color: white !important; /* 将元素的文本颜色设置为白色 */
}

/* 每个充值选项的样式 */
.recharge_hurg ul li {
  list-style-type: none; /* 去掉列表项的前缀符号 */
  border: 2px solid green; /* 将元素的边框设置为 2px 的绿色实线 */
  width: 29.5%; /* 将元素的宽度设置为 29.5% */
  margin-right: 2%; /* 将元素的右边距设置为 2% */
  border-radius: 0.5rem; /* 将元素的边框圆角设置为 0.5rem */
  height: 2.5rem; /* 将元素的高度设置为 2.5rem */
  text-align: center; /* 将元素内的文本居中 */
  line-height: 2.5rem; /* 将文本的行高设置为 2.5rem */
  margin-bottom: 1rem; /* 将元素的底边距设置为 1rem */
  border: 2px green solid; /* 将元素的边框设置为 2px 的绿色实线 */
  color: green; /* 将元素内的文本颜色设置为绿色 */
}

/* 每个第三个充值选项的样式 */
.recharge_hurg ul li:nth-child(3n) {
  margin-right: 0 !important; /* 将每个第三个充值选项的右边距设置为 0 */
}

/* 充值价格的样式 */
.recharge_hurg_price {
  width: 200px; /* 将元素的宽度设置为 200px */
  text-align: center; /* 将元素内的文本居中 */
  margin: 1.25rem 0; /* 将元素的上下边距设置为 1.25rem */
}

/* 充值价格文本的样式 */
.recharge_hurg_price span {
  color: green; /* 将元素内的文本颜色设置为绿色 */
  font-weight: 600; /* 将文本的字重设置为 600 */
  font-size: 23px; /* 将文本的字号设置为 23px */
}

/* 充值按钮的样式 */
.recharge_btn {
  width: 96%; /* 将元素的宽度设置为 96% */
  background: green; /* 将元素的背景颜色设置为绿色 */
  color: white; /* 将元素的文本颜色设置为白色 */
  height: 2.5rem; /* 将元素的高度设置为 2.5rem */
  border-radius: 0.5rem; /* 将元素的边框圆角设置为 0.5rem */
  text-align: center; /* 将元素内的文本居中 */
  line-height: 2.5rem; /* 将文本的行高设置为 2.5rem */
  font-size: 1.25rem; /* 将文本的字号设置为 1.25rem */
}

/* 充值选项列表中输入框的样式 */
.recharge_hurg ul input {
  list-style-type: none; /* 去掉列表项的前缀符号 */
  width: 100%; /* 将元素的宽度设置为 100% */
  margin-right: 2%; /* 将元素的右边距设置为 2% */
  border-radius: 7px; /* 将元素的边框圆角设置为 7px */
  height: 35px; /* 将元素的高度设置为 35px */
  text-align: center; /* 将元素内的文本居中 */
  line-height: 40px; /* 将文本的行高设置为 40px */
  border-style: none; /* 将元素的边框样式设置为无 */
  text-shadow: none; /* 将元素内的文本阴影设置为无 */
  box-shadow: none; /* 将元素的盒子阴影设置为无 */
  outline: none; /* 去掉选中元素时的边框 */
  color: green; /* 将元素内的文本颜色设置为绿色 */
  font-size: 1.1rem; /* 将文本的字号设置为 1.1rem */
}

/* 充值选项列表中输入框的占位符样式 */
::-webkit-input-placeholder {
  /* WebKit, Blink, Edge */
  color: #aaa; /* 将占位符的颜色设置为灰色 */
}

:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #aaa; /* 将占位符的颜色设置为灰色 */
  opacity: 1; /* 将占位符的透明度设置为 1 */
}

::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #aaa; /* 将占位符的颜色设置为灰色 */
  opacity: 1; /* 将占位符的透明度设置为 1 */
}

:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #aaa; /* 将占位符的颜色设置为灰色 */
}

/* 盒子的样式 */
.box {
  margin-top: 1%; /* 将元素的上边距设置为 1% */
  width: 100%; /* 将元素的宽度设置为 100% */
  height: 100%; /* 将元素的高度设置为 100% */
  background: #fff; /* 将元素的背景颜色设置为白色 */
  border-radius: 10px; /* 将元素的边框圆角设置为 10px */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* 将元素的盒子阴影设置为 0 0 10px 的黑色透明度为 0.1 的阴影 */
  padding: 20px; /* 将元素的内边距设置为 20px */
  box-sizing: border-box; /* 将元素的盒模型设置为 border-box */
  margin-bottom: 20px; /* 将元素的下边距设置为 20px */
}
.avatar {
  border-radius: 50%;

  margin: 0 auto;
  margin-top: 2%;
  margin-bottom: 20px;
}

.tool {
  margin-top: 2%;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.card-widget.card-info {
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.avatar img {
  width: 100px;
  border-radius: 50%;
}

.social-icon:hover {
  color: #00a1ff;
}

.nes-input {
  border-radius: 5px;
  padding: 0 10px;
}

.nes-dialog {
  width: 600px;
  border-radius: 10px;
}

.nes-dialog h1 {
  text-align: center;
}

.nes-btn {
  margin: 0 5px;
}

.nes-btn.is-primary {
  background: #00a1ff;
}

.nes-btn.is-success {
  background: #00e400;
}

.nes-btn.is-warning {
  background: #f7d518;
}

.nes-btn.is-error {
  background: #ff004d;
}
</style>
