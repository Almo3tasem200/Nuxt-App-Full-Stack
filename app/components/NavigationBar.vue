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
        return null;
    }

    const result = await $fetch("/api/auth/verifytoken", {
        method: "POST",
        body: { token: token.value }
    })
    if (!result.success) {
        return null;
    }

    return result.user as JwtUserInfo;
}
</script>

<template>
    <nav class="flex justify-between p-4 bg-neutral-800 shadow-lg backdrop-blur-md" :key="refreshKey">
        <NuxtLink class="font-black tracking-tighter" to="/">The Best Website</NuxtLink>

        <TransitionGroup tag="ul" class="inline-flex gap-4 text-sm items-center" name="fade-nav">

            <li key="about">
                <NuxtLink to="/about">About</NuxtLink>
            </li>
            <div v-if="!user" key="guest" class="inline-flex gap-4">
                <li>
                    <NuxtLink to="/register">Register</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/login">Login</NuxtLink>
                </li>
            </div>
            <div v-else key="user" class="inline-flex gap-4">
                <div class="hover:text-neutral-300 cursor-pointer" @click="logout">
                    Logout
                </div>
                <div>
                    {{ user.username }}
                </div>
            </div>

        </TransitionGroup>
    </nav>
</template>

<style scoped>
.fade-nav-enter-active {
    transition: all 0.2s ease;
}

.fade-nav-enter-from {
    opacity: 0;
    transform: translateY(-10px);
}

.fade-nav-leave-to {
    opacity: 0;
    transform: translateY(10px);
}


.fade-nav-leave-active {
    position: absolute;
    right: 1rem;
}
</style>