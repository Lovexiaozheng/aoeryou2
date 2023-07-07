<template>
  <!-- 定义模板 -->
  <div class="nav"> <!-- nav 类用于导航栏整体布局 -->

    <header class="container">
      <!-- container 类用于导航栏内部flex布局 -->

      <div class="nav-brand">
        <!-- nav-brand 类用于导航栏品牌区 -->

        <a href="./" style="text-decoration: none">
          <!-- 链接到主页,取消下划线 -->

          <h1 style="color: black; float: left">
            <!-- h1 浮动到左侧,黑色字体 -->

            <i class="snes-jp-logo brand-logo"></i>
            <!-- 图标 -->

            <a style="font-size: larger">好二游</a>
            <!-- 品牌名称,较大字体 -->
          </h1>
        </a>
      </div>

      <nav class="nav-menu">
        <!-- nav-menu 类用于主导航菜单 -->

        <a @click="handleSelect(1)" :class="activeNum == 1 ? 'active' : ''">
          <!-- 点击事件调用 handleSelect 方法,传递参数 1,判断 activeNum 是否为 1 来添加 active 类 -->

          <router-link to="/">首页</router-link>
          <!--  router-link to="/" 链接到首页 -->
        </a>
        <a @click="handleSelect(2)" :class="activeNum == 2 ? 'active' : ''">

          <router-link to="/user">用户</router-link>
          <!--  router-link to="/user" 链接到用户页面 -->
        </a>
        <a @click="handleSelect(3)" :class="activeNum == 3 ? 'active' : ''">

          <router-link to="/admin">后台</router-link>
          <!--  router-link to="/admin" 链接到后台页面 -->
        </a>
      </nav>
    </header>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  name: "Headers",
  data() {
    return {
      activeNum: 1,
    };
  },
  watch: {
    $route: function () {
      this.updateActiveNum();
    },
  },
  created() {
    this.updateActiveNum();
  },
  methods: {
    // 点击导航链接时的处理函数
    handleSelect(n) {
      this.activeNum = n;
      this.$nextTick(() => {
        // 检查目的地是否与当前路由相同
        if (this.$route.path !== this.getDestinationPath(n)) {
          // 如果不同，执行导航
          this.$router.push(this.getDestinationPath(n));
        }
      });
    },
    // 获取导航目的地的路径
    getDestinationPath(n) {
      switch (n) {
        case 1:
          return "/";
        case 2:
          return "/user";
        case 3:
          return "/admin";
        default:
          return "/";
      }
    },
    // 更新当前激活的导航链接
    updateActiveNum() {
      const path = this.$route.path;
      if (path === "/") {
        this.activeNum = 1;
      } else if (path === "/user") {
        this.activeNum = 2;
      } else if (path === "/admin") {
        this.activeNum = 3;
      }
    },
  },
};
</script>



<style scoped> 
.nav {
  width: 100%; /* 宽度为 100% */
  height: auto; /* 高度自动 */
  background: #1abc9c; /* 背景颜色 */
  position: fixed; /* 固定定位 */
  top: 0; /* 距离顶部 0 */
  left: 0; /* 距离左边 0 */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* 添加阴影 */
  z-index: 999; /* 设置层叠顺序，确保在其他元素之上 */
}

/* 导航栏容器样式 */
.container {
  display: flex; /* 使用 Flexbox 布局 */
  justify-content: space-between; /* 两个子元素之间平均分配空间 */
  align-items: center; /* 垂直居中对齐子元素 */
  padding: 0 20px; /* 左右内边距为 20px */
}

/* 导航品牌链接样式 */
.nav-brand a {
  color: #fff; /* 文字颜色 */
  font-size: 1.5rem; /* 字体大小 */
  font-weight: 700; /* 字体粗细 */
  text-decoration: none; /* 移除下划线 */
  transition: all 0.3s ease; /* 添加过渡效果 */
  user-select: none; /* 禁用文本选中 */
}

/* 导航菜单样式 */
.nav-menu {
  display: flex; /* 使用 Flexbox 布局 */
  list-style: none; /* 移除列表样式 */
  padding: 0; /* 设置内边距为 0 */
}

/* 导航菜单链接样式 */
.nav-menu a {
  color: #fff; /* 文字颜色 */
  font-size: 1rem; /* 字体大小 */
  font-weight: 500; /* 字体粗细 */
  text-decoration: none; /* 移除下划线 */
  transition: all 0.3s ease; /* 添加过渡效果 */
  padding: 0 10px; /* 左右内边距为 10px */
}

/* 导航菜单链接悬停样式 */
.nav-menu a:hover {
  color: #fff; /* 文字颜色保持不变 */
}

/* 导航菜单激活链接样式 */
.nav-menu a.active {
  color: #fff; /* 文字颜色保持不变 */
  border-bottom: 2px solid #fff; /* 添加底部边框 */
}

/* 移动设备自适应样式 */
@media screen and (max-width: 768px) {
  /* 导航菜单在移动设备上的样式 */
  .nav-menu {
    flex-direction: column; /* 设置为垂直排列 */
  }

  /* 导航菜单链接在移动设备上的样式 */
  .nav-menu a {
    padding: 10px 0; /* 上下内边距为 10px */
  }
}</style>
