---
layout: page
title: PixelLoop
description: Pixel-level loop closures for topological navigation — IROS 2026
category: research
importance: 2
related_publications: true
# TODO: add a teaser image, e.g. img: assets/img/pixelloop.jpg
---

Topological navigation methods such as **MASt3R-Nav** represent an environment as a graph of
places rather than a metric map. They work well until the agent revisits somewhere it has
already been and fails to notice — so the graph grows a redundant branch instead of a
shortcut.

**PixelLoop** adds **pixel-level loop closures** to that pipeline: matches are established at
pixel granularity, which is precise enough to confirm a revisit and wire the shortcut into
the topological map.

I co-developed the loop-detection pipeline and ran its benchmark evaluation. Accepted to
**IROS 2026** {% cite chittawar2026pixelloop %}.
