<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <form
      @submit.prevent="login"
      action="login"
      class="flex flex-col gap-2 w-1/2 border p-2 border-red-200 items-center justify-center"
    >
      <h2 class="text-xl font-semibold">Login Form</h2>
      <template v-for="{ name, type, placeholder } in loginForm" :key="name">
        <input-field
          :type="type"
          :placeholder="placeholder"
          :name="name"
          @update-value="handleChange"
        />
        <p
          v-if="validationError[name].length > 0"
          class="text-red-500 !text-left"
        >
          {{ validationError[name] }}
        </p>
      </template>
      <button
        :disabled="
          validationError.email.length > 0 ||
          validationError.password.length > 0 ||
          formValues.email.length === 0 ||
          formValues.password.length === 0
        "
        class="bg-weather-primary w-1/2 rounded-md py-2 text-center text-white outline-none focus:outline-none"
      >
        Login
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { InputField } from "../components";
import axios from "axios";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
const $toast = useToast();

const login = async () => {
  console.log("submit login");
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: formValues.email,
      password: formValues.password,
    }),
  };
  const response = await fetch(
    "http://192.168.100.16:3000/auth/admin/sign-in",
    requestOptions
  );
  const data = await response.json();
  console.log(response, "dataaaaaaaaaa")
  if(response.ok) {
    console.log(response, "response");
    $toast.success("Logged in!", {
      duration: 3000,
      position: "top-right",
    });
  } else {
    $toast.error(data.error.message, {
      duration:3000,
      position:"top-right"
    })
  }
  console.log(login, "login");
};
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

const validationError = reactive({
  email: "",
  password: "",
});

const handleChange = (e) => {
  const { name, value } = e.target;
  formValues[name] = value;
  switch (name) {
    case "email":
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        validationError.email = "";
      } else {
        validationError.email = "email is not valid!";
      }
      break;
  }
  console.log(validationError.email, "email error");
};
</script>

<style lang="scss" scoped></style>
