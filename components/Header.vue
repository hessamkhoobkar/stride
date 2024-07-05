<template>
  <header
    class="flex h-16 items-center justify-between rounded-2xl bg-card px-4"
  >
    <div>
      <h1 class="sr-only">Stride</h1>
      <NuxtLink to="/">
        <span class="text-3xl font-black tracking-tighter">Stride</span>
      </NuxtLink>
    </div>
    <div class="ms-auto flex">
      <HeaderUserMenu />
    </div>
  </header>
</template>
