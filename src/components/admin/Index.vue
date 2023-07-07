<template>
	<body>
	  <!-- 内容容器 -->
	  <div class="content">
		<!-- 带标题的 NES 容器 -->
		<section class="nes-container with-title">
		  <!-- 管理员头像 -->
		  <img src="../../assets/admin.png" alt="" />
		  <!-- 右侧内容容器 -->
		  <div class="content_r clearfix">
			<!-- 左侧内容容器 -->
			<div class="content_l clearfix">
			  <!-- 欢迎标题 -->
			  <h2>Hi~ 管理员， Welcome here ！</h2>
			  <!-- 欢迎文字 -->
			  <p class="cc">欢迎来管理员后台，功能列表在下面~</p>
			  <br />
			  <!-- 颜色文字 -->
			  <p class="color_1">不知道写什么嘻嘻嘻嘻.......</p>
			  <br />
			  <!-- 粉红色格言 -->
			  <p class="deeppink">只要路是对的，就不怕路远。</p>
			  <!-- 英文粉红色格言 -->
			  <p class="deeppink">
				As long as the road is right, you are not afraid of the distance.
			  </p>
			  <!-- 功能链接容器 -->
			  <div class="link">
				<!-- 审核列表链接 -->
				<a class="dodgerblue" @click="gotoExamine">审核列表</a>
				<!-- 举报列表链接 -->
				<a class="deeppink_1" @click="gotoAcc">举报列表</a>
				<!-- 退货列表链接 -->
				<a class="magenta" @click="gotoBac">退货列表</a>
				<!-- 返回首页链接 -->
				<a class="orange" @click="gotoIndex">返回首页</a>
			  </div>
			</div>
		  </div>
		</section>
	  </div>
	</body>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
	name: "Index",
	data() {
	  return {
		user: JSON.parse(localStorage.getItem("user")),
	  };
	},
	created() {
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
	methods: {
	  // 跳转到审核列表
	  gotoExamine() {
		this.$router.push("/Examine");
	  },
	  // 跳转到举报列表
	  gotoAcc() {
		this.$router.push("/Accusation");
	  },
	  // 跳转到退货列表
	  gotoBac() {
		this.$router.push("/Backlist");
	  },
	  // 跳转到首页
	  gotoIndex() {
		this.$router.push({ path: "/" });
	  },
	},
  };
  </script>
  <style scoped>
  /* 通用样式 */
  * {
	margin: 0;
	padding: 0;
  }
  
  /* 链接样式 */
  a {
	text-decoration: none;
  }
  
  /* 清除浮动伪类 */
  .clearfix:after {
	content: "";
	display: block;
	height: 0;
	visibility: hidden;
	clear: both;
  }
  

  /* 页面背景样式 */
  body {
	background: url(https://gitee.com/vmu/cimg/raw/master/img/bg.jpg) no-repeat;
	background-size: cover;
	background-attachment: fixed;
  }
  
  /* 内容容器样式 */
  .content {
	width: 900px;
	height: 500px;
	margin: 200px auto 0 auto;
	border-radius: 10px;
	background-color: rgba(236, 236, 236, 0.59);
	transition: all 1s;
  }
  
  /* 管理员头像样式 */
  .content img {
	float: left;
	width: 200px;
	height: 200px;
	margin: 150px 0 0 80px;
	border-radius: 100px;
  }
  
  /* 内容容器悬停阴影样式 */
  .content:hover {
	box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.52);
  }
  
  /* 右侧内容容器样式 */
  .content_r {
	float: right;
	width: 500px;
	margin: 80px 60px 0 0;
  }
  
  /* 左侧内容容器样式 */
  .content_l {
	float: left;
	width: 100%;
	text-align: center;
  }
  
  /* 标题样式 */
  .content_l h5 {
	font-size: 17px;
  }
  
  /* 欢迎文字样式 */
  .cc {
	margin-top: 10px;
	color: #1f2023;
	font-size: 18px;
  }
  
  /* 颜色文字样式 */
  .color_1 {
	color: #4855ec;
	font-size: 18px;
  }
  
  /* 粉红色格言样式 */
  .deeppink {
	color: deeppink;
  }
  
  /* 功能链接容器样式 */
  .link {
	margin-top: 30px;
  }
  
  /* 功能链接样式 */
  .link a {
	display: block;
	float: left;
	width: 120px;
	height: 45px;
	margin: 5px 5px 0 0;
	color: #fff;
	line-height: 45px;
	transition: all 0.8s;
  }
  
  /* 功能链接悬停样式 */
  .link a:hover {
	background-color: rgba(0, 201, 243, 0.35);
  }
  
  /* 不同功能链接背景颜色 */
  .deeppink_1 {
	background-color: deeppink;
  }
  
  .dodgerblue {
	background-color: dodgerblue;
  }
  
  .magenta {
	background-color: magenta;
  }
  
  .orange {
	background-color: orange;
  }
  </style>