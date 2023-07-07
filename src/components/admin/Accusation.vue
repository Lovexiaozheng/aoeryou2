<template>
  <div class="box">
    <p class="title">Container.is-dark</p>
    <div class="layout_page" id="content-inner">
      <div class="aside_content" id="aside_content">
        <div class="card-widget card-info">
          <div class="card-content">
            <div class="avatar" style="text-align: center">
              <hr />

              <h2 class="nes-text is-primary">信息举报列表</h2>

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
          <button class="nes-btn" @click="gotoLast" style="writing-mode: horizontal-tb">
            👈
          </button>
          <div class="nes-select is-error" style="margin-left: auto">
            <select required id="warning_select" v-model="chosen">
              <option value="" disabled selected hidden>请选择举报类型</option>
              <option value="1">被举报的商品</option>
              <option value="0">被举报的商家</option>
            </select>
          </div>
          <div class="search bar" style="float: right; position: relative">
            <form>
              <input class="" type="text" v-model="searchString" placeholder="在这输入您要搜索的商品/商家名称" />
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
            <div v-for="(article, index) in filteredArticles" :key="article.id">
              <!--//循环输出数据  -->
              <hr style="text-align: center" />
              <div class="nes-container is-rounded">
                <table border="0">
                  <tr>
                    <td rowspan="2">
                      <div class="col-md-4">
                        <a @click="lookItem(article.commodityId)" class="angled-img"><!--//跳转到详情页 -->
                          <div class="img">
                            <img style="image-rendering: pixelated; size: 200px" v-bind:src="imageArray[index]" :style="{
                              width: '400px',
                              height: '400px',
                              objectFit: 'cover',
                            }" alt="imageArray[index]" /><!--//图片 -->
                          </div>
                        </a>
                      </div>
                    </td>
                  </tr>
                  <td>
                    <ul>
                      <li>
                        <h3>投诉ID：{{ article.id }}</h3>
                      </li>
                      <li>
                        <h3>被投诉ID：{{ article.complainedId }}</h3>
                      </li>
                      <li>
                        <h3>商品ID：{{ article.commodityId }}</h3>
                      </li>
                      <li>
                        <h3>原因：{{ article.reason }}</h3>
                      </li>
                      <li>
                        <h3>状态：{{ article.status }}</h3>
                      </li>
                      <li>
                        <h3>发布时间：{{ article.createTime }}</h3>
                      </li>
                      <li>
                        <h3>更新时间：{{ article.updateTime }}</h3>
                      </li>
                      <li>
                        <h3>发布用户：{{ article.createUser }}</h3>
                      </li>
                      <li>
                        <h3>更新用户：{{ article.updateUser }}</h3>
                      </li>
                      <div>
                        <button type="button" class="nes-btn is-primary" @click="BackItem(article.id)">
                          被找回处理
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
      articles: [],
      searchString: "", //搜索
      warning: "该类型暂无数据，请选择其他类型", //搜索提示
      seen: true,
      ifsearch: false,
      chosen: -1,
      imageArray: [], //图片数组
      user: JSON.parse(localStorage.getItem("user")),
    };
  },

  created: function () {
    this.user = JSON.parse(localStorage.getItem("user"));
    axios
      .get("http://47.115.209.249:8080/user", {
        headers: { satoken: this.user.token },
      })
      .then((res) => {
        if (res.data.data.role == "admin") {
        } else {
          alert("您的权限不足，为您跳转到用户中心");
          this.$router.push({ path: "/user" });
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
        if (this.chosen != -1) {
          this.seen = false; //默认没有搜索时的提示不可见
          return articles_array;
        } else {
          this.seen = true; //默认没有搜索时的提示可见
          return articles_array;
        }
      }

      searchString = searchString.trim().toLowerCase();

      articles_array = articles_array.filter(function (item) {
        if (item.reason.toLowerCase().indexOf(searchString) !== -1) {
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
    //获取订单商品的图片
    getimage(id) {
      return new Promise(async (resolve, reject) => {
        try {
          const params = new URLSearchParams();
          params.append("id", id);
          let response;

          if (this.chosen == 0) {
            //被举报商家的头像
            response = await fetch(
              `http://47.115.209.249:8080/user/userId?userId=${id}`,
              {
                headers: {
                  satoken: this.user.token,
                },
              }
            );
            const data = await response.json();
            resolve(data.data.avatar);
          } else {
            //被举报商品的图片
            response = await fetch(
              `http://47.115.209.249:8080/commodity/id?id=${id}`,
              {
                headers: {
                  satoken: this.user.token,
                },
              }
            );
            const data = await response.json();
            resolve(data.data.images);
          }
        } catch (err) {
          reject(err);
        }
      });
    },
    //导入订单商品的图片
    async loadImage(id) {
      try {
        const images = await this.getimage(id);
        this.imageArray.push(images);
        console.log(this.imageArray);
      } catch (error) {
        console.error(error);
      }
    },

    //被找回处理
    BackItem(id) {
      var params = new URLSearchParams();
      params.append("complainedId", id);
      axios
        .post("http://47.115.209.249:8080/admin/sellerWithdraw", params, {
          headers: {
            satoken: this.user.token,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then((res) => {
          if (res.data.code == 200) {
            alert(res.data.msg);
            this.$router.go(0);
          } else {
            alert(res.data.msg);
          }
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
        var params = new URLSearchParams();
        params.append("type", 0);
        axios
          .get("http://47.115.209.249:8080/admin/complainedList", {
            headers: { satoken: this.user.token },

            params: {
              currentPage: "", // 默认为空
              pageSize: "", // 默认为空
              type: 0, // 默认为空
            },
          })
          .then((res) => {
            console.log(res);

            if (res.data.data == null) {
              seen = true;
            } else {
              this.articles = res.data.data.list;
              this.imageArray = [];

              for (let i = 0; i < this.articles.length; i++) {
                this.loadImage(this.articles[i].userId);
              }
            }
          });
      } else if (val == 1) {
        var params = new URLSearchParams();
        params.append("type", 1);
        axios
          .get("http://47.115.209.249:8080/admin/complainedList", {
            headers: { satoken: this.user.token },

            params: {
              currentPage: "", // 默认为空
              pageSize: "", // 默认为空
              type: 1, // 默认为空
            },
          })
          .then((res) => {
            console.log(res);
            if (res.data.data == null) {
              seen = true;
            } else {
              this.articles = res.data.data.list;
              this.imageArray = [];
              for (let i = 0; i < this.articles.length; i++) {
                this.loadImage(this.articles[i].commodityId);
              }
              console.log(this.articles);
            }
          });
      }
    },
  },
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
