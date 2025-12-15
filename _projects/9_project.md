---
layout: page
title: UKF-Based Inertial Navigation
description: Nonlinear Kalman filtering for MEMS-IMU and GNSS fusion on real vehicle trajectories
img: assets/img/UKF/card_img.png
importance: 3
category: work
---

<h1>Overview</h1>
This project implements a nonlinear Kalman filter (UKF) for strapdown inertial navigation using MEMS-grade IMU and GNSS data from the MEMS-Nav dataset.  
The system estimates full 3D navigation states in the local-level frame and fuses inertial and satellite measurements to produce robust vehicle trajectories with bounded error.  

<h1>Strapdown INS Modeling</h1>
The navigation state is represented in the local-level frame using latitude, longitude, altitude, NED velocity components, and roll–pitch–yaw attitude angles.  
Classical strapdown mechanization equations propagate the attitude matrix, transform IMU specific forces into the navigation frame, and update velocity and position while accounting for Earth rotation, transport rate, and gravity variation.  

<h3 style="text-align: center;">Attitude, Velocity, and Position Updates</h3>
Angular rate measurements from the gyroscopes drive an attitude update that includes body rotation, Earth rotation, and local-level transport rate effects.  
Transformed specific force is integrated to update NED velocities, which in turn are integrated on the WGS84 ellipsoid to update latitude, longitude, and altitude over time.  

<h3 style="text-align: center;">Bias and Noise Modeling</h3>
To capture key error sources, the state vector augments navigation states with accelerometer and gyroscope biases modeled as random walks.  
Process noise levels are chosen per-state (position, velocity, attitude, and biases) to reflect realistic MEMS-grade sensor characteristics and to stabilize the filter.  

<h1>Unscented Kalman Filter Design</h1>
A nonlinear Kalman filter variant is used to fuse IMU-driven INS propagation with GNSS-derived position measurements.  
The UKF generates sigma points over the full state, propagates them through the nonlinear motion model, and updates them using GNSS measurements to obtain a corrected state and covariance.  

<h3 style="text-align: center;">Measurement Models</h3>
GNSS provides latitude, longitude, and altitude measurements along with horizontal and vertical accuracy values that inform the measurement noise covariance.  
The filter can operate with both basic position-only measurement models and extended models that leverage additional GNSS-derived quantities such as speed and heading when available.  

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/UKF/trajectory_3d.png" title="Fused trajectory" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Fused INS–GNSS trajectory after UKF correction.
</div>

<h3 style="text-align: center;">Loosely Coupled, Closed-Loop Fusion</h3>
A loosely coupled architecture treats GNSS outputs as direct measurements of navigation state rather than processing raw satellite signals.  
Closed-loop feedback is used: the UKF corrections are fed back into the INS state (including sensor biases), reducing drift and improving short-term dead-reckoning performance between GNSS updates.  

<h1>Error Metrics and Evaluation</h1>
Filter performance is evaluated by comparing estimated trajectories against GNSS baselines using raw state differences and great-circle (Haversine) distance.  
Additional metrics such as root-mean-square error over time are used to quantify how well the filter tracks latitude, longitude, and altitude across multiple runs.  

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/UKF/haversine.png" title="Error metrics" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Haversine distance between UKF estimates and GNSS reference.
</div>

<h3 style="text-align: center;">Accuracy Targets and Extensions</h3>
A key design goal is to achieve navigation errors at or below the reported GNSS accuracy values, demonstrating that the filter properly fuses inertial and satellite data.  
Extensions include experimenting with different process/measurement noise settings, richer measurement models, or comparing EKF and UKF performance on the same dataset.  

<style>
    pre {
        background-color: #fff;
        border: 1px solid #ddd;
        padding: 15px;
        font-family: "Courier New", Courier, monospace;
        white-space: pre-wrap;
        word-wrap: break-word;
        font-size: 14px;
    }
    .algorithm {
        background-color: #f9f9f9;
        border-radius: 10px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        padding: 20px;
    }
    .algorithm ol {
        margin-left: 20px;
    }
    .algorithm li {
        margin: 10px 0;
    }
</style>
