<template>
  <div ref="scroll">
    <slot></slot>
  </div>
</template>
 
<script>
export default {
  name: 'GanAnimate',
  props: {
    direction: {
      type: String,
      default: 'left'
    }
  },
  data() {
    return {}
  },
  mounted() {
    // 监听window滚动条
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      // this.$refs.scroll.getBoundingClientRect().y指的是当前元素的y轴的位置
      // window.innerHeight是当前浏览器窗口的可视高度
      if (this.$refs.scroll.getBoundingClientRect().y < window.innerHeight) {
        this.$refs.scroll.classList.add('animate-' + this.direction)
      } else {
        this.$refs.scroll.classList.remove('animate-' + this.direction)
      }
    }
  }
}
</script>
 
<style lang="scss" scoped>
.animate-left {
  animation: Aleft 1s ease 1;
}
@keyframes Aleft {
  0% {
    transform: translateX(-200px);
  }
  50% {
    transform: translateX(200px);
  }
  100% {
    transform: translateX(0);
  }
}
.animate-right {
  animation: Aright 1s ease 1;
}
@keyframes Aright {
  0% {
    transform: translateX(200px);
  }
  50% {
    transform: translateX(-10px);
  }
  100% {
    transform: translateX(0);
  }
}
.animate-top {
  animation: Atop 1s ease 1;
}
@keyframes Atop {
  0% {
    transform: translateY(-300px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
}
.animate-bottom {
  animation: Abottom 0.8s ease 1;
}
@keyframes Abottom {
  0% {
    transform: translateY(-150%);
  }
  40% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20%);
  }
  60% {
    transform: translateY(0);
  }
  70% {
    transform: translateY(-10%);
  }
  100% {
    transform: translateY(0);
  }
}
</style>