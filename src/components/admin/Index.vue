<template>
    <body>
    
        <div class="content">
            <section class="nes-container with-title">
		<img src="../../assets/admin.png" alt="">
			<div class="content_r clearfix">
				<div class="content_l clearfix">
					<h2>Hi~ 管理员， Welcome here ！</h2>
					<p class="cc">欢迎来管理员后台，功能列表在下面~</p>
					<br>
					<p class="color_1">不知道写什么嘻嘻嘻嘻.......</p>
					
					<br>
					<p class="deeppink">只要路是对的，就不怕路远。</p>
					<p class="deeppink">As long as the road is right, you are not afraid of the distance.</p>
					<div class="link">
						<a  class="dodgerblue" @click="gotoExamine">审核列表</a>
						<a class="deeppink_1" @click="gotoAcc" >举报列表</a>
						<a class="magenta" @click="gotoBac">退货列表</a>
						<a  class="orange" @click="gotoIndex">返回首页</a>
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
    
    methods: {
    
        gotoExamine() {
            this.$router.push("/Examine");
        },
		gotoAcc() {
			this.$router.push("/Accusation");
		},
		gotoBac() {
			this.$router.push("/Backlist");
		},
		gotoIndex() {
    this.$router.push({ path: "/" });
  },
    }

}   

</script>
<style scoped>
    			/* CSS Document */
			* {
				margin: 0;
				padding: 0;
			}

			a {
				text-decoration: none;
			}

			.clearfix:after {
				content: "";
				display: block;
				height: 0;
				visibility: hidden;
				clear: both;
			}

			.clearfix {
				*zoom: 1;
			}

			body {
				background: url(https://gitee.com/vmu/cimg/raw/master/img/bg.jpg) no-repeat;
				background-size: cover;
				background-attachment: fixed;
			}

			.content {
				width: 900px;
				height: 500px;
				margin: 200px auto 0 auto;
				border-radius: 10px;
				background-color: rgba(236, 236, 236, 0.59);
				transition: all 1.0s;
				/*box-shadow: 0px 0px 20px rgba(0,0,0,0.3);*/
			}

			.content img {
				float: left;
				width: 200px;
				height: 200px;
				margin: 150px 0 0 80px;
				border-radius: 100px;

			}

			.content:hover {
				box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.52);
			}

			.content_r {
				float: right;
				width: 500px;
				margin: 80px 60px 0 0;
				/*	background-color: pink;*/
			}

			.content_l {
				float: left;
				width: 100%;
				text-align: center;
			}

			.content_l h5 {

				font-size: 17px;
			}

			.cc {
				margin-top: 10px;
				color: #1F2023;
				font-size: 18px;
			}

			.color_1 {
				color: #4855EC;
				font-size: 18px;
			}

			.deeppink {
				color: deeppink;
			}

			.link {
				margin-top: 30px;
			}

			.link a {
				display: block;
				float: left;
				width: 120px;
				height: 45px;
				margin: 5px 5px 0 0;
				/*	padding: 0 15px;*/
				color: #fff;
				line-height: 45px;
				transition: all 0.8s;
				/*	background-color: deeppink;*/

			}

			.link a:hover {
				background-color: rgba(0, 201, 243, 0.35);
			}

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