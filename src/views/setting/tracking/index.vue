<script setup lang="ts">
import { UploadProps, UploadUserFile } from 'element-plus';
import { reactive, ref } from 'vue';

type ExpoType = {
  title: string;
  date: string[];
  information: string;
  img: UploadUserFile[];
};
const type = '0';
const drawer = ref(false);
const initForm = reactive<ExpoType>({
  title: '',
  date: [],
  information: '',
  img: []
});
const handleConfirm = (val: ExpoType) => {
  console.log('提交：', val);
  drawer.value = false;
};

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles);
};

const handlePreview: UploadProps['onPreview'] = (file) => {
  console.log(file);
};
</script>

<template>
  <div>
    <el-button type="primary" @click="drawer = true"><svg-icon name="news" />添加</el-button>
    <el-drawer v-model="drawer" size="40%">
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
          <el-form-item label="展位信息：">
            <el-input v-model="initForm.information" type="textarea" />
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
.upload-demo {
  // display: flex;
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
