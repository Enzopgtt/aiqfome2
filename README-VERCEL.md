# Publicar o aiqfome no Vercel

Este projeto é uma aplicação React/Vite estática. A opção recomendada é usar o pacote de código-fonte, porque ele permite editar o site depois.

## Opção 1 — código-fonte completo

Baixe `aiqfome-vercel-source.zip`, descompacte e importe a pasta no Vercel.

Se o Vercel perguntar pelas configurações, use:

- **Framework Preset:** Vite
- **Install Command:** `pnpm install --frozen-lockfile`
- **Build Command:** `pnpm build:static`
- **Output Directory:** `dist/public`

O arquivo `vercel.json` já vem incluído com essas configurações. Portanto, em geral, basta importar o projeto e clicar em **Deploy**.

## Opção 2 — versão estática pronta

Baixe `aiqfome-vercel-static.zip` e descompacte o conteúdo. Essa pasta já contém o `index.html`, JavaScript, CSS, favicon e manifesto de rotas compilados.

Use essa opção quando quiser publicar rapidamente sem editar o código. No Vercel, crie um novo projeto e envie a pasta descompactada como projeto estático. Não defina um novo comando de build; os arquivos já estão prontos.

## Observações

As imagens da homepage são carregadas de URLs públicas do Unsplash. Para usar imagens próprias, substitua as URLs no arquivo `client/src/pages/Home.tsx` e publique novamente.

O carrinho usa `localStorage` para preservar itens no navegador. O formulário de busca, os filtros, favoritos, localização e carrinho são interações de frontend demonstrativas e não estão conectados a um backend de pedidos real.
