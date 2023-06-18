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
                <img class="nes-avatar is-rounded is-large" style="image-rendering: pixelated"
                  src="https://www.iculture.cc/icon/logo.png" alt="avatar" />
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
          <button type="button" class="nes-btn is-primary" @click="gotolist">商品列表</button>
          <button type="button" class="nes-btn is-success" @click="gotoorder">订单列表</button>
          <button type="button" class="nes-btn is-warning" @click="gotofavorites">收藏列表</button>
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
                      src="https://www.iculture.cc/icon/logo.png" alt="avatar" />
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
            当前余额:{{ user.balance }}
            <span class="nes-text is-primary" onclick="document.getElementById('dialog-chongzhi').showModal();"><u>
                充值</u></span>
            <span class="nes-text is-success" onclick="document.getElementById('dialog-tixian').showModal();"><u>
                提现</u></span>
          </div>

          <div class="webinfo-site-name">总销售额:</div>
          <span>是否已完成实名认证：{{ user.certification }}</span>
        </div>
      </div>

      <article id="page">
        <div class="article-container">
          <hr />
          <h2>交易记录</h2>
          <div class="skillbox">
            <div class="skillbar">
              <span>总共发布商品： （几件） </span>
              <progress class="nes-progress is-primary" value="80" max="100"></progress>
            </div>
            <div class="skillbar">
              <span>总共已售商品： （几件） </span>
              <progress class="nes-progress is-success" value="50" max="100"></progress>
            </div>
            <div class="skillbar">
              <span>正在审核的商品： （几个） </span>
              <progress class="nes-progress is-warning" value="30" max="100"></progress>
            </div>
            <div class="skillbar">
              <span>被驳回的商品： （几个） </span>
              <progress class="nes-progress is-error" value="10" max="100"></progress>
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
      user: {},
      oldtoken: "",
      newtoken: "",
      certification: "",
      avatar: "",
      ko: "",
      question: "",
      status: 0,
      thePrice: 10,
      confirm: "",
      crashout: "",
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
  created: function () {
    this.user = JSON.parse(localStorage.getItem("user"));
    if (this.user == null) {
      alert("您还未登录，为您跳转到登录处");
      this.$router.push({ path: "/login" });
    }
    axios
      .get("http://127.0.0.1:4523/m2/2501124-0-default/73413005", {
        headers: { satoken: this.user.token },
      })
      .then((res) => {
        console.log(res);
        this.user = res.data.data;
        if (this.user.certification == true) {
          this.certification = "是";
        } else {
          this.certification = "否";
        } //是否实名认证
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {

    // 提现
    withdraw() {
      if (this.user.balance == 0) {
        alert("您的余额为0，无法提现");
      } else if (this.user.balance < this.crashout) {
        alert("您的余额不足，无法提现");
      } else if (this.crashout == "") {
        alert("请输入提现金额");
      } else {
        var params = new URLSearchParams();
        params.append("balance", this.crashout);
        axios
          .post("http://127.0.0.1:4523/m2/2501124-0-default/77179271", params, {
            headers: { satoken: this.user.token },
          })
          .then((res) => {
            console.log(res);
            if (res.status == 200)
              alert(
                "名称：" +
                this.user.username +
                "\n" +
                "邮箱：" +
                this.user.email +
                "\n" +
                "提现金额：" +
                this.crashout +
                "\n" +
                "提现成功"
              );
            else alert("提现失败");
          });
      }
    },
    // 充值
    recharge() {
      // console.log(this.confirm = parseInt(this.thePrice))
      if (this.user.username == "" || this.user.email == "") {
        alert("请先完善个人信息");
      } else {
        this.confirm = parseInt(this.thePrice);
        var params = new URLSearchParams();
        params.append("balance", this.confirm);
        axios
          .post("http://127.0.0.1:4523/m2/2501124-0-default/77144428", params, {
            headers: { satoken: this.user.token },
          })
          .then((res) => {
            console.log(res);
            if (res.status == 200)
              alert(
                "名称：" +
                this.user.username +
                "\n" +
                "邮箱：" +
                this.user.email +
                "\n" +
                "充值的金额为：" +
                this.confirm +
                "元"
              );
            else alert("充值失败");
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
    },
    //头像修改
    picfile(e) {
      // 上传照片
      let self = this;
      this.avatar = e.target.files[0];
      /* eslint-disable no-undef */
      alert("上传成功");
      console.log(this.avatar);
    }, //信息修改
    modify() {
      if (this.newtoken == "") {
        axios
          .put(
            "http://127.0.0.1:4523/m2/2501124-0-default/73413614",
            this.user.username,
            { headers: { satoken: this.user.token } }
          )
          .then((res) => {
            alert("修改成功");
            this.$router.push({ path: "/user" });
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
            .put(
              "http://127.0.0.1:4523/m2/2501124-0-default/73414390",
              params,
              { headers: { satoken: this.user.token } }
            )
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
      if (this.avatar != "") {
        let param = new FormData(); // 创建form对象
        params.append("avatar", this.avatar);
        console.log(param.get("avatar")); // FormData私有类对象，访问不到，可以通过get判断值是否传进去
        axios
          .put("http://127.0.0.1:4523/m2/2501124-0-default/73413417", params, {
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
    },//跳转到收藏夹
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
        console.log(this.question[0]);
        this.question = "";
        this.thePrice = 0;
      }
      //如果question为空时
      if (this.question == "") {
        this.thePrice = 0;
      } else {
        this.thePrice = this.question;
        this.question = this.question.replace(/\D/g, "");
      }
    },
  },
};
</script>

<style>
.choice {
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.choice p {
  font-size: 1.1rem;
  margin-left: 2%;
}

.recharge_hurg ul {
  flex-direction: row;
  width: 100%;
  flex-wrap: wrap;
  display: flex;
  flex-wrap: wrap;
  
  justify-content: center;
}

.bechoice {
  background: green !important;
  color: white !important;
}

.recharge_hurg ul li {
  list-style-type: none;
  border: 2px solid green;
 
  width: 29.5%;
  margin-right: 2%;
  border-radius: 0.5rem;
  height: 2.5rem;
  text-align: center;
  line-height: 2.5rem;
  margin-bottom: 1rem;
  border: 2px green solid;
  color: green;
}

.recharge_hurg ul li:nth-child(3n) {
  margin-right: 0 !important;
}

.recharge_hurg_price {
  width: 200px; /* 设置一个固定宽度 */
  text-align: center;
  margin: 1.25rem 0;
}

.recharge_hurg_price span {
  color: green;
  font-weight: 600;
  font-size: 23px;
}

.recharge_btn {
  width: 96%;
  background: green;
  color: white;
  height: 2.5rem;
  border-radius: 0.5rem;
  text-align: center;
  line-height: 2.5rem;
  font-size: 1.25rem;
}

.recharge_hurg ul input {
  list-style-type: none;
  width: 100%;
  margin-right: 2%;
  border-radius: 7px;
  height: 35px;
  text-align: center;
  line-height: 40px;
  border-style: none;
  text-shadow: none;

  box-shadow: none;
  outline: none;
  color: green;
  font-size: 1.1rem;
}

::-webkit-input-placeholder {
  /* WebKit, Blink, Edge */
  color: #aaa;
}

:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #aaa;
  opacity: 1;
}

::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #aaa;
  opacity: 1;
}

:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #aaa;
}

.box {
  margin-top: 1%;
  width: 100%;
  height: 100%;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  box-sizing: border-box;
  margin-bottom: 20px;
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
</style>