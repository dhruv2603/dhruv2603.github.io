---
layout: page
title: Out of Control Planning
description:
img: assets/img/fig1.png
importance: 2
category: work
---

<h1>Problem Statement</h1>
<ul>
<li>Plan motions for non-holonomic systems whose dynamics are described by an ordinary differential equation of the form $$\dot{q} = f(q,u)$$</li>
<li>Compute the dynamically feasible and collision free motions for these systems using RRt and KPIECE planners</li>
<li>Learn about and implement a new planner called Reachability-Guided RRT (RG-RRT)</li>
</ul>

<h2>Results</h2>
The path for the three different planners KPIECE RRT and RGRRT are shown below:
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/pendulum_path_KPIECE_Tau1.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/pendulum_path_RRT_Tau1.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/pendulum_path_RGRRT_Tau1.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Pendulum Path planners. Left image shows KPIECE planner, middle image RRT and right image shows RGRRT planner.
</div>
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/car_path_KPIECE.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/car_path_RRT.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/car_path_RGRRT.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Car Path planners. Left image shows KPIECE planner, middle image RRT and right image shows RGRRT planner.
</div>

Benchmarking of the planners for both cases were perofrmed and the results obtained as shown below:
<h3>Pendulum</h3>
<table border="1" style="width: 100%; text-align: center;">
    <thead>
        <tr>
            <th colspan="4"><strong>Computation Time</strong></th>
        </tr>
        <tr>
            <th><strong>RRT</strong></th>
            <th><strong>KPIECE</strong></th>
            <th><strong>RGRRT</strong></th>
            <th><strong>Computation Time</strong></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Min</td>
            <td>Close to KPIECE</td>
            <td>Least</td>
            <td>Highest</td>
        </tr>
        <tr>
            <td>Max</td>
            <td>Highest</td>
            <td>Close to RRT</td>
            <td>Lowest</td>
        </tr>
        <tr>
            <td>Median</td>
            <td>Highest</td>
            <td>Least</td>
            <td>Close to RRT</td>
        </tr>
        <tr>
            <td>1st Quartile</td>
            <td>Close to RGRRT</td>
            <td>Least</td>
            <td>Highest</td>
        </tr>
        <tr>
            <td>3rd Quartile</td>
            <td>Highest</td>
            <td>Least</td>
            <td>Higher than RGRRT</td>
        </tr>
        <tr>
            <td>Inter-Quartile Range</td>
            <td>Widest</td>
            <td>Smallest</td>
            <td>Higher than KPIECE</td>
        </tr>
    </tbody>
</table>
<table border="1" style="width: 100%; text-align: center;">
    <thead>
        <tr>
            <th colspan="4"><strong>Solution Length</strong></th>
        </tr>
        <tr>
            <th><strong>RRT</strong></th>
            <th><strong>KPIECE</strong></th>
            <th><strong>RGRRT</strong></th>
            <th><strong>Solution Length</strong></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Min</td>
            <td>Significantly high</td>
            <td>Highest</td>
            <td>Least</td>
        </tr>
        <tr>
            <td>Max</td>
            <td>Significantly high</td>
            <td>Highest</td>
            <td>Least</td>
        </tr>
        <tr>
            <td>Median</td>
            <td>Significantly high</td>
            <td>Highest</td>
            <td>Least</td>
        </tr>
        <tr>
            <td>1st Quartile</td>
            <td>Significantly high</td>
            <td>Highest</td>
            <td>Least</td>
        </tr>
        <tr>
            <td>3rd Quartile</td>
            <td>Significantly high</td>
            <td>Highest</td>
            <td>Least</td>
        </tr>
        <tr>
            <td>Inter-Quartile Range</td>
            <td>Similar to KPIECE</td>
            <td>Highest</td>
            <td>Least</td>
        </tr>
    </tbody>
</table>
<table border="1" style="width: 100%; text-align: center;">
    <thead>
        <tr>
            <th colspan="4"><strong>Tree Nodes</strong></th>
        </tr>
        <tr>
            <th><strong>RRT</strong></th>
            <th><strong>KPIECE</strong></th>
            <th><strong>RGRRT</strong></th>
            <th><strong>Tree Nodes</strong></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Min</td>
            <td>Highest</td>
            <td>Significantly high</td>
            <td>Least</td>
        </tr>
        <tr>
            <td>Max</td>
            <td>Highest</td>
            <td>Significantly high</td>
            <td>Least</td>
        </tr>
        <tr>
            <td>Median</td>
            <td>Highest</td>
            <td>Significantly high</td>
            <td>Least</td>
        </tr>
        <tr>
            <td>1st Quartile</td>
            <td>Highest</td>
            <td>Significantly high</td>
            <td>Least</td>
        </tr>
        <tr>
            <td>3rd Quartile</td>
            <td>Highest</td>
            <td>Significantly high</td>
            <td>Least</td>
        </tr>
        <tr>
            <td>Inter-Quartile Range</td>
            <td>Highest</td>
            <td>Similar to RGRRT</td>
            <td>Least</td>
        </tr>
    </tbody>
</table>
<table border="1" style="width: 100%; text-align: center;">
    <thead>
        <tr>
            <th colspan="4"><strong>Success Rate</strong></th>
        </tr>
        <tr>
            <th><strong>RRT</strong></th>
            <th><strong>KPIECE</strong></th>
            <th><strong>RGRRT</strong></th>
            <th><strong>Success Rate</strong></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Approximate solution</td>
            <td>100%</td>
            <td>100%</td>
            <td>100%</td>
        </tr>
    </tbody>
</table>
<br>

Summarizing from the above table, we conclude that:
<ul>
    <li>The median path length for RGRRT is the least.</li>
    <li>The median number of tree nodes is very low for RGRRT.</li>
</ul>

Car
<table border="1" style="width: 100%; text-align: center;">
    <thead>
        <tr>
            <th colspan="4"><strong>Computation Time</strong></th>
        </tr>
        <tr>
            <th><strong>RRT</strong></th>
            <th><strong>KPIECE</strong></th>
            <th><strong>RGRRT</strong></th>
            <th><strong>Computation Time</strong></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Min</td>
            <td>Higher than RGRRT</td>
            <td>Highest</td>
            <td>Least</td>
        </tr>
        <tr>
            <td>Max</td>
            <td>Close to KPIECE</td>
            <td>Least</td>
            <td>Highest</td>
        </tr>
        <tr>
            <td>Median</td>
            <td>Close to KPIECE</td>
            <td>Highest</td>
            <td>Least</td>
        </tr>
        <tr>
            <td>1st Quartile</td>
            <td>Close to KPIECE</td>
            <td>Highest</td>
            <td>Least</td>
        </tr>
        <tr>
            <td>3rd Quartile</td>
            <td>Close to KPIECE</td>
            <td>Highest</td>
            <td>Least</td>
        </tr>
        <tr>
            <td>Inter-Quartile Range</td>
            <td>Close to KPIECE</td>
            <td>Smallest</td>
            <td>Widest</td>
        </tr>
    </tbody>
</table>
<table border="1" style="width: 100%; text-align: center;">
    <thead>
        <tr>
            <th colspan="4"><strong>Solution Length</strong></th>
        </tr>
        <tr>
            <th><strong>RRT</strong></th>
            <th><strong>KPIECE</strong></th>
            <th><strong>RGRRT</strong></th>
            <th><strong>Solution Length</strong></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Min</td>
            <td>Highest</td>
            <td>Least</td>
            <td>Close to KPIECE</td>
        </tr>
        <tr>
            <td>Max</td>
            <td>Highest</td>
            <td>Higher than RGRRT</td>
            <td>Least</td>
        </tr>
        <tr>
            <td>Median</td>
            <td>Highest</td>
            <td>Least</td>
            <td>Very close to KPIECE</td>
        </tr>
        <tr>
            <td>1st Quartile</td>
            <td>Highest</td>
            <td>Least</td>
            <td>Very close to KPIECE</td>
        </tr>
        <tr>
            <td>3rd Quartile</td>
            <td>Highest</td>
            <td>Close to RGRRT</td>
            <td>Least</td>
        </tr>
        <tr>
            <td>Inter-Quartile Range</td>
            <td>Highest</td>
            <td>Higher than RGRRT</td>
            <td>Least</td>
        </tr>
    </tbody>
</table>
<table border="1" style="width: 100%; text-align: center;">
    <thead>
        <tr>
            <th colspan="4"><strong>Tree Nodes</strong></th>
        </tr>
        <tr>
            <th><strong>RRT</strong></th>
            <th><strong>KPIECE</strong></th>
            <th><strong>RGRRT</strong></th>
            <th><strong>Tree Nodes</strong></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Min</td>
            <td>Highest</td>
            <td>Significantly high</td>
            <td>Least</td>
        </tr>
        <tr>
            <td>Max</td>
            <td>Highest</td>
            <td>Significantly high</td>
            <td>Least</td>
        </tr>
        <tr>
            <td>Median</td>
            <td>Highest</td>
            <td>Significantly high</td>
            <td>Least</td>
        </tr>
        <tr>
            <td>1st Quartile</td>
            <td>Highest</td>
            <td>Significantly high</td>
            <td>Least</td>
        </tr>
        <tr>
            <td>3rd Quartile</td>
            <td>Highest</td>
            <td>Significantly high</td>
            <td>Least</td>
        </tr>
        <tr>
            <td>Inter-Quartile Range</td>
            <td>Highest</td>
            <td>Higher than RGRRT</td>
            <td>Least</td>
        </tr>
    </tbody>
</table>
<table border="1" style="width: 100%; text-align: center;">
    <thead>
        <tr>
            <th colspan="4"><strong>Success Rate</strong></th>
        </tr>
        <tr>
            <th><strong>RRT</strong></th>
            <th><strong>KPIECE</strong></th>
            <th><strong>RGRRT</strong></th>
            <th><strong>Success Rate</strong></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Approximate solution</td>
            <td>100%</td>
            <td>100%</td>
            <td>100%</td>
        </tr>
    </tbody>
</table>
<br>

Summarizing from the above table, we conclude that:
<ul>
    <li> The median path length for RGRRT and KPIECE is least and similar to each other. However path length varies more for KPIECE from one iteration to the other.</li>
    <li> The median number of tree nodes is much much less for RGRRT.</li>
</ul>
