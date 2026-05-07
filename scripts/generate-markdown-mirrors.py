#!/usr/bin/env python3
"""Generate clean Markdown mirrors for every dist/**/index.html page."""

from __future__ import annotations

import re
import sys
import textwrap
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlparse

from bs4 import BeautifulSoup
from markdownify import markdownify as md

SITE_URL = "https://lecyberassureur.fr"
DEFAULT_ROOT = "dist"


def clean_text(value: str | None) -> str:
    if not value:
        return ""
    return re.sub(r"\s+", " ", value).strip()


def load_sitemap_dates(root: Path) -> dict[str, str]:
    sitemap = root / "sitemap.xml"
    dates: dict[str, str] = {}
    if not sitemap.exists():
        return dates
    ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    try:
        tree = ET.parse(sitemap)
        for url in tree.findall("sm:url", ns):
            loc = url.findtext("sm:loc", default="", namespaces=ns).rstrip("/") or SITE_URL
            lastmod = url.findtext("sm:lastmod", default="", namespaces=ns)
            if loc and lastmod:
                dates[loc] = lastmod
    except ET.ParseError:
        pass
    return dates


def canonical_url_for(html_path: Path, root: Path) -> str:
    rel_parent = html_path.parent.relative_to(root).as_posix()
    if rel_parent == ".":
        return SITE_URL
    return f"{SITE_URL}/{rel_parent}"


def extract_markdown(html_path: Path, root: Path, sitemap_dates: dict[str, str]) -> str:
    html = html_path.read_text(encoding="utf-8", errors="ignore")
    soup = BeautifulSoup(html, "html.parser")

    title = clean_text(soup.title.string if soup.title else "")
    desc_tag = soup.find("meta", attrs={"name": "description"})
    description = clean_text(desc_tag.get("content") if desc_tag else "")
    canonical_tag = soup.find("link", rel="canonical")
    url = clean_text(canonical_tag.get("href") if canonical_tag else "") or canonical_url_for(html_path, root)
    url = url.rstrip("/") or SITE_URL

    for selector in [
        "script",
        "style",
        "noscript",
        "svg",
        "iframe",
        "canvas",
        "form",
        "button",
        "input",
        "select",
        "textarea",
        "nav",
        "footer",
        "header",
        "[role='navigation']",
        "[aria-label*='navigation' i]",
        "[aria-label*='cookie' i]",
        "[class*='cookie' i]",
        "[id*='cookie' i]",
        "[class*='popup' i]",
        "[id*='popup' i]",
        "[class*='modal' i]",
        "[id*='modal' i]",
        "[class*='banner' i]",
    ]:
        for node in soup.select(selector):
            node.decompose()

    main = soup.find("main") or soup.find(attrs={"aria-label": re.compile("contenu principal", re.I)}) or soup.body or soup
    markdown = md(str(main), heading_style="ATX", bullets="-")

    markdown = re.sub(r"\n{3,}", "\n\n", markdown)
    markdown = re.sub(r"[ \t]+\n", "\n", markdown)
    markdown = markdown.strip()

    last_updated = sitemap_dates.get(url) or sitemap_dates.get(url.rstrip("/"))
    if not last_updated:
        mtime = datetime.fromtimestamp(html_path.stat().st_mtime, tz=timezone.utc)
        last_updated = mtime.isoformat(timespec="seconds")

    front_matter = textwrap.dedent(
        f"""\
        title: {title}
        description: {description}
        url: {url}
        last_updated: {last_updated}
        """
    ).strip()

    return f"{front_matter}\n\n{markdown}\n"


def main() -> int:
    root = Path(sys.argv[1] if len(sys.argv) > 1 else DEFAULT_ROOT).resolve()
    if not root.exists():
        print(f"ERROR: root not found: {root}", file=sys.stderr)
        return 1

    sitemap_dates = load_sitemap_dates(root)
    generated: list[Path] = []
    for html_path in sorted(root.rglob("index.html")):
        markdown = extract_markdown(html_path, root, sitemap_dates)
        out_path = html_path.with_name("index.md")
        out_path.write_text(markdown, encoding="utf-8")
        generated.append(out_path)

    for path in generated:
        print(path.relative_to(root).as_posix())
    print(f"Generated {len(generated)} markdown mirrors in {root}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
