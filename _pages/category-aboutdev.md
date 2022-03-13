---
title: "About Dev"
layout: archive
permalink: categories/aboutdev
author_profile: true
sidebar_main: true
---


{% assign posts = site.categories['About Dev'] %}
{% for post in posts %} {% include archive-single.html type=page.entries_layout %} {% endfor %}