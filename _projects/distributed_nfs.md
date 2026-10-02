---
layout: page
title: Distributed Network File System
description: Storage servers, a naming server and concurrent clients, in C
category: systems
importance: 2
---

A distributed file system written from scratch in **C**, with three components: **storage
servers** that hold the data, a **naming server** that resolves paths to the server holding
them, and **clients**.

It handles **concurrent requests** from multiple clients and supports **streaming** of text,
audio and video, over a structured directory system with the concurrency control to keep it
consistent under simultaneous access.
