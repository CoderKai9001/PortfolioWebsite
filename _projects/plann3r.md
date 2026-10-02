---
layout: page
title: Plann3r
description: Predicting planning costs grounded in 3D — CoRL 2026
category: research
importance: 1
related_publications: true
# TODO: add a teaser image, e.g. img: assets/img/plann3r.jpg
---

**Plann3r** asks a VGGT-style 3D foundation model to do more than reconstruct geometry: to
say how expensive it would be to *get somewhere*. We fine-tune VGGT with a new prediction
head that maps a single RGB image, conditioned on a goal, to a **geodesic costmap** — so
planning costs come out grounded in the model's own 3D representation rather than bolted on
by a separate planner.

My contributions:

- Designed and trained the costmap head on top of the fine-tuned VGGT backbone.
- Built the evaluation on **HM3D** scenes.
- Ran the rebuttal experiments: a loop-closure extension that relaxes the single-traversal
  assumption, retrieval-noise sweeps, and bootstrap confidence intervals.

Accepted to the **Conference on Robot Learning (CoRL) 2026** as first author {% cite vadali2026plann3r %};
presenting in person in Austin, TX in November 2026. A full public release is coming soon.
