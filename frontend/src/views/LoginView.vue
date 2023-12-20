<template>
  <div class="flex flex-col  items-center justify-center h-screen">
      <form
      @submit.prevent="login"
      action="login"
      class="flex flex-col gap-2 w-1/2 border p-4 border-red-200 items-center justify-center"
      >
      <h2 class="text-xl font-semibold">
          Login Form
      </h2>
      <template v-for="{ name, type, placeholder } in loginForm" :key="name">
        <input-field
          :type="type"
          :placeholder="placeholder"
          :name="name"
          @update-value="changeHandler"
        />
      </template>
      <button class="bg-weather-primary w-1/2 rounded-md py-2 text-center text-white outline-none focus:outline-none">Login</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { InputField } from "../components";
function login() {
  console.log("submit login");
  console.log(formValues, "formValues");
}
const loginForm = [
  {
    type: "text",
    name: "email",
    placeholder: "Email:",
  },
  {
    type: "password",
    name: "password",
    placeholder: "Password",
  },
];

const formValues = reactive({
  email: "",
  password: "",
});

const changeHandler = (e: any) => {
  const { name, value } = e.target;
  formValues[name] = value;
};
</script>

<style lang="scss" scoped></style>
