<template>
    <div class="w-full h-full ">
        <div>
            <section class="bg-blue-800 p-4 h-140 shadow-md flex flex-col items-center justify-center">
                <h1 class="text-4xl font-black  tracking-tight">The Best Website you'll ever see</h1>
                <p class="text-slate-400 font-medium text-shadow-2xs tracking-tight">Welcome to our amazing website!</p>
            </section>
            <section
                class="bg-blue-500 h-140 shadow-md flex flex-col items-center justify-center gap-10 cursor-pointer hover:brightness-95 transition-all duration-300 ease-in-out">
                <div class="flex flex-col items-center justify-center gap-3">
                    <h3 class="text-3xl font-bold">Counter: {{ counter }} click<span v-if="counter > 1">s</span>
                    </h3>
                    <div class="flex items-center justify-center m-4">
                        <button
                            class=" text-slate-300 font-medium text-shadow-2xs tracking-tight mr-3 ml-3 bg-blue-800 border-2 p-1 cursor-pointer hover:brightness-95 w-30 rounded-xl shadow-lg"
                            @click="counter++;">Increment</button>
                        <button v-if="counter != 0"
                            class="text-slate-300 font-medium text-shadow-2xs tracking-tight bg-blue-800 border-2 p-1 cursor-pointer hover:brightness-95 w-30 rounded-xl shadow-lg"
                            @click="counter--;">Decrement</button>
                        <button v-if="counter != 0"
                            class="text-slate-300 font-medium text-shadow-2xs tracking-tight ml-3 mr-3 bg-blue-800 border-2 p-1 cursor-pointer hover:brightness-95 w-30 rounded-xl shadow-lg"
                            @click="counter = 0">Reset</button>
                    </div>
                    <NuxtLink :to="`/profiles/${counter}`" class="m-2 bg-blue-900 border-2 p-1 rounded-xl shadow-lg">
                        It's Profile</NuxtLink>

                </div>
            </section>
            <section class="bg-amber-800 p-4 h-140 shadow-md flex flex-col items-center ">
                <div class="h-1/3 flex items-center">
                    <h1 class="text-5xl font-black  tracking-tight">
                        Our Fruits List!
                    </h1>
                </div>
                <div class="text-xl p-4 text-neutral-200">
                    <ClientOnly>
                        <p v-if="pending">loading . . .</p>
                        <ul v-else class="list-disc list-inside p-4">
                            <li v-for="fruit in data?.fruits" :key="fruit.id">
                                {{ fruit.name }}
                            </li>
                        </ul>
                    </ClientOnly>
                </div>
                <div>
                    <NuxtImg format="webp" src="/sea_otter.jpg" alt="Sea Otter" loading="lazy" width="200" height="200"
                        class="rounded-xl shadow-lg mt-6" />
                </div>
            </section>
        </div>
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

<!-- class="flex flex-col items-center justify-center" -->
<!-- <NuxtImg format="webp" src="/sea_otter.jpg" alt="Sea Otter" class="w-auto h-auto mx-auto my-4" />
        <PageTitle>Hello World!</PageTitle>
        <div class="flex m-2">
            <h3>Counter: {{ counter }} </h3>
            <button class="mr-3 ml-3 bg-blue-600 border-2 p-1" @click="counter++;">Increment</button>
            <button v-if="counter != 0" class="bg-blue-600 border-2 p-1" @click="counter--;">Decrement</button>
            <button v-if="counter != 0" class="ml-3 mr-3 bg-blue-600 border-2 p-1" @click="counter = 0">Reset</button>
        </div>
        <NuxtLink :to="`/profiles/${counter}`" class="m-2 bg-blue-900 border-2 p-1">It's Profile</NuxtLink>

        <ClientOnly>
            <p v-if="pending">loading . . .</p>
            <ul v-else class="list-disc list-inside p-4">
                <li v-for="fruit in data?.fruits" :key="fruit.id">
                    {{ fruit.name }}
                </li>
            </ul>
        </ClientOnly> -->