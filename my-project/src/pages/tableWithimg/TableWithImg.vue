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
      <h-page-content>
        <h-page-action search-icon>
          <el-button type="iconButton" icon="h-icon-import">BTN</el-button>
          <el-button type="iconButton" icon="h-icon-export">BTN</el-button>
          <el-button type="iconButton" icon="h-icon-setting">BTN</el-button>
        </h-page-action>
        <h-page-search ref="search" :model="search">
          <h-page-search-item label="Title" prop="title1">
            <el-input v-model="search.title1" placeholder="Information" />
          </h-page-search-item>
          <h-page-search-item label="Title" prop="title2">
            <el-input v-model="search.title2" placeholder="Information" />
          </h-page-search-item>
          <h-page-search-item label="Title" prop="title3">
            <el-input v-model="search.title3" placeholder="Information" />
          </h-page-search-item>
          <h-page-search-item label="Title" prop="title4">
            <el-input v-model="search.title4" placeholder="Information" />
          </h-page-search-item>
          <h-page-search-item label="Title" prop="title5">
            <el-input v-model="search.title5" placeholder="Information" />
          </h-page-search-item>
          <template slot="pageSearchAction">
            <el-button type="primary">Search</el-button>
            <el-button type="minor" @click="handleReset">Reset</el-button>
          </template>
        </h-page-search>
          <h-page-table>
            <el-table
              ref="multipleTable"
              :data="tableData"
              show-overflow-title
              force-scroll="horizontal"
            >
              <el-table-column type="selection" width="55" />
              <el-table-column prop="imgUrl" label="照片">
                <template slot-scope="scope">
                  <el-popover
                    ref="popover4"
                    placement="right-start"
                    trigger="hover"
                    :popper-options="options"
                    popper-class="img-popover"
                  >
                    <div slot="reference" class="img-wrapper">
                      <img :src="scope.row.imgUrl" alt="图片预览" />
                    </div>
                    <div class="preview-tips-img-wrapper">
                      <img
                        class="preview-tips-img"
                        :src="scope.row.imgUrl"
                        alt="图片预览"
                      />
                    </div>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column prop="title2" label="Title" />
              <el-table-column prop="title3" label="Title" />
              <el-table-column prop="title4" label="Title" />
              <el-table-column prop="title5" label="Title" />
            </el-table>
            <el-pagination
              slot="pagination"
              :current-page="1"
              :page-sizes="[10, 20, 50, 100]"
              :page-size="20"
              layout="total, sizes, prev, pager, next, jumper"
              :total="100"
            />
          </h-page-table>
      </h-page-content>
    </h-layout>
  </h-page-container>
</template>

<script>
// 防止图片找不到换成了 base64
// import ImgA from './img/a.jpg';
// import ImgB from './img/b.jpg';
// import ImgC from './img/c.jpeg';

export default {
  name: 'TableWithFilter',
  data () {
    let dataList = []
    for (let i = 0; i < 8; i++) {
      dataList = dataList.concat([
        {
          imgUrl: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNTZweCIgaGVpZ2h0PSI1NnB4IiB2aWV3Qm94PSIwIDAgNTYgNTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjUgKDY3NDY5KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5kZWZhdWx0L25vX2RhdGE8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZyBpZD0iZGVmYXVsdC9ub19kYXRhIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8cG9seWdvbiBpZD0ic2hhcGUiIHBvaW50cz0iMCAwIDU2IDAgNTYgNTYgMCA1NiI+PC9wb2x5Z29uPgogICAgICAgIDxwYXRoIGQ9Ik0xMiwxMCBMNDQsMTAgTDUyLDIxIEw1Miw0NCBDNTIsNDYuMjA5MTM5IDUwLjIwOTEzOSw0OCA0OCw0OCBMOCw0OCBDNS43OTA4NjEsNDggNCw0Ni4yMDkxMzkgNCw0NCBMNCwyMSBMMTIsMTAgWiBNMTMuNjM3NSwxNCBMNywyNCBMNDksMjQgTDQyLjM4NzUsMTQgTDEzLjYzNzUsMTQgWiIgaWQ9IkNvbWJpbmVkLVNoYXBlIiBmaWxsPSIjMDAwMDAwIiBvcGFjaXR5PSIwLjA3OTk5OTk5ODIiPjwvcGF0aD4KICAgICAgICA8Y2lyY2xlIGlkPSJPdmFsLTEyIiBmaWxsPSIjMDAwMDAwIiBvcGFjaXR5PSIwLjA3OTk5OTk5ODIiIGN4PSIxOSIgY3k9IjM0LjUiIHI9IjIuNSI+PC9jaXJjbGU+CiAgICAgICAgPGNpcmNsZSBpZD0iT3ZhbC0xMi1Db3B5IiBmaWxsPSIjMDAwMDAwIiBvcGFjaXR5PSIwLjA3OTk5OTk5ODIiIGN4PSIyOCIgY3k9IjM0LjUiIHI9IjIuNSI+PC9jaXJjbGU+CiAgICAgICAgPGNpcmNsZSBpZD0iT3ZhbC0xMi1Db3B5LTIiIGZpbGw9IiMwMDAwMDAiIG9wYWNpdHk9IjAuMDc5OTk5OTk4MiIgY3g9IjM3IiBjeT0iMzQuNSIgcj0iMi41Ij48L2NpcmNsZT4KICAgIDwvZz4KPC9zdmc+',
          title2: '内容',
          title3: '内容',
          title4: '内容',
          title5: '内容'
        },
        {
          imgUrl: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNTZweCIgaGVpZ2h0PSI1NnB4IiB2aWV3Qm94PSIwIDAgNTYgNTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjUgKDY3NDY5KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5kZWZhdWx0L25vX2RhdGE8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZyBpZD0iZGVmYXVsdC9ub19kYXRhIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8cG9seWdvbiBpZD0ic2hhcGUiIHBvaW50cz0iMCAwIDU2IDAgNTYgNTYgMCA1NiI+PC9wb2x5Z29uPgogICAgICAgIDxwYXRoIGQ9Ik0xMiwxMCBMNDQsMTAgTDUyLDIxIEw1Miw0NCBDNTIsNDYuMjA5MTM5IDUwLjIwOTEzOSw0OCA0OCw0OCBMOCw0OCBDNS43OTA4NjEsNDggNCw0Ni4yMDkxMzkgNCw0NCBMNCwyMSBMMTIsMTAgWiBNMTMuNjM3NSwxNCBMNywyNCBMNDksMjQgTDQyLjM4NzUsMTQgTDEzLjYzNzUsMTQgWiIgaWQ9IkNvbWJpbmVkLVNoYXBlIiBmaWxsPSIjMDAwMDAwIiBvcGFjaXR5PSIwLjA3OTk5OTk5ODIiPjwvcGF0aD4KICAgICAgICA8Y2lyY2xlIGlkPSJPdmFsLTEyIiBmaWxsPSIjMDAwMDAwIiBvcGFjaXR5PSIwLjA3OTk5OTk5ODIiIGN4PSIxOSIgY3k9IjM0LjUiIHI9IjIuNSI+PC9jaXJjbGU+CiAgICAgICAgPGNpcmNsZSBpZD0iT3ZhbC0xMi1Db3B5IiBmaWxsPSIjMDAwMDAwIiBvcGFjaXR5PSIwLjA3OTk5OTk5ODIiIGN4PSIyOCIgY3k9IjM0LjUiIHI9IjIuNSI+PC9jaXJjbGU+CiAgICAgICAgPGNpcmNsZSBpZD0iT3ZhbC0xMi1Db3B5LTIiIGZpbGw9IiMwMDAwMDAiIG9wYWNpdHk9IjAuMDc5OTk5OTk4MiIgY3g9IjM3IiBjeT0iMzQuNSIgcj0iMi41Ij48L2NpcmNsZT4KICAgIDwvZz4KPC9zdmc+',
          title2: '内容',
          title3: '内容',
          title4: '内容',
          title5: '内容'
        },
        {
          imgUrl: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNTZweCIgaGVpZ2h0PSI1NnB4IiB2aWV3Qm94PSIwIDAgNTYgNTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjUgKDY3NDY5KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5kZWZhdWx0L25vX2RhdGE8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZyBpZD0iZGVmYXVsdC9ub19kYXRhIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8cG9seWdvbiBpZD0ic2hhcGUiIHBvaW50cz0iMCAwIDU2IDAgNTYgNTYgMCA1NiI+PC9wb2x5Z29uPgogICAgICAgIDxwYXRoIGQ9Ik0xMiwxMCBMNDQsMTAgTDUyLDIxIEw1Miw0NCBDNTIsNDYuMjA5MTM5IDUwLjIwOTEzOSw0OCA0OCw0OCBMOCw0OCBDNS43OTA4NjEsNDggNCw0Ni4yMDkxMzkgNCw0NCBMNCwyMSBMMTIsMTAgWiBNMTMuNjM3NSwxNCBMNywyNCBMNDksMjQgTDQyLjM4NzUsMTQgTDEzLjYzNzUsMTQgWiIgaWQ9IkNvbWJpbmVkLVNoYXBlIiBmaWxsPSIjMDAwMDAwIiBvcGFjaXR5PSIwLjA3OTk5OTk5ODIiPjwvcGF0aD4KICAgICAgICA8Y2lyY2xlIGlkPSJPdmFsLTEyIiBmaWxsPSIjMDAwMDAwIiBvcGFjaXR5PSIwLjA3OTk5OTk5ODIiIGN4PSIxOSIgY3k9IjM0LjUiIHI9IjIuNSI+PC9jaXJjbGU+CiAgICAgICAgPGNpcmNsZSBpZD0iT3ZhbC0xMi1Db3B5IiBmaWxsPSIjMDAwMDAwIiBvcGFjaXR5PSIwLjA3OTk5OTk5ODIiIGN4PSIyOCIgY3k9IjM0LjUiIHI9IjIuNSI+PC9jaXJjbGU+CiAgICAgICAgPGNpcmNsZSBpZD0iT3ZhbC0xMi1Db3B5LTIiIGZpbGw9IiMwMDAwMDAiIG9wYWNpdHk9IjAuMDc5OTk5OTk4MiIgY3g9IjM3IiBjeT0iMzQuNSIgcj0iMi41Ij48L2NpcmNsZT4KICAgIDwvZz4KPC9zdmc+',
          title2: '内容',
          title3: '内容',
          title4: '内容',
          title5: '内容'
        }
      ])
    }
    return {
      breadcrumb: ['Title', 'Title', 'Title', 'Title'],
      activeTab: 'tabs_1',
      search: {
        title1: '',
        title2: '',
        title3: '',
        title4: '',
        title5: ''
      },
      tableData: dataList
    }
  },
  computed: {
    /*
    * 通过设置el-popover的popper-options属性
    * 达到el-popover不覆盖表头和分页器的效果
    * 这里先把箭头位置设置为right-start,避免了覆盖表头
    * 再通过onUpdate计算距离下方的偏移，
    * 通过el-popover实例的runModifiers方法更新视窗位置
    * 避免覆盖分页器即可
    * 这里有个比较恶心的坑：
    * 关于options有哪些属性，该怎么用，目前只能通过查看源码的方式分析
    * 因为el-popover依赖的popper.js文档早已更新
    * 而内部使用的popper.js是一个比较旧的版本且没有标注版本号，所以无从查起
    * 只能结合popper.js最新文档和hui内部引用的源码自行分析，祝你好运。。。
    */
    options () {
      const paginationHeight = 56 // 这里根据实际情况，取得视窗下方要保留的距离，这里就是分页器的高度
      return {
        onUpdate (dataObj) {
          const instance = dataObj.instance
          // 为了保证tooltip不遮挡分页器，这里计算视窗下方要保留的区域，在更新的回调中计算进去即可
          dataObj.boundaries.bottom -= paginationHeight
          instance.runModifiers(dataObj, instance._options.modifiers)
        }
      }
    }
  },
  methods: {
    handleReset () {
      this.$refs.search.getForm().resetFields()
    },
    onCreateHandler (dataObj) {
      console.log(dataObj)
    }
  }
}
</script>
<style lang="scss">
.img-wrapper {
  width: 44px;
  height: 44px;
  padding: 8px 12px;
  box-sizing: content-box;

  img {
    width: 100%;
    height: 100%;
    border: 1px solid rgba(0, 0, 0, 0.08);
  }
}
.preview-tips-img-wrapper {
  display: flex;
  width: 296px;
  height: 296px;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.04);
  .preview-tips-img {
    max-width: 296px;
    max-height: 296px;
  }
}
// 这个样式要控制好作用域，他只能是全局的，注意别覆盖了其他地方
.img-popover {
  padding: 4px;
}
</style>
