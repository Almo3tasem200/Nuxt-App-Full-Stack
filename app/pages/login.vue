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
    <div class="p-4 flex justify-center items-center grow ">
        <form
            class="flex flex-col gap-8 items-center bg-neutral-700 p-4 border border-neutral-700 rounded-2xl shadow-md backdrop-blur-lg"
            @submit.prevent="submitForm">
            <div class="flex justify-center items-center">
                <h1 class="text-4xl font-black">Sign Up</h1>
            </div>
            <div class="flex gap-4 flex-col">
                <div class="flex flex-col gap-0.5 items-center justify-center">
                    <label for="username" class="text-xs font-bold text-gray-400 uppercase">Username: </label>
                    <input v-model="form.username" type="text" name="username" autocomplete="none" id="username" />
                </div>

                <div class="flex flex-col gap-0.5 items-center justify-center">
                    <label for="password" class="text-xs font-bold text-gray-400 uppercase">Password: </label>
                    <input v-model="form.password" type="password" autocomplete="none" name="password" id="password" />
                </div>
            </div>

            <div class="flex w-full grow items-end">
                <button type="submit" class="w-full">
                    Submit
                </button>
            </div>
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