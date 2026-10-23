export const routes = {
  home: '/',
  program: '/programa',
  checkout: '/checkout',
  plan: (id) => `/checkout?plano=${encodeURIComponent(id)}`,
}
