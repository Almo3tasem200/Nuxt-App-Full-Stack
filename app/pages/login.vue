<script lang="ts" setup>

const error = ref<string | null>(null);
const navbarRefreshKey = useState<number>("navbarRefreshKey", () => 0);

async function submitForm() {
    error.value = null;
    if (!form.username) {
        error.value = "You must specify a username!"
        return;
    }
    if (!form.password) {
        error.value = "You must specify a password!"
        return;
    }

    const result = await $fetch.raw('/api/auth/login', {
        method: 'POST',
        body: { username: form.username, password: form.password },
        async onResponseError({ response }) {
            if (response.status === 401) {
                error.value = (response._data).message;
                return;
            }
        }
    })

    if (!result.ok) {
        error.value = "Something went wrong while logging in! Please contact an adminstration.";
        return;
    }

    if (!(result._data && result._data.token)) {
        error.value = "There was an issue with the data body from the response. Contact an admin."
        return;
    }

    useCookie("jwt_token").value = result._data.token;
    navbarRefreshKey.value++;
    await navigateTo("/");
}

const form = reactive({
    username: '',
    password: ''
})

</script>

<template>
    <div class="register-page p-4">
        <form class="flex flex-col gap-2 items-center border-2 p-4" @submit.prevent="submitForm">
            <title>Sign In</title>
            <h1 class="m-3">Log In</h1>
            <div class="flex gap-2 items-center justify-center">
                <label for="username">Username: </label>
                <input v-model="form.username" type="text" name="username" id="username" />
            </div>

            <div class="flex gap-2 items-center justify-center">
                <label for="password">Password: </label>
                <input v-model="form.password" type="password" name="password" id="password" />
            </div>

            <button type="submit" class="px-6!">
                Submit
            </button>
            <div class="flex items-center justify-center text-red-500" v-if="error">
                {{ error }}
            </div>
        </form>
    </div>
</template>

<style scoped>
@import "tailwindcss";

input,
button {
    @apply bg-neutral-700 border border-neutral-500 p-2 rounded-full m-3;
}
</style>