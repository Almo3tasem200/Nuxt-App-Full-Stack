<template>
    <div>
        <PageTitle colorClass="text-red-500">About</PageTitle>
        <h3>Your Counter {{ counter }}</h3>
    </div>
</template>

<script lang="ts" setup>
const counter = useState('count', () => 0);

definePageMeta({
    pageTransition: { name: 'rotate' }
})
</script>