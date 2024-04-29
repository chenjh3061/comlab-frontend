/* 实验室借用审批  查看“学生”填报的“实验室借用申请” 
审批“实验室借用申请”，通过或不通过*/
<template>
  <a-table
    :columns="columns"
    :data-source="dataSource"
    v-if="dataSource.length > 0"
  >
    <template #action="{ record }">
      <span>
        <a-button type="primary" @click="approve(record)">通过</a-button>
        <a-button type="default" @click="reject(record)">不通过</a-button>
      </span>
    </template>
  </a-table>
  <span v-else>暂无申请</span>
</template>

<script>
export default {
  name: "LabAdmin",
  data() {
    return {
      columns: [
        {
          title: "申请人",
          dataIndex: "applicant",
          key: "applicant",
        },
        {
          title: "借用时间",
          dataIndex: "borrowTime",
          key: "borrowTime",
        },
        {
          title: "归还时间",
          dataIndex: "returnTime",
          key: "returnTime",
        },
        {
          title: "用途",
          dataIndex: "purpose",
          key: "purpose",
        },
        {
          title: "操作",
          dataIndex: "action",
          key: "action",
        },
      ],
      dataSource: [
        {
          key: 1,
          applicant: "张三",
          borrowTime: "2024-04-25 08:00:00",
          returnTime: "2024-04-25 12:00:00",
          purpose: "实验课",
        },
        {
          key: 2,
          applicant: "李四",
          borrowTime: "2024-04-25 14:00:00",
          returnTime: "2024-04-25 18:00:00",
          purpose: "科研实验",
        },
      ],
    };
  },
  methods: {
    approve(record) {
      // 通过审批逻辑
      console.log("通过申请", record);
    },
    reject(record) {
      // 不通过审批逻辑
      console.log("拒绝申请", record);
    },
  },
};
</script>

<style scoped></style>
