# Plano de design (processo do frontend-design)

- Cor (direção B, violeta-grafite, escolhida pelo cliente): fundo #0B0B14, painel #12121F, linhas #232336, texto #E8EEF2, apoio #8FA3B3, ação #6F5FE8 (texto branco, contraste 4,7:1), progresso #3fb97a. Cor só para ação primária e status. Paleta inspirada no clima do projeto de referência do Behance (tecnologia, privacidade, nuvem), não nas cores reais dele.
- Tipografia: Inter (pedida no prompt), títulos com espaçamento fechado, números tabulares, linhas de até ~65 caracteres.
- Layout: alinhado à esquerda, listas com divisores em vez de cards. Um único destaque: o painel de competências do hero.
- Evitar: faixa "número grande + rótulo", metadados com ponto médio, CTA repetindo o H1, animações de entrada em cada seção, emojis.
- Movimento: apenas transições de hover em links e botões; `prefers-reduced-motion` respeitado.
