<template>
  <div class="czm-form">
    <div class="header">
      <slot name="header"></slot>
    </div>

    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item
              :label="item.label"
              :style="itemStyle"
              v-if="!item.isHidden"
            >
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  :placeholder="item.placeholder"
                  :show-password="item.type === 'password'"
                  v-model="formData[`${item.field}`]"
                />
              </template>

              <template v-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  style="width: 100%"
                  v-model="formData[`${item.field}`]"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :value="option.value"
                  >
                    {{ option.title }}
                  </el-option>
                </el-select>
              </template>

              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  v-bind="item.otherOptions"
                  style="width: 100%"
                  v-model="formData[`${item.field}`]"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>

    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'
import { IFormItem } from '../types/index'

export default defineComponent({
  props: {
    // 1.可以双向绑定数据，但是违反了单向数据流
    /* formData: {
      type: Object,
      required: true
    }, */

    // 2.在组件中使用v-model 来实现
    modelValue: {
      type: Object,
      required: true
    },

    // 传入的参数和类型
    formItems: {
      type: Array as PropType<IFormItem[]>,
      // 基本类型就直接 default: ''，当是引用类型时default() {}，但是vue3和Ts结合要用 箭头函数default: () => {}
      default: () => []
    },
    // label宽度
    labelWidth: {
      type: String,
      default: '100px'
    },
    // 样式
    itemStyle: {
      type: Object,
      default: () => {
        return { padding: '10px 40px' }
      }
    },
    // 响应式布局
    colLayout: {
      type: Object,
      default: () => {
        return {
          xl: 6,
          lg: 8,
          md: 12,
          sm: 24,
          xs: 24
        }
      }
    }
  },
  setup(props, { emit }) {
    // 2.在组件中使用v-model 来实现
    // formData 是外面v-model数据 重新拷贝后的数据
    // ref({...props.modelValue}) 把数据重新拷贝
    const formData = ref({ ...props.modelValue })

    watch(formData, (newValue) => emit('update:modelValue', newValue), {
      // 加上deep: true，才可以侦听外面formData里面的数据
      deep: true
    })

    return {
      formData
    }
  }
})
</script>

<style scoped lang="less">
.czm-form {
  padding-top: 22px;
}
</style>
