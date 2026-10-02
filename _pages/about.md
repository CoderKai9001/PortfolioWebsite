---
layout: about
title: about
permalink: /
subtitle: >
  Dual Degree (B.Tech + MS by Research) student in Computer Science at
  <a href="https://www.iiit.ac.in/">IIIT Hyderabad</a> ·
  undergraduate researcher at the <a href="https://robotics.iiit.ac.in/">Robotics Research Center</a>.

profile:
  align: right
  image: prof_pic.jpeg
  image_circular: true # crops the image to make it circular
  more_info: >
    <p>Robotics Research Center</p>
    <p>IIIT Hyderabad, India</p>
    <p>Advisor: Prof. K. Madhava Krishna</p>
    <p>Collaborator: Prof. Sourav Garg</p>

selected_papers: true # includes a list of papers marked as "selected={true}"
social: true # includes social icons at the bottom of the page

# No _news or _posts directory in this site.
announcements:
  enabled: false

latest_posts:
  enabled: false
---

I am **Aditya Vadali**, a fourth-year student at [IIIT Hyderabad](https://www.iiit.ac.in/),
in the Dual Degree (B.Tech + MS by Research) programme in Computer Science. Since May 2024
I have been an undergraduate researcher at the
[Robotics Research Center](https://robotics.iiit.ac.in/) (RRC), advised by
**Prof. K. Madhava Krishna** and collaborating with **Prof. Sourav Garg**.

I work on **vision-based navigation**: getting a robot with little more than a camera to
figure out where it is, where it has already been, and which way it should go next. My
first project at RRC was reviving and benchmarking the lab's deep visual-servoing work
(RTVS and Imagine2Servo) across varying viewpoint angles and query-to-goal distances. I
then moved to the topological navigation thread, where I co-developed the loop-detection
pipeline behind [PixelLoop]({{ '/publications/' | relative_url }}) — pixel-level loop closures that let
topological navigation methods such as MASt3R-Nav take shortcuts — accepted to **IROS
2026**. Most recently I fine-tuned VGGT with a new prediction head that turns a single RGB
image into a goal-conditioned geodesic costmap, which became
[Plann3r]({{ '/publications/' | relative_url }}), accepted to **CoRL 2026** as first author.

These days I am thinking about topological navigation, visual place recognition, and
RGB-only last-mile docking for mobile robots. Away from the lab I build things under time
pressure: four hackathon wins between 2024 and 2026, including a Stable Diffusion style
editor running entirely on a Qualcomm NPU and a mess crowd-prediction system that now ships
inside the official MyIIIT app. Have a look at my [projects]({{ '/projects/' | relative_url }}) or my
[CV]({{ '/cv/' | relative_url }}).
