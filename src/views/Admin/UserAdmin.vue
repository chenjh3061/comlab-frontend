/* 平台用户管理  实验员的增加、删除、修改、重置密码 
教师的增加、删除、修改、重置密码  学生的增加、删除、修改、重置密码
每一类用户的管理需要列出全部该类用户；提供按姓名查询的功能。
扩展功能：用户的批量导入。*/

<template>
  <div>
    <h2>平台用户管理</h2>
    <!--    <a-input-->
    <!--      placeholder="请输入姓名"-->
    <!--      v-model="searchName"-->
    <!--      style="width: 200px; margin-bottom: 10px"-->
    <!--    />-->
    <!--    <a-button @click="searchUser">搜索</a-button>-->
    <!--    <a-button @click="resetSearch">重置</a-button>-->
    <a-button type="primary" @click="showAddUserModal">新增用户</a-button>
    <!--    <h3>批量导入：(传入格式正确的Excel文档)</h3>-->
    <!--    <a-space direction="vertical" :style="{ width: '100%' }">-->
    <!--      <a-upload action="/" />-->
    <!--    </a-space>-->
    <a-modal
      title="新增用户"
      column-resizable
      :closable="false"
      v-model:visible="addUserModalVisible"
      @ok="handleAddUser"
      @cancel="cancelAddUser"
    >
      <a-form ref="addUserForm" :model="newUser">
        <a-form-item
          label="用户名"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 18 }"
        >
          <a-input v-model="newUser.username" />
        </a-form-item>
        <a-form-item
          label="角色"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 18 }"
        >
          <a-select v-model="newUser.role" style="width: 100%">
            <a-option value="0">管理员</a-option>
            <a-option value="3">实验员</a-option>
            <a-option value="2">教师</a-option>
            <a-option value="1">学生</a-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="密码"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 18 }"
        >
          <a-input v-model="newUser.password" />
        </a-form-item>
        <a-form-item
          label="姓名"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 18 }"
        >
          <a-input v-model="newUser.name" />
        </a-form-item>
        <a-form-item
          label="专业"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 18 }"
        >
          <a-input v-model="newUser.major" />
        </a-form-item>
        <a-form-item
          label="班级"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 18 }"
        >
          <a-input v-model="newUser.clazz" />
        </a-form-item>
        <a-form-item
          label="职称"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 18 }"
        >
          <a-input v-model="newUser.title" />
        </a-form-item>
      </a-form>
    </a-modal>
    <a-table
      id="userTable"
      :columns="userColumns"
      :data="userData"
      column-resizable
      @change="handleChange"
    >
      <template #role="{ record }">
        {{ formatRole(record.role) }}
      </template>
      <template
        #name-filter="{
          filterValue,
          setFilterValue,
          handleFilterConfirm,
          handleFilterReset,
        }"
      >
        <div class="custom-filter">
          <a-space direction="vertical">
            <a-input
              :model-value="filterValue[0]"
              @input="(value) => setFilterValue([value])"
            />
            <div class="custom-filter-footer">
              <a-button @click="handleFilterConfirm">Confirm</a-button>
              <a-button @click="handleFilterReset">Reset</a-button>
            </div>
          </a-space>
        </div>
      </template>
      <template #action="{ record }">
        <a-button id="action" status="normal" @click="editUser(record)"
          >修改信息
        </a-button>
        <a-button id="action" status="warning" @click="alterPassword(record)"
          >重置密码
        </a-button>
        <a-button id="action" status="danger" @click="deleteUser(record)"
          >删除用户
        </a-button>
      </template>
    </a-table>
    <a-modal
      title="修改用户信息"
      :closable="false"
      v-model:visible="editUserModalVisible"
      @ok="handleEditUser"
      @cancel="cancelEditUser"
    >
      <a-form v-if="alterUser" ref="editUserForm" :model="alterUser">
        <a-form-item
          label="姓名"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 18 }"
        >
          <a-input v-model="alterUser.name" />
        </a-form-item>
        <a-form-item
          label="专业"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 18 }"
        >
          <a-input v-model="alterUser.major" />
        </a-form-item>
        <a-form-item
          label="班级"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 18 }"
        >
          <a-input v-model="alterUser.clazz" />
        </a-form-item>
        <a-form-item
          label="职称"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 18 }"
        >
          <a-input v-model="alterUser.title" />
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal
      title="重置密码"
      :closable="false"
      v-model:visible="alterPasswordModalVisible"
      @ok="handleAlterPassword"
      @cancel="cancelAlterPassword"
    >
      <a-form v-if="selectedUser" ref="alterPasswordForm" :model="selectedUser">
        <a-form-item
          label="输入新密码："
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 18 }"
        >
          <a-input v-model="selectedUser.password" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { h, onMounted, ref } from "vue";
import { UserControllerService } from "../../../generated";
import { IconSearch } from "@arco-design/web-vue/es/icon";
import message from "@arco-design/web-vue/es/message";
import async from "async";
import { fastKey } from "core-js/internals/internal-metadata";

export default {
  name: "UserAdmin",
  methods: { fastKey },

  setup() {
    let userData = ref([]);
    const addUserModalVisible = ref(false);
    const editUserModalVisible = ref(false);
    const alterPasswordModalVisible = ref(false);

    const newUser = ref({
      username: "",
      password: "",
      role: 0,
      name: "",
      major: "",
      clazz: "",
    });

    const alterUser = ref({
      id: " ",
      name: " ",
      major: " ",
      clazz: " ",
    });
    let searchName = ref("");
    const selectedUser = ref(null);
    const getUser = async () => {
      try {
        const res = await UserControllerService.getAllUsers(
          localStorage.getItem("token")
        );
        userData.value = res.data;
        console.log("allUsers:", userData.value);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const searchUser = async () => {
      try {
        const res = await UserControllerService.getUsersByNamePrefix(
          searchName.value,
          localStorage.getItem("token")
        );
        userData.value = res.data ? [res.data] : [];
        console.log("userData" + userData.value);
      } catch (error) {
        console.error("Error searching user:", error);
      }
    };

    const resetSearch = () => {
      searchName.value = "";
      getUser();
    };

    const userColumns = [
      {
        title: "账号ID",
        dataIndex: "id",
        key: "id",
        sortable: {
          sortDirections: ["ascend", "descend"],
        },
      },
      {
        title: "用户名",
        dataIndex: "username",
        key: "username",
        sortable: {
          sortDirections: ["ascend", "descend"],
        },
        filterable: {
          filter: (value, record) => record.username.includes(value),
          slotName: "name-filter",
          icon: () => h(IconSearch),
        },
      },
      {
        title: "角色",
        dataIndex: "role",
        key: "role",
        slotName: "role",
        filterable: {
          filters: [
            {
              text: "管理员",
              value: 0,
            },
            {
              text: "学生",
              value: 1,
            },
            {
              text: "教师",
              value: 2,
            },
            {
              text: "实验员",
              value: 3,
            },
          ],
          filter: (value, row) => row.role.toString().includes(value),
        },
      },
      {
        title: "操作",
        key: "action",
        slotName: "action",
      },
    ];
    const handleChange = (data, extra, currentDataSource) => {
      console.log("change", data, extra, currentDataSource);
    };
    const handleAddUser = async () => {
      try {
        const res = await UserControllerService.importUser(
          newUser.value,
          localStorage.getItem("token")
        );
        if (res.status === 100) {
          alert("操作成功");
          resetAddUserForm();
          await getUser();
          addUserModalVisible.value = false;
        } else {
          message.error("操作失败!  " + res.message + "  " + res.description);
        }
      } catch (error) {
        console.error("Error adding user:", error);
      }
    };

    const cancelAddUser = () => {
      addUserModalVisible.value = false;
      resetAddUserForm();
    };
    const resetAddUserForm = () => {
      newUser.value = {
        username: " ",
        password: " ",
        role: 0,
        name: " ",
        major: " ",
        clazz: " ",
        title: " ",
      };
    };
    const editUser = async (record) => {
      alterUser.value = { ...record };
      editUserModalVisible.value = true;
    };
    const handleEditUser = async () => {
      try {
        const res = await UserControllerService.alterUser(
          alterUser.value,
          localStorage.getItem("token")
        );
        if (res.status === 100) {
          alert("操作成功");
          await getUser();
          editUserModalVisible.value = false;
        } else {
          message.error("操作失败!  " + res.message + "  " + res.description);
        }
      } catch (e) {
        console.log(e);
      }
    };
    const cancelEditUser = () => {
      editUserModalVisible.value = false;
      alterUser.value = null;
    };
    const alterPassword = async (record) => {
      selectedUser.value = { id: record.id, newPassword: "" };
      alterPasswordModalVisible.value = true;
      //console.log(alterPasswordModalVisible);
    };
    const handleAlterPassword = async () => {
      try {
        const res = await UserControllerService.alterPassword(
          selectedUser.value,
          localStorage.getItem("token")
        );
        console.log(selectedUser.value);
        if (res.status === 100) {
          alert("密码重置成功！");
          alterPasswordModalVisible.value = false;
          selectedUser.value = null;
        } else {
          message.error("操作失败! " + res.message + " " + res.description);
        }
      } catch (error) {
        console.error("Error resetting password:", error);
      }
    };

    const cancelAlterPassword = () => {
      alterPasswordModalVisible.value = false;
      selectedUser.value = null;
    };

    const deleteUser = async (userId) => {
      try {
        const res = await UserControllerService.removeUser(
          userId,
          localStorage.getItem("token")
        );
        if (res.status === 100) {
          message.success("用户删除成功");
          await getUser();
        } else {
          message.error("删除失败! " + res.message + " " + res.description);
        }
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    };
    const showAddUserModal = () => {
      addUserModalVisible.value = true;
    };
    const getToken = () => {
      console.log(localStorage.getItem("token"));
    };
    const formatRole = (role) => {
      return role == 0
        ? "管理员"
        : role == 1
        ? "学生"
        : role == 2
        ? "教师"
        : "实验员";
    };
    onMounted(() => {
      getUser();
      getToken();
    });

    return {
      userData,
      userColumns,
      searchName,
      searchUser,
      resetSearch,
      handleChange,
      handleEditUser,
      alterPassword,
      cancelEditUser,
      addUserModalVisible,
      editUserModalVisible,
      alterPasswordModalVisible,
      cancelAlterPassword,
      handleAlterPassword,
      newUser,
      alterUser,
      editUser,
      handleAddUser,
      cancelAddUser,
      deleteUser,
      showAddUserModal,
      selectedUser,
      formatRole,
    };
  },
};
</script>

<style scoped>
.custom-filter {
  padding: 20px;
  background: var(--color-bg-5);
  border: 1px solid var(--color-neutral-3);
  border-radius: var(--border-radius-medium);
  box-shadow: 0 2px 5px rgb(0 0 0 / 10%);
}

.custom-filter-footer {
  display: flex;
  justify-content: space-between;
}

#userTable {
  max-width: 1500px;
}
</style>
