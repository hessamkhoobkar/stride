// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: "2024-07-02",
  css: ["~/assets/css/tailwind.css"],
  modules: ["@nuxtjs/tailwindcss", "shadcn-nuxt", "@nuxtjs/supabase"],
  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL || "http://localhost:3000",
    },
  },
  supabase: {
    redirectOptions: {
      login: "/login",
      callback: "/confirm",
      include: undefined,
      exclude: [],
      cookieRedirect: false,
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  shadcn: {
    prefix: "",
    componentDir: "./components/ui",
  },
});
