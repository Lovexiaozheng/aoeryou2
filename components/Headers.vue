<template>
  <div class="nav">
  <header>
        <div class="container">
          <div class="nav-brand">
            <a href="./" style="text-decoration: none">
               <h1 style="color: black;float:left;" ><i class="snes-jp-logo brand-logo"></i> <a style="font-size:larger;">好二游</a></h1>
            </a>
 
            <div class="nav-menu">
              <a   @click="handleSelect(1)" :class="activeNum == 1?'active':''" ><router-link to="/">首页</router-link></a>
              <a  @click="handleSelect(2)" :class="activeNum == 2?'active':''" ><router-link to="/user">用户</router-link></a>
              <a  @click="handleSelect(3)" :class="activeNum == 3?'active':''"><router-link to="/admin">后台</router-link></a>
        </div>
      </div>
        </div>
    </header>
  </div>

</template>

<script>
export default {
  name: 'Headers',
  data() {
    return {
      activeNum:1,
    };
  },

  methods: {
    handleSelect(n) {

      this.activeNum=n
    },
   

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .nav {
    width: 100%;
    height: auto;
    background:  #1abc9c; /* For browsers that do not support gradients */;
    position: fixed;
    top: 0;
    left: 0;
  
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    z-index: 999;
    
  }


  .nav-brand {
    display: flex;
    align-items: center;
  
    padding: 0 20px;
  }

  .nav-brand a {
    color: #fff;
    font-size: 1.5rem;
    font-weight: 700;
    text-decoration: none;
    transition: all 0.3s ease;
  }

  .nav-brand a:hover {
    color: #fff;
  }

  .nav-menu {
    display: flex;
    align-items: center;
    justify-content: space-between;
    list-style: none;
    float:right;
    margin: auto;
    padding: 0;
  }

  .nav-menu a {
    color: #fff;
    font-size: 1rem;
    font-weight: 500;
    text-decoration: none;
    transition: all 0.3s ease;
    padding: 0 10px;
  }

  .nav-menu a:hover {
    color: #fff;
  }

  .nav-menu a.active {
    color: #fff;
    border-bottom: 2px solid #fff;
  }

  @media screen and (max-width: 768px) {
    .nav {
      height: 60px;
    }

    .nav-brand {
      padding: 0 10px;
    }

    .nav-brand a {
      font-size: 1.2rem;
    }

    .nav-menu {
      display: none;
    }
  }
</style>
