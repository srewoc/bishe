<template>
  <div class="common-layout">
    <el-container>
      <el-header>Header</el-header>


      <el-container>
        <el-aside width="200px">

          <el-menu
              default-active="1"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              router="true"
              unique-opened="true"
          >

            <el-menu-item index="/selfsetting">
              <el-icon>
                <Location/>
              </el-icon>
              <template #title>
                <span>个人中心</span>
              </template>
            </el-menu-item>

            <el-sub-menu index="2">
              <template #title>
                <el-icon><icon-menu /></el-icon>
                <span>开始刷题</span>
              </template>
              <el-menu-item index="/chapterselect">章节刷题</el-menu-item>
              <el-menu-item index="4">自定义刷题</el-menu-item>

            </el-sub-menu>



          </el-menu>
        </el-aside>


        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import {
  Menu as IconMenu,
  Location,
} from '@element-plus/icons-vue'

// const handleOpen = (key, keyPath) => {
//   console.log(key, keyPath)
// }
// const handleClose = (key, keyPath) => {
//   console.log(key, keyPath)
// }
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
