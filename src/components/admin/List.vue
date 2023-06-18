<template>
  <div class="box">
    <p class="title">Container.is-dark</p>
    <div class="layout_page" id="content-inner">
      <div class="aside_content" id="aside_content">
        <div class="card-widget card-info">
          <div class="card-content">
            <div class="avatar" style="text-align: center">
              <hr />

              <h2 class="nes-text is-primary">管理员审核列表</h2>

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
          <button class="nes-btn" @click="gotoLast" style="writing-mode:horizontal-tb">
            👈
          </button>
          <div class="nes-select is-error" style="margin-left: auto;">
            <select required id="warning_select" v-model="chosen">
              <option value="" disabled selected hidden>请选择订单类型</option>
              <option value="0">审核成功的商品</option>
              <option value="1">审核失败的商品</option>
              <option value="2">审核中的商品</option>

            </select>
          </div>
          <div class="search bar" style="float: right; position: relative">
            <form>
              <input class="" type="text" v-model="searchString" placeholder="在这输入您要搜索的商品名称..." />
            </form>
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
            <div v-for="article in filteredArticles" :key="article">
              <!--//循环输出数据  -->
              <hr style="text-align: center" />
              <div class="nes-container is-rounded">
                <table border="0">
                  <tr>
                    <td rowspan="2">
                      <div class="col-md-4">
                        <a @click="lookItem(article.id)" class="angled-img"><!--//跳转到详情页 -->
                          <div class="img">
                            <img style="image-rendering: pixelated; size: 200px" v-bind:src="article.images"
                              alt="" /><!--//图片 -->
                          </div>
                        </a>
                      </div>
                    </td>
                  </tr>
                  <td>
                    <ul>
                      <li>
                        <h3>名称：{{ article.commodityName }}</h3>
                      </li>
                      <li>
                        <h3>描述：{{ article.commodityDescribe }}</h3>
                      </li>
                      <li>
                        <h3>价格：{{ article.price }} 元</h3>
                      </li>
                      <li>
                        <h3>状态：{{ article.status }}</h3>
                      </li>
                      <li>
                        <h3>是否被删除：{{ article.isDeleted }}</h3>
                      </li>
                      <li>
                        <h3>发布时间：{{ article.createTime }}</h3>
                      </li>
                      <li>
                        <h3>更新时间：{{ article.updateTime }}</h3>
                      </li>
                      <li>
                        <h3>发布商家：{{ article.createUser }}</h3>
                      </li>
                      <li>
                        <h3>更新商家：{{ article.updateUser }}</h3>
                      </li>
                      <div>
                        <button type="button" class="nes-btn is-primary" @click="lookItem(article.id)">查看商品</button>
                        <button type="button" class="nes-btn is-success" @click="passwork(article.id)">通过审核</button>
                        <button type="button" class="nes-btn is-error" @click="deletework(article.id)">驳回商品</button>
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
      user: {},
      articles: [],
      searchString: "", //搜索
      warning: "该类型商品暂无数据",
      seen: false,
      ifsearch: false,
      chosen: "",
    };
  },

  created: function () {
    this.user = JSON.parse(localStorage.getItem("user"));
    if (this.user == null) {
      alert("您还未登录，为您跳转到登录处");
      this.$router.push({ path: "/login" });
    }
    if (this.user.role == "white") {
      alert("您的权限不足，为您跳转到用户中心");
      this.$router.push({ path: "/user" });
    }

    var list = JSON.parse("[]");
    axios
      .get("http://127.0.0.1:4523/m2/2501124-0-default/73722126", {
        headers: { satoken: this.user.token },
      })
      .then((res) => {
        console.log(res);

        if (res.data.data == null) {
          seen = true;
        } else {
          this.articles = res.data.data;
          console.log(this.articles);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  computed: {
    // 计算数学，匹配搜索
    filteredArticles: function () {
      var articles_array = this.articles,
        searchString = this.searchString;
      if (!searchString) {
        this.seen = false; //默认没有搜索时的提示不可见
        return articles_array;
      }
      searchString = searchString.trim().toLowerCase();

      articles_array = articles_array.filter(function (item) {
        if (item.commodityName.toLowerCase().indexOf(searchString) !== -1) {
          return item;
        }
      });
      var len = articles_array.length;
      if (len == 0) {
        this.seen = true; //没有搜索到结果时的提示可见
      } else {
        this.seen = false; //有搜索到结果时的提示不可见
      }
      // 返回过来后的数组
      return articles_array;
    },
  },
  methods: {
    //跳转到详情页
    lookItem(id) {
      localStorage.setItem('Item', JSON.stringify(id))
      this.$router.push({ path: "/workindex" })
    },
    //驳回商品
    deletework(id) {
      var params = new URLSearchParams();
      params.append("commodityId", id);
      axios
        .put("http://127.0.0.1:4523/m2/2501124-0-default/77180539", params, {
          headers: {
            satoken: this.user.token,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then((res) => {
          console.log(res);
          alert("已驳回商品");
          this.$router.go(0);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //通过审核
    passwork(id) {
      var params = new URLSearchParams();
      params.append("commodityId", id);
      axios
        .put("http://127.0.0.1:4523/m2/2501124-0-default/77180539", params, {
          headers: {
            satoken: this.user.token,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then((res) => {
          console.log(res);
          alert("已通过审核");
          this.$router.go(0);
        })
        .catch((err) => {
          console.log(err);
        });


    },
    //返回上一页
    gotoLast() {
      this.$router.go(-1);
    },
  },
  watch: {
    chosen(val, oldval) {
      if (val == 0) {
        axios.get('http://127.0.0.1:4523/m2/2501124-0-default/75150541', {
          headers: { satoken: this.user.token },
        })
          .then((res) => {
            console.log(res);

            if (res.data.data == null) {
              seen = true;
            } else {
              this.articles = res.data.data.list;

            }
          })
      }
      else if (val == 1) {
        axios.get('http://127.0.0.1:4523/m2/2501124-0-default/75150546', {
          headers: { satoken: this.user.token },
        })
          .then((res) => {
            console.log(res);
            if (res.data.data == null) {
              seen = true;
            } else {
              this.articles = res.data.data.list;

            }
          })
      }
      else if (val == 2) {
        axios.get('http://127.0.0.1:4523/m2/2501124-0-default/75150552'
          , {
            headers: { satoken: this.user.token },
          })
          .then((res) => {
            console.log(res);
            if (res.data.data == null) {
              seen = true;
            } else {
              this.articles = res.data.data.list;

            }
          })
      }


    }
  }
};
</script>
  
<style>
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

.tool select {
  border-radius: 5px;
  color: #000;
  font-size: 14px;
  font-weight: bold;
  padding-left: 5px;
  padding-right: 5px;
  background-color: transparent;
  transition: 0.3s linear;
  float: right;



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