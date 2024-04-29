/* 实验排课  根据“教师”填报的“实验课申请登记”，将实验课安排到实验室。 
根据“实验课申请登记”的“实验室类型”确定可以选择的实验室 范围 
根据“实验课申请登记”的“学生人数”和实验室设备数决定分配 哪几间实验室 
根据“实验课申请登记”的“起始周”、“结束周”和已经排课的情 况避免实验室冲突
提示：可以创建一个“实验室排课”表来记录实验室排课的情况，该 表的主要数据包括： 
排课学期：是哪个学期的课  实验室名称：  实验室编号：  周次：第几周 
节次：第几节课  课程名：  任课教师：  学生班级： */
<template>
  <div class="class-admin">
    <a-container>
      <a-row>
        <a-col :span="24">
          <a-card title="实验排课">
            <a-form :model="formData" :label-width="100">
              <a-form-item label="教师">
                <a-input
                  v-model="formData.teacher"
                  placeholder="请输入教师姓名"
                ></a-input>
              </a-form-item>
              <a-form-item label="实验室类型">
                <a-select
                  v-model="formData.labType"
                  placeholder="请选择实验室类型"
                >
                  <a-option value="生物实验室">生物实验室</a-option>
                  <a-option value="化学实验室">化学实验室</a-option>
                  <a-option value="物理实验室">物理实验室</a-option>
                </a-select>
              </a-form-item>
              <a-form-item label="学生人数">
                <a-input-number
                  v-model="formData.studentCount"
                  :min="1"
                  placeholder="请输入学生人数"
                ></a-input-number>
              </a-form-item>
              <a-form-item label="实验室设备数">
                <a-input-number
                  v-model="formData.equipmentCount"
                  :min="1"
                  placeholder="请输入实验室设备数"
                ></a-input-number>
              </a-form-item>
              <a-form-item label="起始周">
                <a-input-number
                  v-model="formData.startWeek"
                  :min="1"
                  placeholder="请输入起始周"
                ></a-input-number>
              </a-form-item>
              <a-form-item label="结束周">
                <a-input-number
                  v-model="formData.endWeek"
                  :min="1"
                  placeholder="请输入结束周"
                ></a-input-number>
              </a-form-item>
              <a-form-item>
                <a-button type="primary" @click="submitForm">提交</a-button>
              </a-form-item>
            </a-form>
          </a-card>
        </a-col>
      </a-row>
    </a-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ClassAdmin",
  components: {},
  data() {
    return {
      formData: {
        teacher: "",
        labType: "",
        studentCount: null,
        equipmentCount: null,
        startWeek: null,
        endWeek: null,
      },
    };
  },
  methods: {
    submitForm() {
      // 提交表单逻辑
    },
  },
});
</script>

<style scoped>
/* 在这里添加样式 */
</style>
