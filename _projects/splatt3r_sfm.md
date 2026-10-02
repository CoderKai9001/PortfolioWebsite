---
layout: page
title: Splatt3r-SfM
description: N-view Gaussian splats from unposed images, with no per-scene optimisation
category: research
importance: 3
# TODO: add the GitHub link once public, and a teaser image
---

A 3D Vision course project that couples two feed-forward models that each stop one step
short of what you want:

- **MASt3R-SfM** recovers N-view camera poses from an unposed image collection.
- **Splatt3r** predicts a Gaussian splat, but only from an image *pair*.

Splatt3r-SfM fuses the pairwise splats into a single aligned scene using MASt3R-SfM's poses,
giving **N-view novel view synthesis from unposed images in a single forward pass** — no
per-scene optimisation, unlike classical Gaussian splatting.
