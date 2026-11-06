# Our Lady of the Most Holy Trinity Chapel — website

The website of Our Lady of the Most Holy Trinity Chapel (Corpus Christi, Texas), rebuilt as a
[Jekyll](https://jekyllrb.com) site so it can be hosted for free on GitHub Pages. The design
follows the Chapel's existing site: brown header and hero band, Vollkorn, Archivo Black and
Montserrat type, and the slide-in menu. Everything is plain text files; there is no database.

## Preview on your Mac

1. Double-click `start-site.command`. It installs the Ruby gems the first time, builds the
   site and opens http://127.0.0.1:4000/ in your browser. Leave its window open while you work;
   pages refresh automatically when you save a file.
2. Or, in Terminal: `bundle install` once, then `bundle exec jekyll serve --livereload`.

Requires Ruby 3.2 (the `.ruby-version` file selects it automatically when rbenv is installed).

## Where things are

| Path | What it holds |
| --- | --- |
| `_config.yml` | Site name, tagline, address, phone, main color, hosting address |
| `_data/schedule.yml` | **Mass schedule**, sermon link, prayer intentions, quote (home page) |
| `_data/notices.yml` | The short notices in two columns on the home page |
| `_data/navigation.yml` | The menus: primary links, the ☰ drawer, footer links |
| `_data/resources.yml` | The link groups on the Resources page |
| `_data/document_categories.yml` | Section order and descriptions on the Documents page |
| `_documents/` | One file per document: creeds, catechisms, papal documents, Fatima, etc. |
| `index.html` | Home page: announcements, videos, PDF viewer |
| `about.html`, `contact-us.html`, `donation.html`, `dress-code.html` | The other pages |
| `documents.html`, `resources.html`, `404.html` | The Documents index, Resources page, not-found page |
| `_layouts/`, `_includes/`, `_sass/` | The theme: page skeletons, reusable pieces, styles |
| `assets/img`, `assets/pdf`, `assets/fonts`, `assets/js` | Images, PDFs, web fonts, menu script |
| `.github/workflows/jekyll.yml` | Builds and publishes the site on GitHub Pages |
| `archive/static-version.zip` | The earlier plain-HTML version, kept for reference |

## Everyday edits

**Wording:** on the site, always write **Holy Latin Mass** (and **Holy Latin Masses**), not
"Mass", "Holy Mass" or "Latin Mass". For example: "Holy Latin Mass Schedule", "After the
Holy Latin Mass: Adoration and Benediction". Leave quoted texts by other authors (papal
documents, the Profession of Faith, Bishop Thuc's declaration) and the titles of outside
resources exactly as written.

- **Mass times**: edit `_data/schedule.yml`. Each Mass is a block with `date`, `time`, `feast`,
  `celebrant` (the priest), `confessions`, `rosary` and an optional `note`. Add or remove blocks
  as needed.
  The **Next Holy Latin Mass** box at the top of the home page reads this list and shows the first
  Mass that hasn't happened yet. Once every Mass listed is in the past, it says the times
  are being updated and asks visitors to call. Write dates and times as the existing entries
  do (`"Sunday, November 8, 2026"`, `"8:00 AM"`) so the box can tell which Mass is next.
- **Notices**: edit `_data/notices.yml`. Each notice is a `text:` block; links are written as
  `[words](https://address)`.
- **Announcement text** (the paragraphs beside the altar photo): near the top of `index.html`.
- **Menus**: `_data/navigation.yml`. Links beginning with `http` open in a new tab.
- **A new document**: add a file to `_documents/`, for example `_documents/apostles-creed.md`:

  ```
  ---
  title: Apostles' Creed
  category: Catholic Creeds
  order: 3
  summary: The ancient baptismal creed of the Roman Church.
  image: /assets/img/trinity-coronation.jpg
  image_alt: Painting of the Holy Trinity
  text_size: sm
  ---
  I believe in God, the Father almighty, Creator of heaven and earth...
  ```

  Markdown (`.md`) or HTML (`.html`) files both work. Optional settings: `title_style`
  (`large` or `plain`), `subtitle`, `subtitle_style` (`plain`, `plain-lg`), `image_position: right`,
  `intro`, `text_align: center`, `theme: brown`, and `pdf` / `pdf_title` / `pdf_thumb` /
  `pdf_link_text` to embed a PDF. The page appears at `/documents/<file-name>/` and on the
  Documents page under its category.
- **A new page**: copy `dress-code.html`, change the front matter (`title`, `permalink`) and the
  content, then add a link in `_data/navigation.yml`.
- **Videos**: `{% include video.html id="YOUTUBE_ID" title="Title" %}`. Add `start="14"` to begin
  playback 14 seconds in (the `t=14s` part of a YouTube link).
- **PDFs**: put the file in `assets/pdf/` and use
  `{% include pdf-viewer.html file="/assets/pdf/name.pdf" title="Heading" %}`.
- **Colors and fonts**: `_sass/olmht/_variables.scss` (the main brown can also be set with
  `theme_color` in `_config.yml`).

## Publishing on GitHub Pages (free hosting)

1. Create a GitHub account and a new repository (for example `church-website`).
2. Put this folder in the repository and push it (GitHub Desktop is the easiest way).
3. In the repository, open **Settings → Pages** and set **Source** to **GitHub Actions**.
   The included workflow builds the site on every push to `main` and publishes it at
   `https://<username>.github.io/church-website/`.
4. To use the Chapel's own domain, point the domain's DNS at GitHub Pages and enter the domain
   under **Settings → Pages → Custom domain**. Because the site is published by a GitHub
   Actions workflow, no `CNAME` file is needed (GitHub ignores it).

`_config.yml` has `url` and `baseurl` settings; the workflow fills in `baseurl` automatically
for project sites, and it should stay empty for a custom domain.

### How olmhtchurch.org is connected

The site is published from the `ourladymhtchurch/ourladymhtchurch.github.io` repository, with
`olmhtchurch.org` set as its custom domain. The domain is registered at GoDaddy, and its DNS
records there point to GitHub:

| Type | Name | Value |
| --- | --- | --- |
| A | `@` | `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` |
| CNAME | `www` | `ourladymhtchurch.github.io` |
| TXT | `_github-pages-challenge-ourladymhtchurch` | GitHub's domain-verification code |

The MX, TXT (`@`), autodiscover, lync, sip and msoid records belong to the Chapel's Microsoft
365 email. Leave them as they are.

The old addresses from the GoDaddy site (for example `/profession-of-faith`) redirect to the
new document pages, so existing links keep working.

## Notes

- The contact form shows a confirmation message but does not send email. To send email, add a
  form service address to the form in `contact-us.html` (see the comment there).
- The "Donate here" button is a placeholder, as on the current site.
- Search engines get a sitemap and page descriptions automatically (jekyll-seo-tag, jekyll-sitemap).
