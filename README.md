# Lunaria Studio — Sitio web

Sitio web estático de **Lunaria Studio** — agencia digital fundada por **Estéfani Torres** en La Chorrera, Panamá.

## Estructura

```
html/
├── index.html              · Home
├── servicios.html          · Servicios (Web · Branding · Gestión Digital)
├── casos.html              · Casos de éxito
├── nosotros.html           · Sobre Lunaria + fundadora
├── blog.html               · Listado del blog
├── contacto.html           · Formulario funcional (Formsubmit)
├── gracias.html            · Página post-envío del formulario
├── privacidad.html         · Política de privacidad (Ley 81 PA)
├── terminos.html           · Términos y condiciones
├── 404.html                · Página de error
├── post-*.html             · 6 artículos de blog completos
├── caso-boutique.html      · Caso de estudio detallado
├── css/                    · Tokens y estilos
├── js/main.js              · Interacciones
├── images/                 · OG images + assets
├── sitemap.xml             · SEO
├── robots.txt              · SEO
└── vercel.json             · Config para Vercel
```

## Despliegue a Vercel

### Opción A · Desde la terminal (recomendado)

```bash
cd "ruta/al/folder/html"
npx vercel              # primer despliegue (preview)
npx vercel --prod       # despliegue a producción
```

Vercel pedirá:
1. **Login con email** (te llega un link de confirmación)
2. **Confirmar nombre del proyecto** (sugerido: `lunaria-studio`)
3. **Detección automática:** "Other / static" — sin build command
4. **Output directory:** `.` (la carpeta actual)

Después del primer deploy, conectas tu dominio personalizado desde el dashboard de Vercel:
`Settings → Domains → Add → lunariastudio.com`

### Opción B · Desde la web de Vercel

1. Subir todo el contenido de `html/` a un repo de GitHub.
2. Ir a [vercel.com/new](https://vercel.com/new).
3. Importar el repo. Vercel detecta automáticamente que es estático.
4. Click "Deploy".

## Formulario de contacto

Usa **Formsubmit.co** (gratis, sin cuenta necesaria).

⚠️ **Primera activación:** la primera vez que alguien envíe el formulario, Estéfani recibirá un email de Formsubmit con un link de confirmación. Hay que **hacer click en ese link UNA VEZ** para activar el envío real. Después de eso, los mensajes llegan directo a `estefanidelosangelestorres@gmail.com`.

Configurado con:
- Subject: `✦ Nuevo lead desde Lunariastudio.com`
- Auto-respuesta automática al cliente
- Honeypot anti-spam
- Redirect a `/gracias.html`

## SEO

Cada página tiene:
- Meta title único (< 60 char)
- Meta description única (< 155 char)
- Canonical URL
- Open Graph (og:title, og:description, og:image, og:url, og:type)
- Twitter Cards
- Author: `Estéfani Torres` (en blog posts también `article:author`)
- Schema.org JSON-LD (Organization, ContactPage, BlogPosting, ItemList, AboutPage)

OG images dimensiones: 1200×630 (estándar Facebook/LinkedIn).

## Blog

6 artículos publicados con autoría de Estéfani Torres:

| Slug | Categoría | Min |
|------|-----------|-----|
| post-errores-web | Neuromarketing | 6 |
| post-triplicar-ventas | Caso de estudio | 8 |
| post-logo-no-primero | Branding | 5 |
| post-anatomia-hero | Diseño Web | 7 |
| post-copy-vende | Tips PYME | 4 |
| post-sesgos-cognitivos | Neuromarketing | 9 |

Para añadir un nuevo post, copiar uno existente y modificar:
- `<title>`, `<meta name="description">`, `<meta name="keywords">`
- Bloque `application/ld+json` (BlogPosting)
- `<h1>` y contenido del artículo
- Añadir `<url>` al `sitemap.xml`
- Añadir tarjeta nueva en `blog.html`

## Contacto

- **Estéfani Torres** · Fundadora
- estefanidelosangelestorres@gmail.com
- +507 6778-2931
- La Chorrera · Panamá
