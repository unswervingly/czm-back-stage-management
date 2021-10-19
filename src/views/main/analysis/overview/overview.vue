<template>
  <div class="overview">
    <czm-card title="关于">
      <div class="c-left">
        Vue3项目 是基于 Vue3、Vuex、VueRouter、 ElementPlus
        、TypeScript、Echart5 等后台系统解决方案。
      </div>
    </czm-card>

    <!-- 技术栈 -->
    <czm-card title="技术栈">
      <czm-text-link :textArrs="technologyStacks" />
      <czm-descriptions
        title="生产环境依赖"
        :column="2"
        :tableDatas="dependencies"
      />
      <czm-descriptions
        title="开发环境依赖"
        :column="2"
        :tableDatas="devDependencies"
      />
    </czm-card>

    <!-- 项目结构 -->
    <czm-card title="项目结构">
      <div class="Project-structure">
        <czm-code language="bash" :code="projectDir" />
      </div>
    </czm-card>

    <!-- 项目规范 -->
    <czm-card title="项目规范">
      <!-- 文件命名规范 -->
      <czm-descriptions
        title="文件命名规范"
        :tableDatas="[
          { name: '文件夹', description: '统一小写, 多个单词使用-分割' },
          {
            name: '文件(.ts .vue .json .d.ts)',
            description: '统一小写, 多个单词使用-分割'
          }
        ]"
      ></czm-descriptions>

      <!-- 编写组件规范 -->
      <czm-descriptions
        title="编写组件规范"
        :tableDatas="specifications"
      ></czm-descriptions>
    </czm-card>

    <!-- Git提交常用指令 -->
    <czm-card title="Git提交常用指令">
      <czm-descriptions :tableDatas="gitSubmit"></czm-descriptions>
    </czm-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { CzmCard } from '../../../../base-ui/card/index'
import { CzmTextLink } from '../../../../base-ui/text-link/index'
import { CzmDescriptions } from '../../../../base-ui/descriptions/index'
import { CzmCode } from '../../../../base-ui/code/index'

import {
  technologyStacks,
  dependencies,
  devDependencies,
  projectDir,
  specifications,
  gitSubmit
} from './config/index'

export default defineComponent({
  name: 'overview',
  components: {
    CzmCard,
    CzmTextLink,
    CzmDescriptions,
    CzmCode
  },
  setup() {
    return {
      technologyStacks,
      dependencies,
      devDependencies,
      projectDir,
      specifications,
      gitSubmit
    }
  }
})
</script>

<style scoped lang="less">
.overview {
  background-color: #f5f5f5;

  .c-left {
    text-align: left;
  }

  .el-card {
    margin-bottom: 20px;
    // ::v-deep 重写 element-plus 样式
    &:deep(.el-card__header span) {
      // ::v-deep .el-card__header span {
      font-weight: 700;
    }
  }
}
</style>
