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
| `_data/schedule.yml` | **Holy Latin Mass schedule** (home page) |
| `_data/notices.yml` | Chapel News: the "Updated" line and short notices |
| `_data/liturgical_year.yml` | The Liturgical Year: the day's saint or feast video (home page, above Chapel News) |
| `_data/featured.yml` | Featured Content cards: other videos, conference recordings, links (the latest sermon has its own section, from `sermons.yml`) |
| `_data/sermons.yml` | **Media page** (`/sermons/`): recordings of the Holy Latin Mass, the chapel's sermon videos (newest first), Bishop Pivarunas' sermons and lectures, and the MP3 sermons, in groups |
| `_data/prayer.yml` | Prayer Intentions and the quotes under them |
| `_data/devotions.yml` | Devotions cards: videos, prayers, the Pledge of Modesty |
| `_data/about.yml` | The summaries below the chapel's story on the About page (Bishop Thuc, Bishop Carmona, Bishop Pivarunas, the CMRI, Submission to the Magisterium) |
| `_data/navigation.yml` | The menus: primary links, the ☰ drawer, footer links |
| `_data/resources.yml` | The link groups on the Resources page (the Oath of Fidelity PDF at the bottom of that page is in `resources.html`) |
| `_data/document_categories.yml` | Section order and descriptions on the Documents page |
| `_documents/` | One file per document: creeds, catechisms, papal documents, Fatima, etc. |
| `index.html` | Home page layout, the Chapel News text and the "New to the Chapel?" text |
| `about.html`, `contact-us.html`, `donation.html`, `dress-code.html` | The other pages |
| `documents.html`, `resources.html`, `sermons.html`, `404.html` | The Documents index, Resources page, Media page, not-found page |
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
  as needed. A Mass can also list `sermons` (each with `title`, `by`, `text` and `url`, an MP3
  in `assets/audio/` or a web address), shown at the bottom of its card in that order, each
  with a "Listen (MP3)" button. When you delete that Mass's block, its sermons leave the
  page too, so move any you want to keep to `_data/sermons.yml` (the Media page).
  The **Next Holy Latin Mass** box at the top of the home page reads this list and shows the first
  Mass that hasn't happened yet. Once every Mass listed is in the past, it says the times
  are being updated and asks visitors to call. Write dates and times as the existing entries
  do (`"Sunday, November 8, 2026"`, `"8:00 AM"`) so the box can tell which Mass is next.
  The box under the Mass cards (the San Antonio mission notice) is `notice:` at the top of
  the same file. Delete it, or leave it empty, to hide the box.
  For urgent news such as a cancellation, `alert:` (also at the top of the file) shows a red
  box in two places: at the very top of the home page, above the Next Holy Latin Mass card,
  and right under the schedule heading. Delete it, or leave it empty, once it no longer
  applies; both boxes disappear.
- **Home page sections**, top to bottom: the Next Holy Latin Mass card, an "Indulgences
  Granted for the Faithful Departed" button, The Liturgical Year, Latest Sermon, the Holy
  Latin Mass schedule, New to the Chapel?, Chapel News, Featured Content, Prayer Intentions,
  Devotions, The Papacy and Catholic Unity (the open letter), and a Donate band with the
  PayPal button.
- **Indulgences button**: a PDF on the website of Immaculate Conception Catholic Church in
  Sartell, Minnesota (immaculateconceptioncmri.org), in its own band near the top of
  `index.html` (`id="indulgences"`). To take it down, delete that `<section>`; to change it,
  edit the button's `href` and words.
- **New to the Chapel?**: its text (the welcome, the conditions for receiving Holy
  Communion, each list line a `<li>`, and why the Chair of Saint Peter is vacant) is in
  `index.html`, above its row of buttons (Dress Code, Modesty in Dress, Father Craig on
  Modesty (Audio), Bishop Pivarunas’ Pastoral Letter on Modesty, Profession of Faith,
  Baltimore Catechism, Call). The two modesty buttons link to files on the website of
  Immaculate Conception Catholic Church in Sartell, Minnesota (immaculateconceptioncmri.org);
  if that church moves them, the buttons stop working and need the new addresses.
- **The Liturgical Year** (the day's video, at the top under the Next Holy Latin Mass card): edit
  `_data/liturgical_year.yml`. Each day, take the InPrincipio Podcast's video for that day's
  saint or feast from <https://www.youtube.com/@InPrincipioCast/videos>, and change `title:`
  (for example `"St. Felix of Valois (November 20)"`) and `youtube:` (the id after `v=` in the
  video's address). Delete `youtube:` to hide the section.
- **Latest Sermon** (under The Liturgical Year): needs no editing. It always shows the first
  video in `_data/sermons.yml` (see Media page below), with its "Listen (MP3)" and "More
  sermons" buttons. Older sermons are not given their own cards on the home page.
- **Chapel News**: the main text (beside the side-altar photo) is near the top of `index.html`.
  To show a link there as a brown button (like "Watch on YouTube"), copy that line:
  `<p class="rich__button"><a class="btn" href="…" target="_blank" rel="noopener">Button words</a></p>`.
  The "Updated …" line under the heading is `updated:` in `_data/notices.yml`; change its date
  when you post news. Short extra notices go in the same file under `items:`, each as a
  `text:` block (links are written as `[words](https://address)`).
- **Featured Content** (the Christ the King Holy Latin Mass excerpt and, under it, that day's
  sermon, "The Kingship of Christ"; the Fatima Conference recordings): edit `_data/featured.yml`. A card with `type: video` plays a YouTube video inside the card (`youtube:` is the id after
  `v=` in the address; `start: 14` begins 14 seconds in). A video can also be a file kept on
  the site: put an `.mp4` in `assets/video/` and a still picture in `assets/img/`, and give the
  card `file:` and `poster:` instead of `youtube:`. GitHub refuses any file over 100 MB, so
  compress videos first (the November 15, 2026 sermon is about 80 MB for 16½ minutes), and
  remember the whole site should stay under about 1 GB. Add `audio:` (an MP3 in
  `assets/audio/`) to a video card for a "Listen (MP3)" button under the video. `type: link`
  opens another page, with an optional picture and button text. Cards show two to a row
  (`wide: true` makes one fill a row, picture or video on the left).
- **Media page** (`/sermons/`, "Media" in both menus; it was called the Sermons page until
  November 17, 2026, and keeps its address so old links work): edit `_data/sermons.yml`.
  The Media menu lists the page's sections; when you add or rename a section, update the
  Media lists in `_data/navigation.yml` too (see Menus below).
  - **Holy Latin Mass and Excerpts** (the top of the page): `mass_videos:`, recordings of the
    Holy Latin Mass, whole or in part, newest first. It has a `title`, a `description` and
    its `videos`, written like the chapel videos below, with a `label` (such as Excerpt).
    A video filmed with the phone held upright gets `portrait: true` (a tall frame instead
    of a wide one), and `wide: true` lets a card fill the row with the text beside it.
  - **Video Sermons**: the `videos:` list, newest first. The first
    video is shown large as the Latest Sermon, and also in the Latest Sermon section of the home page;
    the others form the Video Sermon Archive under it. Each has `title`, `by`, `text`, either
    `file:` + `poster:` (an `.mp4` in `assets/video/` and a picture in `assets/img/`) or
    `youtube:` (with an optional `start:`), and an optional `audio:` MP3, shown as a "Listen
    (MP3)" button on the home page's latest-sermon card only: the video cards on the Media
    page have no MP3 button, so also list the MP3 under "Sermons at the Chapel" (below).
    For a new sermon video, add it at the top of `videos:` and leave the older ones in
    place: they move into the archive by themselves, and the home page updates too. Each
    video file stays on the site, so keep an eye on the 1 GB limit (see Featured Content).
  - **Other video sections** (`video_groups:`), after the chapel's videos: "Selected Sermons
    or Lectures of Bishop Pivarunas". Each section has a `title`, an optional `description`
    and its `videos`, newest first, written like the chapel videos, plus an optional `label`
    (the small word above the title, such as Lecture or Interview). Chapel News on the home
    page shows only the bishop's latest talk and links to this section; when a new talk
    goes into Chapel News, add it at the top of this section too.
  - **MP3 sermons**: the `groups:` ("Sermons at the Chapel", "Sermons of the Saints"). Every
    chapel sermon MP3 goes in "Sermons at the Chapel", whether or not the sermon also has a
    video. Each has `title`, `by`, `text` and `url` (an MP3 in `assets/audio/` or a web
    address). Put a new chapel sermon at the top of its group.
- **About page** (`/about/`): the chapel's story is written in `about.html`, beside the mural.
  Below it, each summary in `_data/about.yml` is its own band (light gray and white in turn)
  with its picture on the left, then the right: Bishop Thuc, Bishop Moisés Carmona, Bishop
  Pivarunas, the CMRI and Submission to the Magisterium. Each has an `id` (its address,
  such as `/about/#bishop-thuc`), an optional `label` (the small brown line), a `title`, an
  `image` with `image_alt`, the summary `text`, and `links` (buttons: the first brown, the
  rest outlined; web addresses open in a new tab). `frame: true` shows the whole picture on
  white with a thin border, for a crest or a letter's first page. Bishop Carmona's letter,
  Bishop Pivarunas's biography and the CMRI's history are on cmri.org; Bishop Thuc's
  declaration and the Submission letter are documents on this site (see `about:` under
  "A new document"). Since November 19, 2026 these five are not in the ☰ menu.
- **Prayer intentions and quotes**: `_data/prayer.yml`.
- **Devotions** (the video cards near the bottom): `_data/devotions.yml`. Each card has a
  `group` label, a `title`, a `youtube` id or an `image`, and optional `text`.
- **Menus**: `_data/navigation.yml`. Links beginning with `http` open in a new tab. An item
  with `children:` has a list of links under it: in the ☰ menu it opens and closes, and in
  the row of links (Media) the list drops down when the mouse is over it. A link to one
  section of a page is the page's address, `#` and the section's title in lower case with
  dashes, such as `/sermons/#video-sermons`. The pages summarized on the About page are
  reached from there, not from the ☰ menu.
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
  Documents page under its category. A document summarized on the About page also gets
  `about:` with its summary's `id` in `_data/about.yml` (Bishop Thuc's declaration has
  `about: bishop-thuc`): it then opens with a light gray title band, "About Us" above the
  title linking back to its summary, the picture in the About page's frame, and a "Back to
  About Us" button at the end.
- **A link to another website on the Documents page** (like Documents of Popes under Papal
  Documents): add it under `links:` for that section in `_data/document_categories.yml`, with
  `title`, `url`, `cover` (the words on its brown cover) and `summary`. It shows as a card
  after the section's documents and opens in a new tab.
- **A new page**: copy `dress-code.html`, change the front matter (`title`, `permalink`) and the
  content, then add a link in `_data/navigation.yml`.
- **Videos** on other pages: `{% include video.html id="YOUTUBE_ID" title="Title" %}`. Add `start="14"`
  to begin playback 14 seconds in (the `t=14s` part of a YouTube link). For a click-to-play
  thumbnail that loads YouTube only when clicked, use `youtube-facade.html` with the same settings.
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
- The Donate buttons are the chapel's PayPal donate button: on the donation page, and in the
  "Donate" band at the bottom of the home, About and Contact Us pages. Their PayPal button id
  is `paypal_button_id` in `_config.yml`, so changing it there updates every button. (After
  editing `_config.yml`, restart the preview to see the change.) The appeal above every Donate
  button ("For the greater love and glory of Almighty God…") and the button itself are in
  `_includes/paypal-donate.html`, so one edit there changes all four pages.
- Search engines get a sitemap and page descriptions automatically (jekyll-seo-tag, jekyll-sitemap).
