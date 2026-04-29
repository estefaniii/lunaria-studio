# 🌙 Guía Completa · Lunaria Studio

> **Documento de referencia** para mantenimiento, expansión y continuidad de la marca.
> Última actualización: abril 2026 · Autora: Estéfani Torres

---

## Tabla de contenido

1. [Resumen del proyecto](#1-resumen-del-proyecto)
2. [Stack tecnológico](#2-stack-tecnológico)
3. [Estructura de archivos](#3-estructura-de-archivos)
4. [Sistema de diseño](#4-sistema-de-diseño)
5. [Componentes UI](#5-componentes-ui)
6. [Páginas del sitio](#6-páginas-del-sitio)
7. [Funcionalidades JavaScript](#7-funcionalidades-javascript)
8. [Formulario de contacto](#8-formulario-de-contacto)
9. [SEO implementado](#9-seo-implementado)
10. [Servicios externos](#10-servicios-externos)
11. [Workflow de despliegue](#11-workflow-de-despliegue)
12. [Cómo expandir el sitio](#12-cómo-expandir-el-sitio)
13. [Solución de problemas](#13-solución-de-problemas)
14. [Accesos y contactos](#14-accesos-y-contactos)

---

## 1. Resumen del proyecto

**Lunaria Studio** es una agencia digital panameña fundada por Estéfani Torres en La Chorrera. Servicios: Diseño Web, Branding y Gestión Digital. El sitio web es 100% estático (HTML + CSS + JS sin backend), desplegado en Vercel con auto-deploy desde GitHub.

**Slogan:** *"Transformamos la complejidad digital en una identidad magnética."*
**Cierre de marca:** *"La luna no compite con el sol. Brilla con su propia luz."*

**Concepto visual:** cosmos / lunar / futurista — fondos oscuros con orbs morados, glassmorphism, luna como elemento simbólico recurrente, gradientes "aurora" (morado → rosa → dorado luna).

**URLs:**
- 🌐 **Producción:** `https://lunaria-studioo.vercel.app` (con doble "o")
- 💻 **Repo:** `https://github.com/estefaniii/lunaria-studio`
- 🎛 **Dashboard Vercel:** `https://vercel.com/estefaniiis-projects/lunaria-studio`

---

## 2. Stack tecnológico

### Frontend (sin frameworks pesados — código limpio y rápido)
| Tecnología | Para qué sirve |
|---|---|
| **HTML5 semántico** | Estructura de cada página |
| **CSS puro con Custom Properties** | Sistema de diseño, tokens reutilizables (`variables.css`) |
| **Vanilla JavaScript** | Interactividad: filtros, scroll progress, animaciones, fetch AJAX del form |
| **Google Fonts** | Tipografías (Space Grotesk, Inter, Instrument Serif, JetBrains Mono) |

### Servicios externos
| Servicio | Función | Costo |
|---|---|---|
| **Vercel** | Hosting + CDN + auto-deploy | Free |
| **GitHub** | Control de versiones del código | Free |
| **Formsubmit.co** | Backend del formulario de contacto (vía AJAX) | Free ilimitado |
| **Unsplash** | Imágenes stock para blog y casos | Free |

### Herramientas usadas durante la creación
| Programa | Para qué |
|---|---|
| **Claude Code (Anthropic)** | Asistente IA que generó/refactorizó todo el código |
| **Vercel CLI** (`npx vercel`) | Despliegue desde terminal |
| **GitHub CLI** (`gh`) | Crear repo, autenticación |
| **Git** | Versionado |
| **Python + PIL (Pillow)** | Generación de imágenes Open Graph |
| **Node.js v22** | Runtime del servidor de preview local |

---

## 3. Estructura de archivos

```
plantillas/lunaria-studio/html/
│
├── 📄 PÁGINAS (HTML)
│   ├── index.html              · Home
│   ├── servicios.html          · 3 servicios (Web, Branding, Gestión)
│   ├── casos.html              · Listado de casos de éxito
│   ├── caso-boutique.html      · Caso detallado
│   ├── nosotros.html           · Sobre Lunaria + fundadora
│   ├── blog.html               · Listado del blog (con filtros funcionales)
│   ├── contacto.html           · Formulario funcional con feedback visual
│   ├── gracias.html            · Página post-envío (no usada con AJAX, queda como respaldo)
│   ├── 404.html                · Página de error con luna como eclipse central
│   ├── privacidad.html         · Política de privacidad (Ley 81 PA)
│   ├── terminos.html           · Términos y condiciones
│   │
│   └── 📝 Blog posts
│       ├── post-errores-web.html
│       ├── post-triplicar-ventas.html (playbook educativo)
│       ├── post-logo-no-primero.html
│       ├── post-anatomia-hero.html
│       ├── post-copy-vende.html
│       └── post-sesgos-cognitivos.html
│
├── 🎨 css/
│   ├── variables.css           · Design tokens (colores, fuentes, espaciados)
│   └── styles.css              · Todos los componentes y estilos
│
├── ⚙️ js/
│   └── main.js                 · Toda la interactividad
│
├── 🖼 images/
│   ├── og-default.jpg          · OG image default (1200×630)
│   ├── og-home.jpg             · OG home
│   ├── og-servicios.jpg
│   ├── og-casos.jpg
│   ├── og-nosotros.jpg
│   ├── og-blog.jpg
│   ├── og-contacto.jpg
│   └── estefani.webp           · ⚠️ FALTA: foto de fundadora (subir aquí)
│
├── 🤖 SEO & infraestructura
│   ├── sitemap.xml             · Mapa del sitio para Google
│   ├── robots.txt              · Reglas de indexación
│   ├── vercel.json             · Config del hosting (cleanUrls, headers, redirects)
│   └── .gitignore              · Archivos que git ignora
│
├── 📦 Build / deploy
│   ├── package.json            · Dependencies (vercel CLI)
│   ├── package-lock.json
│   └── deploy.sh               · Script para deploy con un comando
│
└── 📚 Docs
    ├── README.md               · Documentación técnica
    └── GUIA-LUNARIA.md         · ESTE DOCUMENTO
```

---

## 4. Sistema de diseño

Todo el sistema de diseño vive en `css/variables.css`. Cambiar un valor ahí cambia el sitio entero.

### 4.1 Paleta de colores

```css
/* Fondos cósmicos */
--bg-primary: #06040D;       /* Negro cósmico */
--bg-secondary: #0B0817;
--bg-tertiary: #120D26;

/* Marca · paleta lunar */
--moon: #E8E4F3;             /* Crema luna */
--moon-warm: #F5E6C8;        /* Luna cálida */
--moon-glow: #FCD34D;        /* Dorado luna */
--purple-400: #A78BFA;       /* Lavanda principal */
--purple-500: #8B5CF6;
--purple-600: #7C3AED;       /* Morado profundo (acento) */
--pink-glow: #F0ABFC;        /* Rosa cósmico */
--cyan-glow: #67E8F9;
--rose-glow: #FB7185;        /* Rojo coral (errores) */

/* Texto */
--text-primary: #F4F3FF;
--text-secondary: #C4BFDD;
--text-muted: #8B86A8;

/* Gradientes "aurora" (signature) */
--gradient-aurora: linear-gradient(135deg, #A78BFA 0%, #F0ABFC 50%, #FCD34D 100%);
--gradient-cosmic: linear-gradient(135deg, #6D28D9 0%, #A78BFA 50%, #F0ABFC 100%);
--gradient-luna:   linear-gradient(135deg, #E8E4F3 0%, #F5E6C8 100%);
```

### 4.2 Tipografía

| Uso | Fuente |
|---|---|
| Display (titulares, navbar) | **Space Grotesk** |
| Cuerpo de texto | **Inter** |
| Acentos (italics, citas) | **Instrument Serif** |
| Monoespaciada (eyebrows, badges) | **JetBrains Mono** |

Todas se cargan desde Google Fonts en `styles.css`.

### 4.3 Tamaños fluidos (responsive sin media queries)

Usamos `clamp()` para que las fuentes escalen suavemente entre mobile y desktop.

### 4.4 Espaciados, radios, transiciones

| Token | Valor |
|---|---|
| `--space-4` | 1rem (16px) |
| `--space-8` | 2rem |
| `--space-16` | 4rem |
| `--radius-md` | 12px |
| `--radius-xl` | 28px |
| `--radius-full` | 9999px (pildora) |

### 4.5 Glows y favicon

- Favicon SVG embebido en cada `<link rel="icon">`: luna circular con gradient cream → cálido + 3 cráteres morados (mismo diseño del logo del header)
- Glows reutilizables: `--glow-purple`, `--glow-card-hover`, `--glow-moon`

---

## 5. Componentes UI

### 5.1 Navbar (`.nav`, `.nav-menu`, `.nav-cta`)
- Fixed top, glassmorphic con blur cuando se scrollea
- Logo de luna circular (`.nav-logo-mark`) con cráteres en `::before`
- Texto: **"LUNARIA · Studio · Panamá"** (sin "2026")
- Menú pill con backdrop-filter blur
- CTA primario "Empieza tu proyecto" con fondo cream
- Hamburger en mobile (<920px)

### 5.2 Menú móvil (`.nav-mobile`)
- Overlay full-screen con blur
- Items grandes (Space Grotesk, text-2xl)
- Botón CTA con tamaño ajustado (font-size normal del .btn) para que no desborde

### 5.3 Botones (`.btn`)
| Clase | Uso |
|---|---|
| `.btn-primary` | Fondo crema (luna) |
| `.btn-glow` | Gradient morado con glow + magnetic hover |
| `.btn-ghost` | Transparente con border |
| `.btn-lg` | Versión grande |

### 5.4 Hero (`.hero`)
- 3 orbs animados flotando (`.orb-1/2/3`)
- Hero badge: **"Estudio digital · Panamá"** (sin año)
- Stats orientados al cliente: **<24h** Tiempo de respuesta · **100%** Diseño a medida · **3** Servicios premium · **∞** Posibilidades creativas

### 5.5 Cards
- **Service card** (`.service-card`) — con mouse spotlight efecto
- **Blog card** (`.blog-card`) — con `data-category` para filtros
- **Case card** (`.case-card`) — con stats animados
- **Value card** (`.value-card`) — para secciones de valores
- **Testimonial** (`.testimonial`) — con avatar circular

### 5.6 Sections especiales
| Clase | Función |
|---|---|
| `.marquee` | Texto rodante infinito (servicios destacados) |
| `.manifesto` | Sección de USP con texto tachado |
| `.manifesto-pillars` | 3 pilares con iconos en gradient |
| `.process-grid` | Layout 2 cols con steps + visual lunar |
| `.stats` | Card glassmorphic con 4 counters |
| `.cta-final` | Card grande con gradient overlay + dual CTA |
| `.blog-filters` | Botones tipo pill para filtrar el blog |

### 5.7 Componentes únicos
- **Moon shape** (`.moon-shape`) — luna 3D con gradient + sombra inset
- **Orbits** (`.orbit-1`, `.orbit-2`) — círculos dashed rotatorios con planetas
- **Showcase grid** (`.showcase-grid`) — bento grid de imágenes
- **Eclipse 404** (`.e404-eclipse`) — luna gigante reemplaza el "0" del 404 con órbitas + estrellas titilantes + 2 estrellas fugaces

### 5.8 Form de contacto
- `.contact-form` — fondo glassmorphic, inputs custom, validación nativa
- `.form-input`, `.form-select`, `.form-textarea` — focus glow morado
- `.form-status` — mensaje grande con borde glow después del submit (success morado / error rojo coral)
- `.form-status-spinner` — spinner CSS para el estado "Enviando..."

### 5.9 Footer (`.footer`)
- Grid 4 cols con marca + 3 columnas de links
- Social icons circulares con hover glow
- Bottom bar con copyright y legal

### 5.10 Decorativos globales
- **Cosmic background** — fixed orbs y campo de estrellas en `body::before`/`::after`
- **Cursor glow** — círculo de luz que sigue al mouse (solo desktop)
- **Scroll progress** — barra de gradient en el top que avanza al scrollear
- **Back-to-top** — aparece al scroll > 800px

---

## 6. Páginas del sitio

| URL | Archivo | Schema.org JSON-LD |
|---|---|---|
| `/` | `index.html` | Organization + WebSite |
| `/servicios` | `servicios.html` | ItemList (3 services) |
| `/casos` | `casos.html` | (CollectionPage implícito) |
| `/caso-boutique` | `caso-boutique.html` | Article |
| `/nosotros` | `nosotros.html` | AboutPage |
| `/blog` | `blog.html` | (Blog) — con filtros funcionales |
| `/post-*` | 6 posts | BlogPosting (cada uno con `author` Estéfani) |
| `/contacto` | `contacto.html` | ContactPage |
| `/gracias` | `gracias.html` | (noindex, respaldo) |
| `/privacidad` | `privacidad.html` | — |
| `/terminos` | `terminos.html` | — |
| `/404` | `404.html` | — eclipse central, navegación de rescate |

---

## 7. Funcionalidades JavaScript

Todo en `js/main.js`. Es **vanilla JS sin frameworks**, dentro de un IIFE para no contaminar el global scope.

### Lista de features

1. **Sticky navbar** — añade clase `is-scrolled` cuando `scrollY > 20`
2. **Scroll progress bar** — calcula porcentaje de scroll y actualiza ancho de la barra
3. **Mobile menu** — abre/cierra con animación, bloquea body scroll, cierra con Escape
4. **Reveal on scroll** — `IntersectionObserver` añade `is-visible` a elementos `.reveal`
5. **Counters animados** — cuando entran en viewport, animan de 0 al valor `data-counter`
6. **Mouse spotlight en service cards** — sigue el mouse con custom property `--mx/--my`
7. **Process steps** — toggle de active state al hover/click
8. **Cursor glow** — círculo de luz que sigue al cursor (con lerp para suavidad)
9. **Hero orbs parallax** — orbs se mueven sutilmente con el mouse
10. **FAQ accordion** — toggle de `.is-open` con altura animada
11. **Smooth scroll** — links internos con scroll suave y offset
12. **Magnetic buttons** — botones primary/glow se "atraen" al cursor
13. **Form de contacto AJAX** — fetch a Formsubmit, mensajes de status, scroll automático
14. **Blog filters** — filtra cards por `data-category`, soporta "all"
15. **Back-to-top** — aparece al scroll > 800px

---

## 8. Formulario de contacto

### 8.1 Cómo funciona

El form en `/contacto` envía los datos con **fetch AJAX** al endpoint de **Formsubmit.co**:

```
POST https://formsubmit.co/ajax/estefanidelosangelestorres@gmail.com
```

No hay redirects ni recarga de página. El usuario ve la respuesta inmediatamente en pantalla.

### 8.2 Campos del form

| Campo | Required | Notas |
|---|---|---|
| `name` | ✓ | Nombre |
| `email` | ✓ | Email del cliente |
| `company` | — | Empresa o marca |
| `phone` | — | WhatsApp |
| `service` | ✓ | Servicio de interés (sin precios visibles, solo nombres) |
| `budget` | — | Rango de presupuesto |
| `message` | ✓ | Cuéntanos tu proyecto |
| `_honey` | — | Honeypot anti-spam (oculto) |

### 8.3 Estados y feedback

| Estado | Mensaje al usuario |
|---|---|
| **Cargando** | Spinner morado + "Enviando tu mensaje a Estéfani..." |
| **Éxito** | ✓ ¡Mensaje enviado! · Verde/morado con glow · scroll automático |
| **Activación pendiente** | ⚠ El formulario está fuera de servicio · email + WhatsApp como respaldo · datos del form se MANTIENEN |
| **Error genérico** | ⚠ No se pudo enviar · email + WhatsApp como respaldo · datos del form se MANTIENEN |

### 8.4 Activación inicial (HECHA UNA SOLA VEZ)

⚠️ **Importante:** Formsubmit pide activación la primera vez:

1. Cuando alguien envía el form por primera vez desde un dominio nuevo, Formsubmit envía un email a `estefanidelosangelestorres@gmail.com` con un botón "Activate Form".
2. **Click una sola vez en ese botón.** Listo.
3. A partir de ese momento, todos los envíos llegan automáticamente.

✅ Lunaria YA tiene activado el form (verificado en abril 2026).

### 8.5 Cómo cambiar el email destinatario

En `js/main.js`, busca:
```javascript
fetch('https://formsubmit.co/ajax/estefanidelosangelestorres@gmail.com', { ... })
```

Cambia el email por el nuevo. **Pero** Formsubmit pedirá activar el nuevo email — repite el paso de activación.

### 8.6 Cómo cambiar el subject del email que llega

En `js/main.js`, busca:
```javascript
_subject: `✦ Nuevo lead Lunaria · ${name}`,
```

### 8.7 Cómo cambiar los textos de los mensajes de status

En `js/main.js`, dentro del bloque del form, busca:
- Mensaje de éxito: `'<strong>✓ ¡Mensaje enviado!</strong>...'`
- Mensaje de error/activación: `'<strong>⚠ Hubo un problema al enviar.</strong>...'`

---

## 9. SEO implementado

### 9.1 Meta tags básicos
```html
<title>Página Name — Lunaria Studio | Keyword</title>
<meta name="description" content="...155 chars max..." />
<meta name="keywords" content="kw1, kw2, kw3" />
<meta name="author" content="Estéfani Torres" />
<meta name="robots" content="index, follow, max-image-preview:large" />
<link rel="canonical" href="https://lunariastudio.com/pagina.html" />
```

### 9.2 Open Graph (Facebook, LinkedIn, WhatsApp)
```html
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta property="og:image" content="https://lunariastudio.com/images/og-pagina.jpg" />
<meta property="og:url" content="..." />
<meta property="og:type" content="website" /> <!-- "article" en blog posts -->
<meta property="og:locale" content="es_PA" />
<meta property="og:site_name" content="Lunaria Studio" />
```

### 9.3 Twitter Cards
```html
<meta name="twitter:card" content="summary_large_image" />
```

### 9.4 Schema.org JSON-LD

**Organization** (en home):
```json
{ "@type": "Organization", "name": "Lunaria Studio",
  "founder": { "@type": "Person", "name": "Estéfani Torres" }, ... }
```

**BlogPosting** (en cada blog post):
```json
{ "@type": "BlogPosting",
  "headline": "...", "datePublished": "2026-04-08",
  "author": { "@type": "Person", "name": "Estéfani Torres" }, ... }
```

### 9.5 Sitemap, robots y OG Images
- `sitemap.xml` lista todas las URLs con prioridad y frecuencia
- `robots.txt` permite a todos los bots y referencia el sitemap
- OG Images 1200×630 generadas con Python + PIL en cosmic-style

---

## 10. Servicios externos

### 10.1 Vercel (hosting)

- **Cuenta:** estefaniii (en `estefaniiis-projects`)
- **URL pública:** `https://lunaria-studioo.vercel.app` (con doble "o")
- **Dashboard:** https://vercel.com/estefaniiis-projects/lunaria-studio
- **Conectado a:** GitHub repo `estefaniii/lunaria-studio` → auto-deploy en cada `git push`
- **Custom headers** en `vercel.json`: HSTS, X-Frame, Referrer-Policy, Cache-Control
- **Redirects** en `vercel.json`: `/about` → `/nosotros`, `/services` → `/servicios`, etc.

### 10.2 GitHub (código)

- **Repo:** https://github.com/estefaniii/lunaria-studio
- **Branch principal:** `main`
- **Email noreply usado:** `196740857+estefaniii@users.noreply.github.com` (para no exponer el email real)

### 10.3 Formsubmit.co (formulario)

- **Endpoint:** `https://formsubmit.co/ajax/estefanidelosangelestorres@gmail.com`
- **Plan:** Free ilimitado
- **Estado actual:** ✅ ACTIVADO (abril 2026)
- **Modo:** AJAX fetch desde el cliente — sin redirects, sin recarga de página
- **Configuración del POST:**
  ```json
  {
    "Nombre": "...",
    "Email": "...",
    "Empresa": "...",
    "WhatsApp": "...",
    "Servicio de interés": "...",
    "Presupuesto estimado": "...",
    "Mensaje": "...",
    "_subject": "✦ Nuevo lead Lunaria · NOMBRE",
    "_template": "table",
    "_captcha": "false"
  }
  ```

### 10.4 Unsplash (imágenes)

- Imágenes hotlinkeadas con URL `https://images.unsplash.com/photo-XXXXX?w=NNN&h=NNN&fit=crop&q=80`
- ⚠️ **Para producción robusta:** descargar y subir a `images/` propio del proyecto.

---

## 11. Workflow de despliegue

### 11.1 Cambio rápido en local

```bash
cd "ruta/al/folder/html"

# Editar lo que quieras (HTML, CSS, JS, imágenes)

git add -A
git commit -m "descripción del cambio"
git push
```

→ Vercel detecta el push y despliega automáticamente en ~30 segundos.

### 11.2 Preview local (sin desplegar)

```bash
cd "ruta/al/folder/html"
npx serve .
```

### 11.3 Deploy manual (sin git, no recomendado)

```bash
cd "ruta/al/folder/html"
./deploy.sh --prod
```

### 11.4 Ver deployments y aliases

```bash
npx vercel ls lunaria-studio
npx vercel alias ls
npx vercel inspect <URL>
```

---

## 12. Cómo expandir el sitio

### 12.1 Añadir un nuevo blog post

1. Copia un post existente como base (ej: `post-anatomia-hero.html`)
2. Renombra: `post-mi-tema.html`
3. Edita en `<head>`:
   - `<title>` (max 60 chars)
   - `<meta name="description">` (max 155 chars)
   - `<meta name="keywords">`
   - `<link rel="canonical">`
   - Bloque `application/ld+json` (BlogPosting)
   - Open Graph + Twitter cards
4. Edita en `<body>`:
   - `.article-meta-top` (categoría, min lectura, fecha)
   - `<h1 class="article-title">`
   - `<figure class="article-cover">` (imagen hero)
   - `.article-body` (contenido)
   - El avatar del autor: `<img class="article-author-avatar" src="images/estefani.webp" alt="Estéfani Torres" />`
5. Añade tarjeta nueva en `blog.html` con `data-category` correcta:
   ```html
   <a href="post-mi-tema.html" class="blog-card reveal delay-1" data-category="branding">
     ...
   </a>
   ```
   Categorías válidas: `neuromarketing`, `diseno`, `branding`, `casos`, `tips`
6. Añade `<url>` al `sitemap.xml`
7. Commit + push

### 12.2 Añadir una nueva página

1. Copia `nosotros.html` como base estructural
2. Renombra: `mi-pagina.html`
3. Cambia toda la metadata y contenido
4. Añade link en navbar de TODAS las páginas:
   ```html
   <li><a href="mi-pagina.html">Título</a></li>
   ```
5. Añade link al footer de todas (sección "Estudio")
6. Añade entrada al `sitemap.xml`
7. Commit + push

### 12.3 Cambiar la paleta de colores

En `css/variables.css`:
```css
:root {
  --purple-400: #TU_COLOR;   /* afecta todo el sitio */
}
```

### 12.4 Cambiar tipografía

En `css/styles.css` busca el `@import` de Google Fonts y reemplaza. Luego en `variables.css`:
```css
--font-display: 'TuFuente', sans-serif;
```

### 12.5 Añadir una nueva sección al home

Cada sección sigue este patrón:
```html
<section id="mi-seccion">
  <div class="container">
    <div class="services-header">
      <span class="section-eyebrow reveal">Eyebrow</span>
      <h2 class="section-title reveal delay-1">Tu título <span class="italic-serif text-gradient">elegante</span></h2>
      <p class="section-subtitle reveal delay-2">Subtítulo aquí.</p>
    </div>
    <!-- tu contenido -->
  </div>
</section>
```

### 12.6 Subir tu foto de fundadora

1. Recorta tu foto cuadrada (idealmente 800×800 o más)
2. Conviértela a `.webp` (usa https://squoosh.app)
3. Guárdala como `images/estefani.webp`
4. Commit + push

Aparece automáticamente en:
- `/nosotros` (sección hero)
- Todos los blog posts (avatar de autora)

### 12.7 Cambiar precios o servicios

Editar `servicios.html`. Cada servicio es un `<article class="service-card">` con su propio bloque.

### 12.8 Cambiar mensaje de "gracias" del form

En `js/main.js`, busca el bloque `if (isSuccess)` y modifica el texto dentro de `setStatus('success', '...', true)`.

### 12.9 Conectar tu dominio propio (cuando lo compres)

1. Comprar dominio en Namecheap, GoDaddy, Cloudflare, etc.
2. En Vercel: Project Settings → Domains → Add → escribir tu dominio
3. Vercel te da los DNS records (un A record y un CNAME)
4. Pegarlos en tu registrador
5. Esperar 5-30 min para que propague
6. Vercel auto-genera certificado SSL (HTTPS)
7. Actualizar `<link rel="canonical">` y `og:url` en TODAS las páginas con el dominio nuevo
8. Actualizar `sitemap.xml` con las URLs nuevas

### 12.10 Cambiar el texto del 404

Editar `404.html`. El copy principal está en:
- `.e404-title` — "Esta luna se perdió en otra galaxia"
- `.e404-subtitle` — texto de explicación
- `.e404-rescue` — links de navegación de rescate

---

## 13. Solución de problemas

### Problema: el form muestra "⚠ Hubo un problema al enviar"
- **Causa probable 1:** activación pendiente de Formsubmit
  - **Solución:** revisa Gmail (incluyendo Spam/Promociones), busca email de `noreply@formsubmit.co`, click en "Activate Form"
- **Causa probable 2:** caché del navegador con JS viejo
  - **Solución:** hard reload `Cmd+Shift+R` (Mac) o `Ctrl+Shift+R` (Win)

### Problema: el mensaje "✓ ¡Mensaje enviado!" no aparece después del submit
- **Causa probable:** caché del navegador con JS viejo
  - **Solución 1:** hard reload (Cmd+Shift+R)
  - **Solución 2:** modo incógnito para descartar caché completamente

### Problema: cambios no aparecen después de `git push`
- **Causa probable:** Vercel está construyendo o caché del navegador
- **Solución:**
  1. Espera 30-60 segundos
  2. Hard reload: `Cmd+Shift+R`
  3. Verifica el deploy en Vercel dashboard

### Problema: imágenes de Unsplash no cargan
- **Causa probable:** URLs cambiaron o son hotlinkeadas y bloqueadas
- **Solución:** descargar la imagen y subirla a `images/` propio. Reemplazar URL en HTML.

### Problema: el favicon sigue mostrando el viejo
- **Solución:** hard reload, vaciar caché, o probar en modo incógnito

### Problema: el sitio devuelve 401 (Unauthorized)
- **Causa probable:** Vercel Authentication activado en el proyecto
- **Solución:** Vercel dashboard → Settings → Deployment Protection → cambiar a "None"

### Problema: bug en el filtro del blog
- **Solución:** abrir `blog.html`, verificar que cada `<a class="blog-card">` tenga `data-category="..."` con uno de: `neuromarketing`, `diseno`, `branding`, `casos`, `tips`

### Problema: el botón del menú móvil se sale del contenedor
- **Solución:** verificar en `css/styles.css` que existe la regla `.nav-mobile a.btn { font-size: var(--text-sm); margin-top: var(--space-4); }` (sobrescribe el text-2xl del menú)

### Problema: el mailto del form viejo redirigía a GoDaddy
- **Causa:** versión anterior usaba Formsubmit con `_next` apuntando a un dominio no comprado
- **Solución (ya aplicada):** ahora usamos AJAX puro, sin redirects, sin `_next`

---

## 14. Accesos y contactos

### 14.1 Accesos importantes

| Servicio | URL |
|---|---|
| Vercel dashboard | https://vercel.com/estefaniiis-projects/lunaria-studio |
| GitHub repo | https://github.com/estefaniii/lunaria-studio |
| Sitio en producción | https://lunaria-studioo.vercel.app |
| Inbox de leads | estefanidelosangelestorres@gmail.com |
| Formsubmit (no requiere login) | https://formsubmit.co/ |

### 14.2 Comandos útiles para terminal

```bash
# Trabajar en el proyecto
cd "/Users/humbertotorres/Downloads/agente de páginas web/plantillas/lunaria-studio/html"

# Ver estado de los cambios
git status

# Ver historial de cambios
git log --oneline -10

# Subir cambios
git add -A && git commit -m "tu mensaje" && git push

# Ver deploys recientes
npx vercel ls lunaria-studio

# Promover un deploy a producción manualmente
npx vercel --prod
```

### 14.3 Datos de la marca

- **Marca:** Lunaria Studio
- **Fundadora:** Estéfani Torres
- **Email:** estefanidelosangelestorres@gmail.com
- **WhatsApp:** +507 6778-2931
- **Ubicación:** La Chorrera, Panamá Oeste, Panamá

### 14.4 Servicios y precios (referencia interna · NO mostrados en el form)

- Página Web: desde $800 (proyecto único)
- Branding: desde $450 (pack completo)
- Gestión Digital: desde $350/mes

⚠️ Los precios NO aparecen en el sitio público (solo el rango de presupuesto en el form). Esto es intencional: queremos que el usuario nos contacte para personalizar la propuesta.

---

## 🌙 Cierre

Este documento es **un mapa**, no un manual estricto. Cada vez que añadas algo nuevo, **actualízalo aquí** para que el próximo desarrollador (o tú misma en 6 meses) tenga claridad.

> *"La luna no compite con el sol. Brilla con su propia luz."*
> — Estéfani Torres, Fundadora

— Documento generado con cariño en Lunaria Studio · 2026
