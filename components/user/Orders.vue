<template>
  <div class="box">
    <p class="title">Container.is-dark</p>
    <div class="layout_page" id="content-inner">
      <div class="aside_content" id="aside_content">
        <div class="card-widget card-info">
          <div class="card-content">
            <div class="avatar" style="text-align: center">
              <hr />

              <h2 class="nes-text is-primary">用户订单列表</h2>

              <hr />
            </div>
            <div class="card-info-social-icons is-center">
              <a class="social-icon" href="#" target="_blank">
                <i class="fa fa-github"></i>
              </a>
            </div>
          </div>
        </div>

        <div class="tool">


          <div class="nes-select is-warning" style="margin-left: auto;">
            <select required id="warning_select" v-model="chosen">
              <option value="" disabled selected hidden>请选择订单类型</option>
              <option value="0">未支付订单</option>
              <option value="1">已取消订单</option>
              <option value="2">已支付订单</option>
              <option value="3">已完成订单</option>
              <option value="4">买家付款订单</option>
            </select>
          </div>
        </div>

        <ul>
          <p v-if="seen" style="
              color: rgb(255, 0, 174);
              font-size: 30px;
              font-weight: bold;
              text-align: center;
            ">
            {{ warning }}
          </p>
          <!--//判断搜索是否有数据后返回提示  -->
          <div class="col-md-9">
            <!-- 循环输出数据 -->
            <div v-for="(article, index) in articles" :key="article.id">
              <!--//循环输出数据  -->
              <hr />
              <div class="nes-container is-rounded">
                <table border="0">
                  <tr>
                    <td rowspan="2">
                      <div class="col-md-4">
                        <a @click="lookItem(article.id)" class="angled-img"><!--//跳转到详情页 -->
                          <div >
                            <img style="image-rendering: pixelated; size: 200px"
                              v-bind:src=imageArray[index] alt=imageArray[index]  />
                          </div>
                        </a>
                      </div>
                    </td>
                  </tr>
                  <td>
                    <ul>
                      <li>
                        <h3>订单ID：{{ article.id }}</h3>
                      </li>
                      <li>
                        <h3>商品ID：{{ article.commodityId }}</h3>
                      </li>
                      <li>
                        <h3>买家ID：{{ article.buyerId }}</h3>
                      </li>
                      <li>
                        <h3>状态：{{ article.status }}</h3>
                      </li>
                      <li>
                        <h3>下单时间：{{ article.orderTime }}</h3>
                      </li>
                      <li>
                        <h3>下单金额：{{ article.amount }} 元</h3>
                      </li>
                      <div>
                        <h3>图片地址：{{imageArray[index]}}</h3>
                      </div>
                      <div v-if="chosen == 0">
                        <button type="button" class="nes-btn is-success" @click="PayItem(article.id)">
                          支付订单
                        </button>
                        <button type="button" class="nes-btn is-warning" @click="DeleteItem(article.id)">
                          取消订单
                        </button>
                        <button type="button" class="nes-btn" @click="refreshPage()">
                          刷新页面
                        </button>
                      </div>
                      <div v-if="chosen == 2">
                        <button type="button" class="nes-btn is-primary" @click="TalkSeller(article.id)">
                          联系卖家
                        </button>
                        <button type="button" class="nes-btn is-warning" @click="DeleteItem(article.id)">
                          取消订单
                        </button>
                        <button type="button" class="nes-btn" @click="refreshPage()">
                          刷新页面
                        </button>
                      </div>
                      <div v-if="chosen == 3">
                        <button type="button" class="nes-btn is-primary" @click="FinishItem(article.id)">
                          确认订单
                        </button>
                        <button type="button" class="nes-btn is-warning" @click="BackItem(article.id)">
                          申请退货
                        </button>
                        <button type="button" class="nes-btn" @click="refreshPage()">
                          刷新页面
                        </button>
                      </div>
                      <div v-if="chosen == 4">
                        <button type="button" class="nes-btn is-primary"
                          onclick="document.getElementById('dialog-fahuo').showModal();">
                          点此发货
                        </button>
                        <dialog class="nes-dialog" id="dialog-fahuo">
                          <form method="dialog">
                            <h1 style="text-align: center">卖家发货</h1>
                            <div class="nes-field">
                              <label for="name_field">游戏账号：</label>
                              <input type="text" id="name_field" class="nes-input is-primary" v-model="gameAccount" />
                            </div>
                            <div class="nes-field">
                              <label for="inline_field">游戏密码：</label>
                              <input type="text" id="inline_field" class="nes-input" v-model="gamePassword" />
                            </div>
                            <div class="nes-field">
                              <label for="inline_field">留言备注：</label>
                              <input type="text" id="inline_field" class="nes-input is-success" v-model="remark"
                                placeholder="备注（游戏名、游戏区服等）" />
                            </div>



                            <menu class="dialog-menu">
                              <button class="nes-btn">返回</button>
                              <button class="nes-btn is-primary" @click="finishOrder(article.id)">
                                确认发货
                              </button>
                            </menu>
                          </form>
                        </dialog>
                        <button type="button" class="nes-btn" @click="refreshPage()">
                          刷新页面
                        </button>
                      </div>
                    </ul>
                  </td>
                  <tr>
                    <td></td>
                  </tr>
                </table>
              </div>
            </div>
            <!-- /循环输出数据 -->
            <br />
          </div>

          <!-- /创建美化样式盒子 -->
        </ul>
      </div>
    </div>
  </div>
</template>
  
  
<script>
import axios from "axios";

export default {
  name: "User",
  data() {
    return {
      url:"https://dummyimage.com/400x400",
      chosen: "",//选择的订单类型
      user: {},
      articles: [

      ],
      searchString: "", //搜索
      warning: "该订单类型无数据,请重新选择订单类型",
      seen: true,
      ifsearch: false,
      gameAccount: "",
      gamePassword: "",
      remark: "",
      imageArray : [],

    };
  },

  created: function () {
    this.user = JSON.parse(localStorage.getItem("user"));
    if (this.user == null) {
      alert("您还未登录，为您跳转到登录处");
      this.$router.push({ path: "/login" });
    }


  },
  methods: {

    //返回用户中心
    returnUserCenter() {
      this.$router.push({ path: "/user" });
    },
    //跳转到详情页

    lookItem(id) {
      this.$router.push({ path: "/item/" + id });
    },
  getimage(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const params = new URLSearchParams();
      params.append("id", id);
      const response = await fetch(`http://127.0.0.1:4523/m2/2501124-0-default/73411096?id=${id}`, {
        headers: {
          satoken: this.user.token,
        },
      });
     
        const data = await response.json();
       
        resolve(data.data.images);
     
    }
    catch (err) {
      reject(err);
    }
  });
},
async loadImage(id) {
  try {
    const images = await this.getimage(id);
    
      this.imageArray.push(images);
      console.log(this.imageArray);
  } catch (error) {
    console.error(error);
  }
},
     /* 
     
    /* axios
        .get("http://127.0.0.1:4523/m2/2501124-0-default/73411096", params, {
          headers: { satoken: this.user.token },
        })
        .then((res) => {
          console.log(res.data.data.images);
          if (res.data.data.images == null) {
          
            return "";
          } else {  
            var url = res.data.data.images;
            var img= require(url);
            console.log("meww "+img);
            return img;

          }

        }
        );*/
   
    //支付订单
    PayItem(id) {
      var params = new URLSearchParams();
      params.append("orderId", id);
      axios
        .post("http://127.0.0.1:4523/m1/2501124-0-default/orders/payBill", params, {
          headers: { satoken: this.user.token },
        })
        .then((res) => {
          console.log(res);
          if (res.data.code == 200) {
            alert("支付成功");
            this.refreshPage();
          } else {
            alert("支付失败");
          }
        });
      //

    },
    //取消订单
    DeleteItem(id) {
      var params = new URLSearchParams();
      params.append("id", id);
      axios
        .post("http://127.0.0.1:4523/m1/2501124-0-default/orders/cancel", params, {
          headers: { satoken: this.user.token },
        })
        .then((res) => {
          console.log(res);
          if (res.data.code == 200) {
            alert("取消成功");
            this.refreshPage();
          } else {
            alert("取消失败");
          }
        });
    },
    //确认订单
    FinishItem(id) {
      var params = new URLSearchParams();
      params.append("orderId", id);
      axios
        .post("http://127.0.0.1:4523/m1/2501124-0-default/orders/confirmOrder", params, {
          headers: { satoken: this.user.token },
        })
        .then((res) => {
          console.log(res);
          if (res.data.code == 200) {
            alert("确认成功");
            this.refreshPage();
          } else {
            alert("确认失败");
          }
        });
    },
    //申请退货
    BackItem(id) {
      var params = new URLSearchParams();
      params.append("orderId", id);
      axios
        .post("http://127.0.0.1:4523/m1/2501124-0-default/orders/getBack", params, {
          headers: { satoken: this.user.token },
        })
        .then((res) => {
          console.log(res);
          if (res.data.code == 200) {
            alert("申请成功");
            this.refreshPage();
          } else {
            alert("申请失败");
          }
        });
    },
    //确认发货
    finishOrder(id) {
      var params = new URLSearchParams();
      params.append("orderId", id);
      params.append("gameAccount", this.gameAccount);
      params.append("gamePassword", this.gamePassword);
      params.append("remark", this.remark);
      axios
        .post("http://127.0.0.1:4523/m1/2501124-0-default/orders/finishOrder", params, {
          headers: { satoken: this.user.token },
        })
        .then((res) => {
          console.log(res);
          if (res.data.code == 200) {
            alert("发货成功");
            this.refreshPage();
          } else {
            alert("发货失败");
          }
        });
    },

    //刷新页面
    refreshPage() {
      window.location.reload();
    },
  },

  watch: {
    chosen(val, oldval) {
      if (val == 0) {
        axios.get('http://127.0.0.1:4523/m2/2501124-0-default/74153153', {
          headers: { satoken: this.user.token },
        })
          .then((res) => {
            console.log(res);

            if (res.data.data == null) {
              this.seen = true;
            } else {
              this.seen = false;
              this.articles = res.data.data;
            this.imageArray = [];
              
         for (let i = 0; i < this.articles.length; i++) {
                this.loadImage(this.articles[i].commodityId);
              }

            }
          })
      }
      else if (val == 1) {
        axios.get('http://127.0.0.1:4523/m2/2501124-0-default/74153684', {
          headers: { satoken: this.user.token },
        })
          .then((res) => {
            console.log(res);
            if (res.data.data == null) {
              this.seen = true;
            } else {
              this.seen = false;
              this.articles = res.data.data;
              this.imageArray = [];
              
              for (let i = 0; i < this.articles.length; i++) {
                     this.loadImage(this.articles[i].commodityId);
                   }
            }
          })
      }
      else if (val == 2) {
        axios.get('http://127.0.0.1:4523/m2/2501124-0-default/74153766'
          , {
            headers: { satoken: this.user.token },
          })
          .then((res) => {
            console.log(res);
            if (res.data.data == null) {
              this.seen = true;
            } else {
              this.seen = false;
              this.articles = res.data.data;
              this.imageArray = [];
              
              for (let i = 0; i < this.articles.length; i++) {
                     this.loadImage(this.articles[i].commodityId);
                   }
            }
          })
      }
      else if (val == 3) {
        axios.get('http://127.0.0.1:4523/m2/2501124-0-default/74153774', {
          headers: { satoken: this.user.token },
        })
          .then((res) => {
            console.log(res);
            if (res.data.data == null) {
              this.seen = true;
            } else {
              this.seen = false;
              this.articles = res.data.data;
              this.imageArray = [];
              
              for (let i = 0; i < this.articles.length; i++) {
                     this.loadImage(this.articles[i].commodityId);
                   }
            }
          })
      }
      else if (val == 4) {
        axios.get('http://127.0.0.1:4523/m1/2501124-0-default/orders/paidOrder', {
          headers: { satoken: this.user.token },
        })
          .then((res) => {
            console.log(res);
            if (res.data.data == null) {
              this.seen = true;
            } else {
              this.seen = false;
              this.articles = res.data.data;
              this.imageArray = [];
              
              for (let i = 0; i < this.articles.length; i++) {
                     this.loadImage(this.articles[i].commodityId);
                   }
            }
          })


      }
    }
  }

};
</script>
  
<style scoped >
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

/*搜索框*/

.bar form {
  height: 42px;
}

.bar input {
  width: 250px;
  height: 50px;
  border-radius: 42px;
  border: 2px solid #181399;
  color: rgb(255, 0, 174);
  font-size: 15px;
  font-weight: bold;
  background-color: transparent;
  transition: 0.3s linear;
  float: right;
}

.bar input:focus {
  width: 300px;
}

.bar input::-webkit-input-placeholder {
  color: rgb(0, 255, 187);
  font-size: 15px;
  font-weight: bold;
}

.bar button {
  background: none;
  top: -2px;
  right: 0;
}

.bar button:before {
  content: "\f002";
  font-family: FontAwesome;
  color: #3b324e9d;
}
</style>