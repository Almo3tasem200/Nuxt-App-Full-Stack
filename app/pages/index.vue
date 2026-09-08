<template>
    <div class="flex flex-col items-center justify-center">
        <NuxtImg format="webp" src="/sea_otter.jpg" alt="Sea Otter" class="w-1/2 h-auto mx-auto my-4" />
        <PageTitle>Hello World!</PageTitle>
        <div class="flex m-2">
            <h3>Counter: {{ counter }} </h3>
            <button class="mr-3 ml-3 bg-amber-700 border-2 p-1" @click="counter++;">Increment</button>
            <button v-if="counter != 0" class="bg-amber-700 border-2 p-1" @click="counter--;">Decrement</button>
            <button v-if="counter != 0" class="ml-3 mr-3 bg-amber-700 border-2 p-1" @click="counter = 0">Reset</button>
        </div>
        <NuxtLink :to="`/profiles/${counter}`" class="m-2 bg-amber-900 border-2 p-1">It's Profile</NuxtLink>
        <p v-if="pending">loading . . .</p>
        <ul v-else class="list-disc list-inside p-4">
            <li v-for="fruit in data?.fruits" :key="fruit.id">
                {{ fruit.name }}
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
const counter = useState<number>('count', () => 0);

const { data, pending } = useFetch("/api/hello", { server: false })

counter.value
useHead({
    title: 'My Awesome Website',

})
</script>