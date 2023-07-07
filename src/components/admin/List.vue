<template>
  <div class="box">
    <p class="title">Container.is-dark</p>
    <div class="layout_page" id="content-inner">
      <div class="aside_content" id="aside_content">
        <!-- 信息卡片组件 -->
        <div class="card-widget card-info">
          <div class="card-content">
            <!-- 头像区域 -->
            <div class="avatar" style="text-align: center">
              <hr />

              <!-- 主标题文字 -->
              <h2 class="nes-text is-primary">管理员审核列表</h2>

              <hr />
            </div>
            <!-- 社交图标区域 -->
            <div class="card-info-social-icons is-center">
              <a class="social-icon" href="#" target="_blank">
                <i class="fa fa-github"></i>
              </a>
            </div>
          </div>
        </div>

        <!-- 工具栏 -->
        <div class="tool">
          <!-- 向左翻页按钮 -->
          <button class="nes-btn" @click="gotoLast" style="writing-mode: horizontal-tb">
            👈
          </button>
          <!-- 选择订单类型下拉框 -->
          <div class="nes-select is-error" style="margin-left: auto">
            <select required id="warning_select" v-model="chosen">
              <option value="" disabled selected hidden>请选择订单类型</option>
              <option value="0">审核成功的商品</option>
              <option value="1">审核失败的商品</option>
              <option value="2">审核中的商品</option>
            </select>
          </div>
          <!-- 搜索栏 -->
          <div class="search bar" style="float: right; position: relative">
            <form>
              <input class="" type="text" v-model="searchString" placeholder="在这输入您要搜索的商品名称..." />
            </form>
          </div>
        </div>

        <!-- 商品列表 -->
        <ul>
          <!-- 搜索结果为空时的提示 -->
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
            <div v-for="article in filteredArticles" :key="article.id">
              <!--//循环输出数据  -->
              <hr style="text-align: center" />
              <div class="nes-container is-rounded">
                <table border="0">
                  <tr>
                    <td rowspan="2">
                      <div class="col-md-4">
                        <!-- 商品图片链接 -->
                        <a @click="lookItem(article.id)" class="angled-img"><!--//跳转到详情页 -->
                          <div class="img">
                            <img style="image-rendering: pixelated; size: 200px" v-bind:src="article.images" :style="{
                              width: '400px',
                              height: '400px',
                              objectFit: 'cover',
                            }" alt="" /><!--//图片 -->
                          </div>
                        </a>
                      </div>
                    </td>
                  </tr>
                  <td>
                    <ul>
                      <!-- 商品名称 -->
                      <li>
                        <h3>名称：{{ article.commodityName }}</h3>
                      </li>
                      <!-- 商品描述 -->
                      <li>
                        <h3>描述：{{ article.commodityDescribe }}</h3>
                      </li>
                      <!-- 商品价格 -->
                      <li>
                        <h3>价格：{{ article.price }} 元</h3>
                      </li>
                      <!-- 商品状态 -->
                      <li>
                        <h3>
                          状态：
                          <span v-bind:style="statusStyle(article.status)">
                            {{ statusText(article.status) }}
                          </span>
                        </h3>
                      </li>
                      <!-- 商品是否被删除 -->
                      <li>
                        <h3>是否被删除：{{ article.isDeleted }}</h3>
                      </li>
                      <!-- 商品发布时间 -->
                      <li>
                        <h3>发布时间：{{ article.createTime }}</h3>
                      </li>
                      <!-- 商品更新时间 -->
                      <li>
                        <h3>更新时间：{{ article.updateTime }}</h3>
                      </li>
                      <!-- 商品发布商家 -->
                      <li>
                        <h3>发布商家：{{ article.createUser }}</h3>
                      </li>
                     <!-- 商品更新商家 -->
                      <li>
                        <h3>更新商家：{{ article.updateUser }}</h3>
                      </li>
                      <div>
                        <!-- 查看商品按钮 -->
                        <button type="button" class="nes-btn is-primary" @click="lookItem(article.id)">
                          查看商品
                        </button>
                        <!-- 通过审核按钮 -->
                        <button type="button" class="nes-btn is-success" @click="passwork(article.id)">
                          通过审核
                        </button>
                        <!-- 驳回商品按钮 -->
                        <button type="button" class="nes-btn is-error" @click="deletework(article.id)">
                          驳回商品
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

    axios
      .get("http://47.115.209.249:8080/admin/pageCheck", {
        headers: { satoken: this.user.token },
        params: {
          currentPage: "", // 默认为空
          pageSize: "", // 默认为空
          commodityKey: "", // 默认为空
        },
      })
      .then((res) => {
        console.log(res);

        if (res.data.data == null) {
          seen = true;
        } else {
          this.articles = res.data.data.list;
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
    statusText(status) {
      //商品状态文字
      return status === 0
        ? "正在审核"
        : status === 1
          ? "审核成功"
          : status === 2
            ? "审核失败"
            : "";
    },
    statusStyle(status) {
      //商品状态样式
      if (status === 0) {
        return { color: "yellow" };
      } else if (status === 1) {
        return { color: "green" };
      } else if (status === 2) {
        return { color: "red" };
      }
    },
    //跳转到详情页
    lookItem(id) {
      localStorage.setItem("Item", JSON.stringify(id));
      this.$router.push({ path: "/workindex" });
    },
    //驳回商品
    deletework(id) {
      var params = new URLSearchParams();
      params.append("commodityId", id);
      axios
        .put(
          "http://47.115.209.249:8080/admin/noPass?commodityId=" + id,
          null,
          {
            headers: {
              satoken: this.user.token,
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
        .then((res) => {
          if (res.data.code == 200) {
            alert("已驳回商品");
            this.$router.go(0);
          } else {
            alert("驳回失败");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //通过审核
    passwork(id) {
      var params = new URLSearchParams();
      params.append("commodityId", id.toString());
      axios
        .put("http://47.115.209.249:8080/admin/pass?commodityId=" + id, null, {
          headers: { satoken: this.user.token },
          "Content-Type": "application/x-www-form-urlencoded",
        })
        .then((res) => {
          if (res.data.code == 200) {
            alert("已通过审核");
            this.$router.go(0);
          } else {
            alert("通过失败");
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
        axios
          .get("http://47.115.209.249:8080/admin/pagePass", {
            headers: { satoken: this.user.token },
            params: {
              currentPage: "", // 默认为空
              pageSize: "", // 默认为空
              commodityKey: "", // 默认为空
            },
          })
          .then((res) => {
            console.log(res);

            if (res.data.data == null) {
              seen = true;
            } else {
              this.articles = res.data.data.list;
            }
          });
      } else if (val == 1) {
        axios
          .get("http://47.115.209.249:8080/admin/pageNoPass", {
            headers: { satoken: this.user.token },
            params: {
              currentPage: "", // 默认为空
              pageSize: "", // 默认为空
              commodityKey: "", // 默认为空
            },
          })
          .then((res) => {
            console.log(res);
            if (res.data.data == null) {
              seen = true;
            } else {
              this.articles = res.data.data.list;
            }
          });
      } else if (val == 2) {
        axios
          .get("http://47.115.209.249:8080/admin/pageCheck", {
            headers: { satoken: this.user.token },
            params: {
              currentPage: "", // 默认为空
              pageSize: "", // 默认为空
              commodityKey: "", // 默认为空
            },
          })
          .then((res) => {
            console.log(res);
            if (res.data.data == null) {
              seen = true;
            } else {
              this.articles = res.data.data.list;
            }
          });
      }
    },
  },
};
</script>

<style>

/* 容器样式 */
.box {
  margin-top: 1%;          /* 上外边距 */
  width: 100%;             /* 宽度 */
  height: 100%;            /* 高度 */
  background: #fff;        /* 背景色 */
  border-radius: 10px;     /* 圆角边框 */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);  /* 盒子阴影 */
  padding: 20px;           /* 内边距 */
  box-sizing: border-box;  /* 设置盒子尺寸计算方法 */
  margin-bottom: 20px;     /* 下外边距 */
}

/* 头像样式 */
.avatar {
  border-radius: 50%;      /* 边框圆角 */
  margin: 0 auto;          /* 水平居中 */
  margin-top: 2%;          /* 上外边距 */
  margin-bottom: 20px;     /* 下外边距 */
}

/* 工具栏样式 */
.tool {
  margin-top: 2%;          /* 上外边距 */
  margin-bottom: 20px;     /* 下外边距 */
  display: flex;           /* 使用 Flexbox 布局 */
  align-items: center;     /* 垂直居中对齐 */
  justify-content: space-around;  /* 子元素之间平均分配空间 */
}

/* 工具栏的下拉选择框样式 */
.tool select {
  border-radius: 5px;      /* 边框圆角 */
  color: #000;             /* 文字颜色 */
  font-size: 14px;         /* 字体大小 */
  font-weight: bold;       /* 字体粗细 */
  padding-left: 5px;       /* 左内边距 */
  padding-right: 5px;      /* 右内边距 */
  background-color: transparent;  /* 背景色透明 */
  transition: 0.3s linear; /* 过渡效果 */
  float: right;            /* 向右浮动 */
}

/* 搜索框样式 */
.bar form {
  height: 42px;            /* 高度 */
}

.bar input {
  width: 250px;            /* 宽度 */
  height: 50px;            /* 高度 */
  border-radius: 42px;     /* 边框圆角 */
  border: 2px solid #181399;   /* 边框样式 */
  color: rgb(255, 0, 174);      /* 文字颜色 */
  font-size: 15px;             /* 字体大小 */
  font-weight: bold;           /* 字体粗细 */
  background-color: transparent;  /* 背景色透明 */
  transition: 0.3s linear;       /* 过渡效果 */
  float: right;                /* 向右浮动 */
}

/* 搜索框聚焦时的样式 */
.bar input:focus {
  width: 300px;            /* 宽度 */
}

/* 搜索框占位符文字样式 */
.bar input::-webkit-input-placeholder {
  color: rgb(0, 255, 187);  /* 文字颜色 */
  font-size: 15px;          /* 字体大小 */
  font-weight: bold;        /* 字体粗细 */
}

/* 搜索框按钮样式 */
.bar button {
  background: none;        /* 无背景 */
  top: -2px;               /* 顶部位置 */
  right: 0;                /* 右侧位置 */
}

/* 搜索框按钮图标样式 */
.bar button:before {
  content: "\f002";        /* 图标代码 */
  font-family: FontAwesome; /* 字体图标库 */
  color: #3b324e9d;        /* 图标颜色 */
}
</style>
