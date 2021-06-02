<template>
  <h-page-container>
    <h-page-header slot="pageHeader" :breadcrumb="breadcrumb" />
    <h-layout direction="vertical">
      <h-layout-header>
        <el-tabs v-model="activeTab" class="page-tabs">
          <el-tab-pane
            v-for="i in 4"
            :key="`tabs_${i}`"
            label="Text"
            :name="`tabs_${i}`"
          />
        </el-tabs>
      </h-layout-header>
      <h-page-content flex align-center>
        <el-form
          :model="form"
          label-position="top"
          style="width: 480px; margin-top: 40px;"
          content-width="480px"
        >
          <h-page-group title="Group Title">
            <el-form-item
              v-for="i in 4"
              :key="`form_${i}`"
              label="Title"
              required-right
            >
              <el-input v-model="form.title" placeholder="Information" />
            </el-form-item>
          </h-page-group>
          <h-page-group title="Group Title">
            <template slot="headerAction">
              <i class="h-icon-setting" />
            </template>
            <el-form-item label="Title" required-right>
              <el-input v-model="form.title" placeholder="Information" />
            </el-form-item>
          </h-page-group>
          <h-page-group>
            <el-button type="primary">BTN</el-button>
          </h-page-group>
        </el-form>
      </h-page-content>
    </h-layout>
  </h-page-container>
</template>

<script>
export default {
  name: 'BasicForm',
  data () {
    return {
      breadcrumb: ['Title', 'Title', 'Title', 'Title'],
      activeTab: 'tabs_1',
      form: {
        title: ''
      }
    }
  }
}
</script>

<style lang="less">
@import url('./style.less');
</style>
