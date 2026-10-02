# Aditya Vadali — academic portfolio

Source for <https://coderkai9001.github.io/PortfolioWebsite/>.

Built with [Jekyll](https://jekyllrb.com/) and the
[al-folio](https://github.com/alshedivat/al-folio) theme. Layouts, styles and includes live
in the `al_folio_core` gem, so this repository holds content and configuration only.

## Editing content

| What | Where |
|---|---|
| Bio, profile photo, subtitle | `_pages/about.md` |
| Publications | `_bibliography/papers.bib` (rendered by jekyll-scholar) |
| Project cards | `_projects/*.md` — `category` must be one of `research`, `hackathons`, `systems` |
| CV page | `_data/cv.yml` |
| Social icons, CV link | `_data/socials.yml` |
| Site title, URL, theme options | `_config.yml` |
| Images and PDFs | `assets/img/`, `assets/pdf/` |

Outstanding placeholders are marked `TODO`:

```sh
grep -rn TODO _bibliography _data _pages _projects
```

## Previewing locally

Requires Docker. From the repository root:

```sh
docker compose up
```

Then open <http://localhost:8080/PortfolioWebsite/>. The first run installs the Ruby gems and
takes a few minutes; afterwards Jekyll watches the directory and live-reloads.

Without the `docker compose` plugin, the equivalent is:

```sh
docker run --rm -p 8080:8080 -p 35729:35729 \
  -v "$PWD":/srv/jekyll -e JEKYLL_ENV=development \
  amirpourmand/al-folio:latest /srv/jekyll/bin/entry_point.sh
```

## Deployment

`.github/workflows/deploy.yml` builds the site on every push to `main` and publishes `_site`
to the `gh-pages` branch, which is what GitHub Pages serves. No manual step is needed.
