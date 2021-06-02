<template>
  <h-page-container>
    <h-page-header slot="pageHeader" :breadcrumb="breadcrumb" />
    <h-layout>
      <h-page-sidebar>
        <template slot="pageSidebarAction">
          <el-tooltip content="tips" placement="top">
            <el-button type="iconButton" icon="h-icon-add" />
          </el-tooltip>
          <el-tooltip content="tips" placement="top">
            <el-button type="iconButton" icon="h-icon-edit" />
          </el-tooltip>
          <el-tooltip content="tips" placement="top">
            <el-button type="iconButton" icon="h-icon-delete" />
          </el-tooltip>
          <el-tooltip content="tips" placement="top">
            <el-button type="iconButton" icon="h-icon-export" />
          </el-tooltip>
        </template>
        <template slot="pageSidebarSearch">
          <el-input
            v-model="treeSearchKey"
            :placeholder="'Information'"
            :on-icon-click="handleSearchTree"
            :clear-icon-click="handleClearTree"
            suffix-icon="h-icon-search"
            clearable
            @keyup.enter.native="handleSearchTree"
          />
        </template>
        <el-tree
          ref="areaTree"
          :data="treeData"
          :props="defaultProps"
          :default-expanded-keys="['0']"
          node-key="id"
          default-icon="h-icon-folder"
          current-node-key="0"
        />
      </h-page-sidebar>
      <h-layout direction="vertical">
        <h-layout-header>
          <el-tabs v-model="activeTab" class="page-tabs">
            <el-tab-pane
              v-for="i in 4"
              :key="`tabs_${i}`"
              :name="`tabs_${i}`"
              label="Text"
            />
          </el-tabs>
        </h-layout-header>
        <h-page-content>
          <h-page-search ref="search" :model="search">
            <h-page-search-item label="Title" prop="title1">
              <el-input v-model="search.title1" placeholder="Information" />
            </h-page-search-item>
            <h-page-search-item label="Title" prop="title2">
              <el-input v-model="search.title2" placeholder="Information" />
            </h-page-search-item>
            <h-page-search-item :show="false" label="Title" prop="title3">
              <el-input v-model="search.title3" placeholder="Information" />
            </h-page-search-item>
            <h-page-search-item :show="false" label="Title" prop="title4">
              <el-input v-model="search.title4" placeholder="Information" />
            </h-page-search-item>
            <h-page-search-item :show="false" label="Title" prop="title5">
              <el-input v-model="search.title5" placeholder="Information" />
            </h-page-search-item>
            <h-page-search-item :show="false" label="Title" prop="title5">
              <el-input v-model="search.title5" placeholder="Information" />
            </h-page-search-item>
            <template slot="pageSearchAction">
              <el-button type="primary"  @click="dialogVisible = true">基础表单添加</el-button>

              <el-button type="primary">Search</el-button>
              <el-button @click="handleReset">Reset</el-button>
            </template>
          </h-page-search>
          <h-page-table>
            <el-table
              ref="multipleTable"
              :data="tableData"
              show-overflow-title
              force-scroll="horizontal"
              stripe
            >
              <el-table-column type="selection" width="55" />
              <el-table-column
                v-for="i in 5"
                :key="`table_${i}`"
                :prop="`title${i}`"
                label="Title"
              />
            </el-table>
            <el-pagination
              slot="pagination"
              :current-page="1"
              :page-sizes="[10, 20, 50, 100]"
              :page-size="20"
              :total="100"
              layout="total, sizes, prev, pager, next, jumper"
            />
          </h-page-table>
        </h-page-content>
      </h-layout>
    </h-layout>

    <el-dialog title="提示" :visible.sync="dialogVisible"  :area="[1000, 650]">
    你好啊
    <basic-form></basic-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </span>
  </el-dialog>
  </h-page-container>
</template>

<script>
import service from './service'
import BasicForm from './../basicForm/BasicForm'
export default {
  name: 'TableWithHlfFilter',
  data () {
    return {
      breadcrumb: ['Title', 'Title', 'Title', 'Title'],
      activeTab: 'tabs_1',
      tableData: [],
      search: {
        title1: '',
        title2: '',
        title3: '',
        title4: '',
        title5: ''
      },
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'label',
        icon: 'icon'
      },
      treeSearchKey: '',
      dialogVisible: false
    }
  },
  components: {
    BasicForm
  },
  created () {
    service.getTableData().then(res => {
      this.tableData = res.data
    }).catch(err => {
      console.error(err)
    })
    service.getTreeData().then(res => {
      this.treeData = res.data
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
