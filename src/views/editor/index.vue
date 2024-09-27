<script setup lang="ts">
import { IDomEditor } from '@wangeditor/editor';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import { onBeforeUnmount, reactive, ref, shallowRef } from 'vue';
import { UploadProps, UploadUserFile } from 'element-plus';

type ExpoType = {
  title: string;
  date: string[];
  details: string;
  img: UploadUserFile[];
};

const mode = 'default';
const editorRef = shallowRef();
const initForm = reactive<ExpoType>({
  title: '',
  date: [],
  details: '',
  img: []
});
const drawer = ref(false);
const type = '0';

const toolbarConfig = {
  // 排除菜单
  excludeKeys: ['fullScreen']
};
const editorConfig = { placeholder: '请输入' };

// 创建编辑器
const handleCreated = (editor: IDomEditor) => {
  // console.log(editor.getAllMenuKeys());
  editorRef.value = editor;
};

// console.log('key:', editorRef.value);

// 删除图片列表
const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles);
};

const handlePreview: UploadProps['onPreview'] = (file) => {
  console.log(file);
};

const handleConfirm = (val: ExpoType) => {
  console.log('提交：', val);
  drawer.value = false;
};

// 销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});
</script>

<template>
  <div>
    <el-button type="primary" @click="drawer = true">添加</el-button>
    <el-drawer v-model="drawer" size="50%">
      <template #header>
        <div>{{ type === '0' ? '新增' : '编辑' }}</div>
      </template>
      <template #default>
        <el-form :model="initForm" label-width="auto">
          <el-form-item label="标题：">
            <el-input v-model="initForm.title" />
          </el-form-item>
          <el-form-item label="时间：">
            <el-date-picker v-model="initForm.date" type="daterange" />
          </el-form-item>
          <el-form-item label="详情：">
            <div class="custom-editor">
              <toolbar
                style="border-bottom: 1px solid #e8e8e8"
                :editor="editorRef"
                :defaultConfig="toolbarConfig"
                :mode="mode"
              />
              <editor
                style="height: 500px; overflow-y: hidden"
                v-model="initForm.details"
                :defaultConfig="editorConfig"
                :mode="mode"
                @onCreated="handleCreated"
              />
            </div>
          </el-form-item>
          <el-form-item label="封面图片：">
            <el-upload
              v-model:file-list="initForm.img"
              class="upload-demo"
              action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :auto-upload="false"
              list-type="picture"
            >
              <template #trigger>
                <el-button type="primary" text>上传图片</el-button>
              </template>
              <template #tip>
                <div class="el-upload__tip">图片格式JPG/PNG, 720*405px, 10MB以内</div>
              </template>
            </el-upload>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div>
          <el-button @click="drawer = false">取消</el-button>
          <el-button type="primary" @click="handleConfirm(initForm)">提交</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<style lang="scss" scoped>
.custom-editor {
  border: 1px solid #e8e8e8;
}
.upload-demo {
  position: relative;
  width: 100%;
  .el-upload .el-button {
    padding: 0px;
  }

  .el-upload__tip {
    position: absolute;
    left: 81px;
    top: 0px;
    font-size: var(--font-size);
    color: rgba($color: #000000, $alpha: 0.5);
    margin: 0px;
  }
}
</style>
