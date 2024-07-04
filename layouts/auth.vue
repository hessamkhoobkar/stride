<template>
  <div
    class="grid min-h-screen w-full grid-cols-1 grid-rows-2 gap-2 bg-slate-200 md:p-4 lg:grid-cols-5 lg:grid-rows-1"
  >
    <Card class="col-span-1 row-span-1 lg:col-span-2">
      <CardContent class="h-full w-full p-6">
        <slot />
      </CardContent>
    </Card>
    <section class="col-span-1 row-span-1 lg:col-span-3">
      <LayoutWelcomeMessage />
    </section>
  </div>
</template>
