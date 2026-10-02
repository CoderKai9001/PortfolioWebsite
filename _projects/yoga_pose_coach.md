---
layout: page
title: Yoga Pose Coach
description: 2nd place, Megathon 2024 — on-device pose correction from joint angles
category: hackathons
importance: 2
# TODO: add a screenshot of the keypoint overlay
---

**2nd place at Megathon 2024**, also Qualcomm-sponsored.

We built a human **keypoint detector** and turned it into a yoga instructor app. The app
estimates body pose, computes the angles along pre-determined keypoint-to-keypoint edges, and
compares them against the target pose — so it can tell you *which* joint is wrong and in which
direction, then guide you through a sequence.

Like SnapGen a year later, it had to be deployed on the **Qualcomm QIDK NPU**, which was my
first encounter with getting a model onto hardware that behaves nothing like a GPU.
