---
layout: page
title: Quadrotor Control
description: PID and LQR control of a Quadrotor
img: assets/img/ExampleImage.png
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
    img: /assets/img/12.jpg
    --- -->
<h1>Problem Statement</h1>
Trajectory following with PID and LQR Controllers.<br>
Integrate the trajectory generator and controller to simulate the quadrotor flying in the space tracking a trajectory. Combine with PD controller. In addition you implement a LQR controller for the quadrotor, combine with trajectory generation system designed at
previous step, see if the results are better compared to using PID/PD controller.

<h2>LQR Implementation</h2>

The state vector of the quadrotor is taken as:

<div class="mathjax-equation">
    $$ 
    X = \left[\begin{array}{c}
    x \\
    y \\
    z \\
    \dot{x} \\
    \dot{y} \\
    \dot{z} \\
    \phi \\
    \theta \\
    \psi \\
    p \\
    q \\
    r
    \end{array}\right]
    $$
</div>
where <b>p</b> is the angular velocity around x, <b>q</b> is the angular velocity around y and <b>r</b> is the angular velocity around z.

The rate of change of state vector is then calculated as:
<div class="mathjax-equation">
    $$
    X = \left[\begin{array}{c}
    \dot{x} \\
    \dot{y} \\
    \dot{z} \\
    \ddot{x} \\
    \ddot{y} \\
    \ddot{z} \\
    \dot{\phi} \\
    \dot{\theta} \\
    \dot{\psi} \\
    \dot{p} \\
    \dot{q} \\
    \dot{r}
    \end{array}\right]
$$
</div>
where $$\dot{p}$$, $$\dot{q}$$ and $$\dot{r}$$ are the angular accelerations around x,y and z.

Now we can write the state space equation as:
<div class="mathjax-equation">
$$
\dot{X} = f(X,U)
$$
</div>
We can use Taylor's approximation to Linenarize the above equation to get:
<div class="mathjax-equation">
$$
\dot{X} = AX + BU
$$
</div>
where A is the Jacobian obtained by partially differentiating f(X,U) with X and B is the Jacobian obtained by partially differentiating f(X,U) with U.

The Q and R matrices have been calculated by trial and error method where
<div class="mathjax-equation">
$$
Q = diag([20,20,20,1,1,1,0.01,0.01,0.01,0.01,0.01,0.01])
$$
</div>
<div class="mathjax-equation">
$$
R = diag([0.001,0.1,0.1,0.1])
$$
</div>
which penalizes the cost function more for position and velocity errors in the state and penalizes the control of x,y and z moments.

<h2>Results</h2>

<h3>1. Circle</h3>
The results for the circular trajectory comparing both PD control and LQR control are given below:

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/circle_pid.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/circle_lqr.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Circular Trajectory
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/position_circle_pid.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/position_circle_lqr.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Position Tracking
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/velocity_circle_pid.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/velocity_circle_lqr.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Velocity Tracking
</div>

As seen from the above comparison, the LQR tracks the circular trajectory in a better way than the PD control method.
The desired and current position and velocity curves are much closer in LQR graphs than in PD controller graph.

<h3>2. Diamond</h3>
The results for the diamond trajectory comparing both PD control and LQR control are given below:

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/diamond_pid.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/diamond_lqr.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Diamond Trajectory
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/position_diamond_pid.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/position_diamond_lqr.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Position Tracking
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/velocity_diamond_pid.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/velocity_diamond_lqr.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Velocity Tracking
</div>

Similar to the circular trajectory case, the LQR tracks the diamond trajectory in a better way than the PD control method.<br>
The desired and current position and velocity curves are much closer in LQR graphs than in PD controller graph.<br>
From the above comparisons, we can see that LQR minimizes the cost function based on the Q and R values and provides an optimal control solution that tracks the desired trajectory closely by taking advantage of the full state feedback control.<br>
However, LQR has a few drawbacks too.<br>
LQR requires solving the Riccati Equation which is mathematically complex and comaputationally expensive to solve especially for high dimensional systems.<br>
LQR assumes a perfectly known system model. If the system model is inaccurate or subject to significant uncertainties, the performance of the LQR controller may degrade or become suboptimal.
