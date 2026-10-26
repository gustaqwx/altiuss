export const routes = {
  home: '/',
  program: '/programa',
  checkout: '/checkout',
  plan: (id) => `/checkout?plano=${encodeURIComponent(id)}`,
  privacy: '/privacidade',
  terms: '/termos',
}

export const flags = {
  LEGAL_DRAFT: true,
  ASSISTANT_PUBLIC: false,
}
