<template>
  <h-page-container>
    <h-page-header
      slot="pageHeader"
      :breadcrumb="breadcrumb"
      subtitle="Subtitle"
      return-icon
    />
    <h-layout class="page-transfer">
      <h-layout-aside class="page-transfer-aside">
        <span class="page-transfer-aside__header">所在区域</span>
        <div class="page-transfer-aside__search">
          <el-input
            v-model="treeSearchKey"
            :placeholder="'Information'"
            suffix-icon="h-icon-search"
            clearable
            :on-icon-click="handleSearchTree"
            :clear-icon-click="handleClearTree"
            @keyup.enter.native="handleSearchTree"
          />
        </div>
        <div class="page-transfer-aside__main">
          <el-tree
            ref="areaTree"
            :data="treeData"
            :props="defaultProps"
            node-key="id"
            default-icon="h-icon-folder"
            :default-expanded-keys="['0']"
            current-node-key="0"
          />
        </div>
      </h-layout-aside>
      <h-layout-content>
        <h-table-transfer
          ref="tableTransfer"
          :left-table-data="leftData"
          :right-table-data="rightData"
          tree-node-id="root"
          btn-type="big"
          row-key="id"
          :name-key="['label', 'description']"
          :is-show-check-box="true"
          :load-num="30"
        >
          <template slot="leftTableColumn">
            <el-table-column
              label="Title"
              prop="label"
              show-overflow-title
            ></el-table-column>
            <el-table-column
              label="Title"
              prop="description"
              show-overflow-title
            ></el-table-column>
          </template>
          <template slot="rightTableColumn">
            <el-table-column
              label="Title"
              prop="label"
              show-overflow-title
            ></el-table-column>
            <el-table-column
              label="Title"
              prop="description"
              show-overflow-title
            ></el-table-column>
          </template>
        </h-table-transfer>
      </h-layout-content>
    </h-layout>
    <div class="page-transfer-action">
      <el-button type="primary">BTN</el-button>
      <el-button>BTN</el-button>
    </div>
  </h-page-container>
</template>

<script>
import service from './service'
export default {
  name: 'TransferTriple',
  data () {
    return {
      breadcrumb: ['Title', 'Title', 'Title', 'Title'],
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'label',
        icon: 'icon'
      },
      treeSearchKey: '',
      leftData: [],
      rightData: []
    }
  },

  created () {
    service.getTreeData().then(res => {
      this.treeData = res.data
    }).catch(err => {
      console.error(err)
    })
    service.getLeftData().then(res => {
      this.leftData = res.data
    }).catch(err => {
      console.error(err)
    })
    service.getRightData().then(res => {
      this.rightData = res.data
    }).catch(err => {
      console.error(err)
    })
  },
  methods: {
    handleSearchTree () {
      console.warn('handleSearchTree')
    },

    handleClearTree () {
      console.warn('handleClearTree')
      this.treeSearchKey = ''
      this.handleSearchTree()
    },

    handleReset () {
      this.$refs.search.getForm().resetFields()
    }
  }
}
</script>

<style lang="less">
@import url('./style.less');
</style>
