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
8. [SEO implementado](#8-seo-implementado)
9. [Servicios externos](#9-servicios-externos)
10. [Workflow de despliegue](#10-workflow-de-despliegue)
11. [Cómo expandir el sitio](#11-cómo-expandir-el-sitio)
12. [Solución de problemas](#12-solución-de-problemas)
13. [Accesos y contactos](#13-accesos-y-contactos)

---

## 1. Resumen del proyecto

**Lunaria Studio** es una agencia digital panameña fundada por Estéfani Torres en La Chorrera. Servicios: Diseño Web, Branding y Gestión Digital. El sitio web es 100% estático (HTML + CSS + JS sin backend), desplegado en Vercel con auto-deploy desde GitHub.

**Slogan:** *"Transformamos la complejidad digital en una identidad magnética."*
**Cierre de marca:** *"La luna no compite con el sol. Brilla con su propia luz."*

**Concepto visual:** cosmos / lunar / futurista — fondos oscuros con orbs morados, glassmorphism, luna como elemento simbólico recurrente, gradientes "aurora" (morado → rosa → dorado luna).

---

## 2. Stack tecnológico

### Frontend (sin frameworks pesados — código limpio y rápido)
| Tecnología | Para qué sirve |
|---|---|
| **HTML5 semántico** | Estructura de cada página |
| **CSS puro con Custom Properties** | Sistema de diseño, tokens reutilizables (`variables.css`) |
| **Vanilla JavaScript** | Interactividad: filtros, scroll progress, animaciones, formulario |
| **Google Fonts** | Tipografías (Space Grotesk, Inter, Instrument Serif, JetBrains Mono) |

### Servicios externos
| Servicio | Función | Costo |
|---|---|---|
| **Vercel** | Hosting + CDN + auto-deploy | Free |
| **GitHub** | Control de versiones del código | Free |
| **Formsubmit.co** | Backend del formulario de contacto (sin código) | Free |
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
│   ├── blog.html               · Listado del blog (con filtros)
│   ├── contacto.html           · Formulario funcional
│   ├── gracias.html            · Página post-envío del formulario
│   ├── 404.html                · Página de error con luna eclipse
│   ├── privacidad.html         · Política de privacidad (Ley 81 PA)
│   ├── terminos.html           · Términos y condiciones
│   │
│   └── 📝 Blog posts
│       ├── post-errores-web.html
│       ├── post-triplicar-ventas.html (playbook)
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
--rose-glow: #FB7185;

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

| Uso | Fuente | Comentario |
|---|---|---|
| Display (titulares, navbar) | **Space Grotesk** | Geométrica, futurista |
| Cuerpo de texto | **Inter** | Premium, legible |
| Acentos (italics, citas) | **Instrument Serif** | Elegancia editorial |
| Monoespaciada (eyebrows, badges) | **JetBrains Mono** | Tech feel |

Todas se cargan desde Google Fonts en `styles.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700;800&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap');
```

### 4.3 Tamaños fluidos (responsive sin media queries)

Usamos `clamp()` para que las fuentes escalen suavemente entre mobile y desktop:
```css
--text-base: clamp(0.95rem, 0.92rem + 0.15vw, 1.05rem);
--text-2xl:  clamp(1.8rem, 1.5rem + 1.5vw, 2.4rem);
--text-hero: clamp(2.8rem, 2rem + 5.5vw, 6.5rem);
```

### 4.4 Espaciados, radios, transiciones

| Token | Valor |
|---|---|
| `--space-4` | 1rem (16px) |
| `--space-8` | 2rem |
| `--space-16` | 4rem |
| `--radius-md` | 12px |
| `--radius-xl` | 28px |
| `--radius-full` | 9999px (pildora) |
| `--transition-base` | 250ms cubic-bezier(0.25, 1, 0.5, 1) |
| `--ease-out-expo` | curva de animación premium |

### 4.5 Glows (efectos de brillo)

```css
--glow-purple: 0 0 40px rgba(167, 139, 250, 0.35);
--glow-card-hover: 0 20px 60px -15px rgba(167, 139, 250, 0.35);
--glow-moon: 0 0 100px rgba(232, 228, 243, 0.15);
```

---

## 5. Componentes UI

Todos los componentes están en `css/styles.css`. Cada uno se identifica por una clase principal.

### 5.1 Navbar (`.nav`, `.nav-menu`, `.nav-cta`)
- Fixed top, glassmorphic con blur cuando se scrollea
- Logo de luna circular (`.nav-logo-mark`) con cráteres en `::before`
- Menú pill con backdrop-filter blur
- CTA primario con fondo cream (luna)
- Hamburger en mobile (`<920px`)

### 5.2 Botones
| Clase | Estilo |
|---|---|
| `.btn-primary` | Fondo crema (luna) — usado en CTAs principales |
| `.btn-glow` | Gradient morado con glow + magnetic hover |
| `.btn-ghost` | Transparente con border — secundario |
| `.btn-lg` | Versión grande |

### 5.3 Hero (`.hero`)
- 3 orbs animados flotando (`.orb-1/2/3`)
- Hero badge tipo pildora con dot pulsante
- Título con `text-gradient` y `italic-serif`
- Stats en grid glassmorphic con counters animados (`data-counter`)

### 5.4 Cards
- **Service card** (`.service-card`) — con mouse spotlight efecto
- **Blog card** (`.blog-card`) — con `data-category` para filtros
- **Case card** (`.case-card`) — con stats animados
- **Value card** (`.value-card`) — para secciones de valores
- **Testimonial** (`.testimonial`) — con avatar circular

### 5.5 Sections especiales
| Clase | Función |
|---|---|
| `.marquee` | Texto rodante infinito (servicios destacados) |
| `.manifesto` | Sección de USP con texto tachado |
| `.manifesto-pillars` | 3 pilares con iconos en gradient |
| `.process-grid` | Layout 2 cols con steps + visual lunar |
| `.stats` | Card glassmorphic con 4 counters |
| `.cta-final` | Card grande con gradient overlay + dual CTA |

### 5.6 Componentes únicos
- **Moon shape** (`.moon-shape`) — luna 3D con gradient + sombra inset
- **Orbits** (`.orbit-1`, `.orbit-2`) — círculos dashed rotatorios con planetas
- **Showcase grid** (`.showcase-grid`) — bento grid de imágenes
- **Eclipse 404** — luna gigante reemplaza el "0" del 404 con órbitas

### 5.7 Forms
- `.contact-form` — fondo glassmorphic, inputs custom, validación nativa
- `.form-input`, `.form-select`, `.form-textarea` — todos con focus glow morado

### 5.8 Footer (`.footer`)
- Grid 4 cols con marca + 3 columnas de links
- Social icons circulares con hover glow
- Bottom bar con copyright y legal

### 5.9 Decorativos globales
- **Cosmic background** — fixed orbs y campo de estrellas en `body::before`/`::after`
- **Cursor glow** — círculo de luz que sigue al mouse (solo desktop)
- **Scroll progress** — barra de gradient en el top que avanza al scrollear

---

## 6. Páginas del sitio

| URL | Archivo | Schema.org JSON-LD |
|---|---|---|
| `/` | `index.html` | Organization + WebSite |
| `/servicios` | `servicios.html` | ItemList (3 services) |
| `/casos` | `casos.html` | (CollectionPage implícito) |
| `/caso-boutique` | `caso-boutique.html` | Article |
| `/nosotros` | `nosotros.html` | AboutPage |
| `/blog` | `blog.html` | (Blog) |
| `/post-*` | 6 posts | BlogPosting (cada uno) |
| `/contacto` | `contacto.html` | ContactPage |
| `/gracias` | `gracias.html` | (noindex) |
| `/privacidad` | `privacidad.html` | — |
| `/terminos` | `terminos.html` | — |
| `/404` | `404.html` | — |

---

## 7. Funcionalidades JavaScript

Todo en `js/main.js`. Es **vanilla JS sin frameworks**, todo dentro de un IIFE para no contaminar el global scope.

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
13. **Form submit feedback** — desactiva botón y muestra "Enviando..." al submit
14. **Blog filters** — filtra cards por `data-category`, soporta "all"
15. **Back-to-top** — aparece al scroll > 800px

### Cómo añadir tu propio JS

Edita `js/main.js` antes del último `})()`. Ejemplo:

```javascript
/* Mi nueva feature */
const myButton = document.getElementById('miBoton');
if (myButton) {
  myButton.addEventListener('click', () => {
    console.log('clicked');
  });
}
```

---

## 8. SEO implementado

Cada página tiene:

### 8.1 Meta tags básicos
```html
<title>Página Name — Lunaria Studio | Keyword</title>
<meta name="description" content="...155 chars max..." />
<meta name="keywords" content="kw1, kw2, kw3" />
<meta name="author" content="Estéfani Torres" />
<meta name="robots" content="index, follow, max-image-preview:large" />
<link rel="canonical" href="https://lunariastudio.com/pagina.html" />
```

### 8.2 Open Graph (Facebook, LinkedIn, WhatsApp)
```html
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta property="og:image" content="https://lunariastudio.com/images/og-pagina.jpg" />
<meta property="og:url" content="..." />
<meta property="og:type" content="website" /> <!-- "article" en blog posts -->
<meta property="og:locale" content="es_PA" />
<meta property="og:site_name" content="Lunaria Studio" />
```

### 8.3 Twitter Cards
```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="..." />
<meta name="twitter:description" content="..." />
<meta name="twitter:image" content="..." />
```

### 8.4 Schema.org JSON-LD (datos estructurados para Google)

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

### 8.5 Sitemap y robots
- `sitemap.xml` lista todas las URLs con prioridad y frecuencia
- `robots.txt` permite a todos los bots y referencia el sitemap

### 8.6 OG Images (1200×630)
Generadas con Python + PIL en cosmic-style (orbs + estrellas + título + branding). Una por sección. Quedan en `images/og-*.jpg`.

---

## 9. Servicios externos

### 9.1 Vercel (hosting)

- **Cuenta:** estefaniii (en `estefaniiis-projects`)
- **URL pública:** `https://lunaria-studioo.vercel.app` (con doble "o")
- **Dashboard:** https://vercel.com/estefaniiis-projects/lunaria-studio
- **Conectado a:** GitHub repo `estefaniii/lunaria-studio` → auto-deploy en cada `git push`
- **Custom headers** en `vercel.json`: HSTS, X-Frame, Referrer-Policy, Cache-Control
- **Redirects** en `vercel.json`: `/about` → `/nosotros`, `/services` → `/servicios`, etc.

### 9.2 GitHub (código)

- **Repo:** https://github.com/estefaniii/lunaria-studio
- **Branch principal:** `main`
- **Email noreply usado:** `196740857+estefaniii@users.noreply.github.com` (para no exponer el email real)

### 9.3 Formsubmit.co (formulario)

- **Endpoint:** `https://formsubmit.co/estefanidelosangelestorres@gmail.com`
- **Configuración** (hidden inputs en el form):
  - `_subject`: "✦ Nuevo lead desde Lunariastudio.com"
  - `_template`: "table" (formato bonito del email)
  - `_captcha`: "false" (deshabilitado, usamos honeypot)
  - `_autoresponse`: mensaje automático al cliente
  - `_next`: redirige a `/gracias.html`
  - `_honey`: campo invisible anti-spam (honeypot)
- **Activación:** la primera vez que alguien envía, llega un email de Formsubmit con un link "Confirm Email" — clickear UNA vez activa todo para siempre.

### 9.4 Unsplash (imágenes)

- Imágenes hotlinkeadas con URL `https://images.unsplash.com/photo-XXXXX?w=NNN&h=NNN&fit=crop&q=80`
- ⚠️ **Para producción robusta:** descargar y subir a `images/` propio del proyecto. Las URLs de Unsplash pueden cambiar.

---

## 10. Workflow de despliegue

### 10.1 Cambio rápido en local

```bash
cd "ruta/al/folder/html"

# Editar lo que quieras (HTML, CSS, JS, imágenes)

git add -A
git commit -m "descripción del cambio"
git push
```

→ Vercel detecta el push y despliega automáticamente en ~30 segundos.

### 10.2 Preview local (sin desplegar)

```bash
cd "ruta/al/folder/html"
npx serve .
# o abrir el index.html directamente en el navegador
```

### 10.3 Deploy manual (sin git, no recomendado)

```bash
cd "ruta/al/folder/html"
./deploy.sh --prod    # produccion
./deploy.sh           # preview
```

### 10.4 Ver deployments y aliases

```bash
npx vercel ls lunaria-studio       # lista deploys recientes
npx vercel alias ls                # lista aliases del proyecto
npx vercel inspect <URL>           # info detallada de un deploy
```

---

## 11. Cómo expandir el sitio

### 11.1 Añadir un nuevo blog post

1. Copia un post existente como base (ej: `post-anatomia-hero.html`)
2. Renombra: `post-mi-tema.html`
3. Edita en `<head>`:
   - `<title>` (max 60 chars)
   - `<meta name="description">` (max 155 chars)
   - `<meta name="keywords">`
   - `<link rel="canonical">`
   - Bloque `application/ld+json` (BlogPosting): `headline`, `datePublished`, `description`
   - Open Graph + Twitter cards
4. Edita en `<body>`:
   - `.article-meta-top` (categoría, min lectura, fecha)
   - `<h1 class="article-title">`
   - `<figure class="article-cover">` (imagen hero)
   - `.article-body` (contenido)
5. Añade tarjeta nueva en `blog.html` con `data-category` correcta:
   ```html
   <a href="post-mi-tema.html" class="blog-card reveal delay-1" data-category="branding">
     ...
   </a>
   ```
6. Añade `<url>` al `sitemap.xml`
7. Commit + push

### 11.2 Añadir una nueva página (ej: "Servicios para Empresas")

1. Copia `nosotros.html` como base estructural
2. Renombra: `empresas.html`
3. Cambia toda la metadata y contenido
4. Añade link en navbar de TODAS las páginas (busca `nav-menu`):
   ```html
   <li><a href="empresas.html">Empresas</a></li>
   ```
5. Añade link al footer de todas (sección "Estudio")
6. Añade entrada al `sitemap.xml`
7. Commit + push

### 11.3 Cambiar la paleta de colores

Editar `css/variables.css`. Por ejemplo, para cambiar el morado principal:
```css
:root {
  --purple-400: #TU_COLOR;   /* afecta todo el sitio */
}
```

### 11.4 Cambiar tipografía

En `css/styles.css` busca el `@import` de Google Fonts y reemplaza. Luego en `variables.css`:
```css
--font-display: 'TuFuente', sans-serif;
```

### 11.5 Añadir una nueva sección al home

Edita `index.html`. Cada sección sigue este patrón:
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

### 11.6 Subir tu foto de fundadora

1. Recorta tu foto cuadrada (idealmente 800×800 o más)
2. Conviértela a `.webp` (usa https://squoosh.app o cualquier herramienta)
3. Guárdala como `images/estefani.webp`
4. Commit + push

Aparece automáticamente en:
- `/nosotros` (sección hero con la imagen grande)
- Todos los blog posts (avatar de autora)

### 11.7 Cambiar precios o servicios

Editar `servicios.html`. Cada servicio es un `<article class="service-card">` con su propio bloque.

### 11.8 Conectar tu dominio propio (lunariastudio.com o el que sea)

1. Comprar dominio en Namecheap, GoDaddy, Cloudflare, etc.
2. En Vercel: Project Settings → Domains → Add → escribir tu dominio
3. Vercel te da los DNS records (un A record y un CNAME)
4. Pegarlos en tu registrador
5. Esperar 5-30 min para que propague
6. Vercel auto-genera certificado SSL (HTTPS)

---

## 12. Solución de problemas

### Problema: el form no envía
- **Causa probable:** primera activación de Formsubmit no completada
- **Solución:** revisa estefanidelosangelestorres@gmail.com (también Spam/Promociones), busca email de Formsubmit, click en "Confirm Email"

### Problema: cambios no aparecen después de `git push`
- **Causa probable:** Vercel está construyendo o cache del navegador
- **Solución:**
  1. Espera 30-60 segundos
  2. Hard reload: `Cmd+Shift+R` (Mac) o `Ctrl+Shift+R` (Win)
  3. Verifica el deploy en Vercel dashboard

### Problema: imágenes de Unsplash no cargan
- **Causa probable:** URLs cambiaron o son hotlinkeadas y bloqueadas
- **Solución:** descargar la imagen y subirla a `images/` propio. Reemplazar URL en HTML.

### Problema: el favicon sigue mostrando el viejo
- **Causa probable:** caché agresiva del navegador
- **Solución:**
  1. Hard reload `Cmd+Shift+R`
  2. Vaciar caché del navegador (settings)
  3. Probar en modo incógnito

### Problema: el sitio devuelve 401 (Unauthorized)
- **Causa probable:** Vercel Authentication activado en el proyecto
- **Solución:** Vercel dashboard → Settings → Deployment Protection → "Standard" o "Vercel Authentication" → cambiar a "None" o "Only Preview"

### Problema: bug en el filtro del blog
- **Causa probable:** una card sin `data-category` o categoría escrita mal
- **Solución:** abrir `blog.html`, verificar que cada `<a class="blog-card">` tenga `data-category="..."` con uno de estos valores: `neuromarketing`, `diseno`, `branding`, `casos`, `tips`

---

## 13. Accesos y contactos

### 13.1 Accesos importantes (todos en el mismo navegador con la misma cuenta)

| Servicio | URL |
|---|---|
| Vercel dashboard | https://vercel.com/estefaniiis-projects/lunaria-studio |
| GitHub repo | https://github.com/estefaniii/lunaria-studio |
| Formsubmit (no requiere login) | https://formsubmit.co/ |
| Sitio en producción | https://lunaria-studioo.vercel.app |
| Inbox de leads | estefanidelosangelestorres@gmail.com |

### 13.2 Comandos útiles para terminal

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

### 13.3 Datos de la marca

- **Marca:** Lunaria Studio
- **Fundadora:** Estéfani Torres
- **Email:** estefanidelosangelestorres@gmail.com
- **WhatsApp:** +507 6778-2931
- **Ubicación:** La Chorrera, Panamá Oeste, Panamá
- **Servicios y precios:**
  - Página Web: desde $800 (proyecto único)
  - Branding: desde $450 (pack completo)
  - Gestión Digital: desde $350/mes

---

## 🌙 Cierre

Este documento es **un mapa**, no un manual estricto. Cada vez que añadas algo nuevo, **actualízalo aquí** para que el próximo desarrollador (o tú misma en 6 meses) tenga claridad.

> *"La luna no compite con el sol. Brilla con su propia luz."*
> — Estéfani Torres, Fundadora

— Documento generado con cariño en Lunaria Studio · 2026
