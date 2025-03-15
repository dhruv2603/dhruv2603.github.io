---
layout: about
title: About
permalink: /


profile:
  align: left
  image: profile_pic.jpg
  image_circular: true # crops the image to make it circular

news: false # includes a list of news items
selected_papers: false # includes a list of papers marked as "selected={true}"
social: true # includes social icons at the bottom of the page
---
I am a graduate researcher at ACP Lab, pursuing a Master’s degree in [Robotics Engineering](https://www.wpi.edu/academics/departments/robotics-engineering) at [Worcester Polytechnic Institute (WPI)](https://www.wpi.edu/), where I specialize in designing autonomous robotic systems capable of intelligently perceiving and interacting with complex environments. 

My project work leverages advanced optimization and control methodologies to enhance robotic autonomy and performance. Through coursework such as [Foundations of Robotics](https://wpi-grad.cleancatalog.net/robotics-engineering-mechanical-engineering/rbe-500-me-527), [Motion Planning](https://wpi-grad.cleancatalog.net/robotics-engineering/rbe-550), [Robot Control](https://wpi-grad.cleancatalog.net/robotics-engineering/rbe-502), [Robot Dynamics](https://wpi-grad.cleancatalog.net/robotics-engineering-mechanical-engineering/rbe-501me-528) and [Computer Vision](https://pear.wpi.edu/teaching/rbe549/spring2025.html) I’ve gained gained hands-on expertise in developing algorithms and systems that enable robots to plan and execute tasks, navigate obstacles and achieve their goals effectively.

Before starting my graduate studies, I worked for two years at Jio Platforms Ltd., where I specialized in developing State of Charge (SoC) and State of Health (SoH) algorithms for Battery Management Systems (BMS). My work involved tackling complex challenges to improve the accuracy of both model-based and data-driven methods. During my time at Jio, I also developed custom Python scripts for Secure Renewable Energy Certificate (SREC) generation, facilitating firmware flashing to the bootloader. Additionally, I contributed to the design and development of firmware for an Electric Vehicle (EV) charger system, leveraging the [OCPP](https://openchargealliance.org/protocols/open-charge-point-protocol/) (Open Charge Point Protocol) for seamless communication.

<!-- Put your address / P.O. box / other info right below your picture. You can also disable any of these elements by editing `profile` property of the YAML header of your `_pages/about.md`. Edit `_bibliography/papers.bib` and Jekyll will render your [publications page](/al-folio/publications/) automatically. -->
---
## Projects

Here are some of my recent projects:

<div class="projects">
{% if site.enable_project_categories and page.display_categories %}
  <!-- Display categorized projects -->
  {% for category in page.display_categories %}
  <a id="{{ category }}" href=".#{{ category }}">
    <h2 class="category">{{ category }}</h2>
  </a>
  {% assign categorized_projects = site.projects | where: "category", category %}
  {% assign sorted_projects = categorized_projects | sort: "importance" %}
  <!-- Generate cards for each project -->
  {% if page.horizontal %}
  <div class="container">
    <div class="row row-cols-1 row-cols-md-2">
    {% for project in sorted_projects %}
      {% include projects_horizontal.liquid %}
    {% endfor %}
    </div>
  </div>
  {% else %}
  <div class="row row-cols-1 row-cols-md-3">
    {% for project in sorted_projects %}
      {% include projects.liquid %}
    {% endfor %}
  </div>
  {% endif %}
  {% endfor %}

{% else %}

<!-- Display projects without categories -->

{% assign sorted_projects = site.projects | sort: "importance" %}

  <!-- Generate cards for each project -->

{% if page.horizontal %}

  <div class="container">
    <div class="row row-cols-1 row-cols-md-2">
    {% for project in sorted_projects %}
      {% include projects_horizontal.liquid %}
    {% endfor %}
    </div>
  </div>
  {% else %}
  <div class="row row-cols-1 row-cols-md-3">
    {% for project in sorted_projects %}
      {% include projects.liquid %}
    {% endfor %}
  </div>
  {% endif %}
{% endif %}
</div>