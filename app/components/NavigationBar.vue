<script lang="ts" setup>

const refreshKey = useState<number>("navbarRefreshKey", () => 0);


const { data: user } = await useAsyncData("navbar-user", verifyAuth, {
    watch: [refreshKey]
})

async function logout() {
    useCookie("jwt_token").value = undefined;
    refreshKey.value++;
}

async function verifyAuth() {
    const token = useCookie("jwt_token");

    if (!token.value) {
        return;
    }

    const result = await $fetch("/api/auth/verifytoken", {
        method: "POST",
        body: { token: token.value }
    })
    if (!result.success) {
        return;
    }

    return result.user as JwtUserInfo;
}
</script>

<template>
    <nav class="flex justify-between p-4 bg-neutral-800" :key="refreshKey">
        <NuxtLink to="/">Website</NuxtLink>
        <ul class="inline-flex gap-4">
            <li>
                <NuxtLink to="/about">About</NuxtLink>
            </li>
            <div v-if="!user" class="inline-flex gap-4">
                <li>
                    <NuxtLink to="/register">Register</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/login">Login</NuxtLink>
                </li>
            </div>
            <div v-else class="inline-flex gap-4">
                <div class="hover:text-neutral-300 cursor-pointer" @click="logout">
                    Logout
                </div>
                <div>
                    {{ user.username }}
                </div>
            </div>
        </ul>
    </nav>
</template>