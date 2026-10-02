---
layout: page
title: SnapGen
description: 1st place, Megathon 2025 — on-device Stable Diffusion style transfer
category: hackathons
importance: 1
# TODO: add a before/after style-transfer image, and the GitHub link
---

**1st place at Megathon 2025**, IIIT Hyderabad's Qualcomm-sponsored hackathon.

SnapGen is a prompt-driven **Stable Diffusion style editor**: give it an image and a prompt
describing an art style, and it returns the same image rendered in that style.

The hard part was not the model, it was the target. Everything had to run **fully on-device
on the Qualcomm QIDK's NPU** — not a GPU, and not something any standard inference stack
targets out of the box. Getting a diffusion pipeline to fit and run on that neural engine was
most of the hackathon.
