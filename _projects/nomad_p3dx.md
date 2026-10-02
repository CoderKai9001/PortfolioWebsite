---
layout: page
title: NoMaD on a P3DX
description: Image-goal navigation running closed-loop on a real robot
category: research
importance: 4
# TODO: add the GitHub link, and a photo/video of the robot driving
---

Deployed **NoMaD**, an image-goal navigation model, on a **Pioneer P3DX** ground robot over
ROS, closing the loop from camera frames to velocity commands in a real indoor environment.

Most of the work was in making it fast enough to be useful: I optimised the inference path to
cut per-step latency so the policy could sustain real-time onboard operation, rather than
stuttering between control updates.
