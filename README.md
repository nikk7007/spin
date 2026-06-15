# Spin — Roleta Online

Roleta online grátis para sortear nomes, itens e tomar decisões. Site estático
hospedado no GitHub Pages em **https://spin.nikolasleme.com.br**.

## Estrutura

- `index.html` — a roleta (app)
- `css/`, `js/` — estilos e lógica
- `404.html` — redireciona pra raiz
- `CNAME` — domínio custom do GitHub Pages
- `robots.txt`, `sitemap.xml` — SEO / indexação
- `favicon.svg`, `site.webmanifest` — ícone e PWA
- `og-image.png` — imagem de compartilhamento (1200×630, WhatsApp/Twitter/etc.)

## Como publicar no domínio spin.nikolasleme.com.br

1. **GitHub Pages**: em _Settings → Pages_, defina a branch `main` (pasta `/root`).
   O arquivo `CNAME` já configura o domínio `spin.nikolasleme.com.br`.

2. **DNS** (no painel do domínio `nikolasleme.com.br`): crie um registro
   **CNAME** apontando o subdomínio para o GitHub Pages:

   | Tipo  | Nome   | Valor                |
   | ----- | ------ | -------------------- |
   | CNAME | `spin` | `nikk7007.github.io` |

3. Aguarde a propagação do DNS e marque **Enforce HTTPS** no GitHub Pages.

## SEO — o que já está configurado

- `<title>`, `description` e `keywords` focados em "roleta online" e "sortear nomes"
- `<h1>` e seção de conteúdo indexável (a app é um `<canvas>`, então o texto do
  rodapé é o que o Google lê)
- Open Graph + Twitter Card com `og-image.png` para os compartilhamentos
- Dados estruturados (`WebApplication` + `FAQPage`) em JSON-LD
- `canonical`, `robots`, `sitemap.xml` e `robots.txt`

### Próximos passos (manuais)

- Registrar o site no [Google Search Console](https://search.google.com/search-console)
  e enviar o `sitemap.xml` para acelerar a indexação.
- Substituir `ca-pub-XXXXXXXXXXXXXXXXX` no `index.html` pelo seu ID do AdSense
  (ou remover os blocos de anúncio).

### Regerar a imagem de compartilhamento

O `og-image.png` foi gerado a partir de um template HTML com o Edge headless. Se
quiser mudar, recrie o HTML 1200×630 e rode:

```powershell
& "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" `
  --headless=new --disable-gpu --window-size=1200,630 `
  --screenshot="og-image.png" "file:///caminho/para/og-image.html"
```
