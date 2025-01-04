---
layout: page
title: Path Planning with Kinodynamic Constraints
description:
img: assets/img/drone3D_view3.png
importance: 1
category: work
related_publications: false
---

<!-- Every project has a beautiful feature showcase page.
It's easy to include images in a flexible 3-column grid format.
Make your photos 1/3, 2/3, or full width.

To give your project a background in the portfolio page, just add the img tag to the front matter like so:

    ---
    layout: page
    title: project
    description: a project with a background image
    img: /assets/img/drone3D_view3.png
    --- -->
<h1>Problem Statement</h1>
This project focuses on a real-time trajectory planner for drones operating in unknown environments under kinodynamic constraints. The primary aim is to develop an intelligent navigation system for drones that can operate autonomously in environments that are not known beforehand. The research specifically addresses the challenge of incorporating kinodynamic constraints considering both kinematic limitations and dynamic constraints. The emphasis on real-time computation is crucial because decisions must be made instantaneously during flight and path adjustments need to occur immediately when new obstacles are detected. The primary research question to be investigated in this study is: <br><b>How can drones effectively navigate and avoid obstacles in real-time while operating in completely unknown environments?</b>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/drone2D_traj1.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/drone2D_traj2.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/drone2D_traj3.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    2D environment showcasing three different start and goal position pairs and the planned path for each of these pairs.
</div>
<h2>Implementation</h2>
Our framework implements a kinodynamically-constrained RRT planner that synthesizes feasible trajectories by incorporating the drone’s dynamic and kinematic constraints during path computation from start to goal states. While operating in the exploration phase, our system employs the tree-based RRT planner since it provides efficient sampling-based exploration of configuration space, enables real-time path computation, and naturally incorporates both kinodynamic constraints and information gain metrics for unknown environment navigation. Our implementation of the planner consists of an addition to the original RRT planner. Since we can only see the obstacles upto a certain range from the drone, we cannot plan the complete trajectory in one shot. To achieve a trajectory from start to goal, we compute the sub-paths till the visible region and append these to create the complete path. At the initial configuration, the drone plans the complete path from start to goal. However, since it can only see upto the visible region, we extract the sub-path from the planned trajectory and prune the rest of the path. The last node in the visible region now becomes our new start position and we again plan the trajectory from the new start position to the goal position. We repeat the pruning process and re-assigning of the start position until our goal is inside the visible region. Every iteration of this adds a sub-path to our global path of the initial start and goal conditions.

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/metrics.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Planner Matrics for 2D and 3D in 'OMPL Only' Environment
</div>
<h2>OMPL Environment</h2>
The 2D and 3D environment was designed as a simple workspace where planning tasks relied solely on the OMPL framework. It served as a baseline to evaluate the planner’s ability to generate kinodynamically feasible trajectories without the added complexity of integrating mapping and collision detection libraries.

• Evaluations were performed on the 2D planner, taking three different step sizes, where the planner was run 5 times for each condition.<br>
• It was observed that lower step sizes resulted in higher probability of finding the path, where the success rate was defined on number of sub-paths planned for the complete
path.<br>
• If the number of sub-paths crossed 20 and the planner failed to reach the goal region then the result of the planner was indicated as FAIL else it was indicated as
SUCCESS.

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Octomap_Env2.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    The Gazebo environment and the corresponding Octomap for real time planning in simulation
</div>

<!-- You can also put regular text between your rows of images, even citations {% cite einstein1950meaning %}.
Say you wanted to write a bit about your project before you posted the rest of the images.
You describe how you toiled, sweated, _bled_ for your project, and then... you reveal its glory in the next row of images. -->
<h2>Gazebo Environment</h2>
The second environment was more complex, featuring a group of pillars represented within an OctoMap framework. These pillars were modeled as obstacles, providing a realistic and cluttered environment for testing. The OctoMap provided a hierarchical representation of the 3D space, while the EDT3D library enabled precise local collision detection by computing the distances to obstacles within a defined local window around the drone.

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/SimPlanner.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    The planned path for the environment in Simulation.
</div>

<h2>Challenges and Results</h2>
The integration of OctoMap and EDT3D posed additional computational challenges due to the high demands of processing large maps and performing real-time collision detection. However, the offline setup allowed the planner to utilize the pre-generated map efficiently. The results demonstrated:<br>
• Accuracy: The planner effectively avoided all obstacles in the environment in its successful run, showcasing its robust collision avoidance capabilities.<br>
• Scalability: The modular design of the planner enabled it to handle both simpler OMPL-only scenarios and more complex OctoMap-based environments with ease.<br>
• Flexibility: The planner adapted seamlessly to varied start and goal configurations while maintaining smooth, kinodynamically feasible trajectories.

<h2>Platform and Evaluation</h2>
Tools and Platforms used on the project are as follows:
<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Tools.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

<h2>Limitations of the Project</h2>
• Since the main focus of the project is planning of the motion of the drone, the project would be tested and targeted for a simulation environment and not a real world
environment.<br>
• Our system would not be as fast as RL based approaches since the sequential nature of our mapping-then-planning architecture introduces additional processing time compared to RL-based methods which learn to map and plan concurrently.<br>
• The approach followed in this paper is meant for static environments and is not very suitable for dynamic scenes.
