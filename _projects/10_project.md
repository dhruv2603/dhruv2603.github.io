---
layout: page
title: Victoria Park SLAM
description: Lidar- and odometry-based SLAM with landmark mapping in Victoria Park
img: assets/img/SLAM/card_img.png
importance: 4
category: work
---

<h1>Overview</h1>
This project recreates the classic Victoria Park SLAM experiment, using a front-steered, rear-driven vehicle equipped with a lidar and GPS.  
Range–bearing measurements to trees, together with a kinematic vehicle model and planar GPS positions (x, y), are fused to simultaneously estimate the truck trajectory and a map of tree landmarks.  

<h1>Vehicle and Motion Modeling</h1>
The platform is modeled using an Ackermann steering configuration with front-axle steering and rear-axle drive.  
A three-state kinematic model in the vehicle frame tracks x position, y position, and yaw angle, driven by encoder speed and steering angle inputs over time.  

<h3>Ackermann Kinematic Model</h3>
Continuous-time equations relate vehicle speed and steering angle to forward and lateral motion and yaw rate, and are discretized to propagate the pose between sensor updates.  
Geometry parameters such as wheelbase and sensor offsets are incorporated to account for the separation between the vehicle reference point and the lidar mounting location.  

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/SLAM/card_img.png" title="Vehicle geometry" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Vehicle geometry and sensor placement for the Victoria Park dataset.
</div>

<h1>Measurement Models</h1>
The dataset provides planar GPS positions directly in Cartesian coordinates, so GPS measurements can be used without coordinate conversion.  
These GPS x–y positions act as noisy observations of the vehicle pose, with a fixed position noise model reflecting limited GPS accuracy.  

<h3">Lidar Range–Bearing Observations</h3>
The lidar returns 361 beams over a 180° field of view, each providing a range and bearing relative to the sensor frame.  
After filtering out invalid readings (e.g., beyond a maximum range), standard range–bearing equations relate each measurement to the truck pose and landmark positions in the global x–y frame.  

<h1>SLAM Algorithm</h1>
An extended Kalman filter (EKF SLAM) or FastSLAM framework is used to jointly estimate vehicle pose and landmark positions.  
The state vector contains the vehicle pose and a set of 2D tree landmarks, while the covariance captures uncertainty and correlations between them.  

<h3>Data Association and Landmark Updates</h3>
Individual lidar returns are clustered into tree-sized features, which are either matched to existing landmarks or used to initialize new ones.  
For associated landmarks, the filter updates both vehicle and landmark estimates using the range–bearing innovation and its Jacobians.  

<h1>Evaluation and Results</h1>
Performance is evaluated using vehicle position error, overall path consistency, and the stability and spread of landmark estimates.  
Plots of the estimated trajectory against GPS truth, along with landmark covariance ellipses, highlight how well the SLAM system localizes the vehicle and maps the environment.  

<div class="row justify-content-sm-center">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/SLAM/dead_reckoning.png" title="Dead reckoning" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/SLAM/slam.png" title="SLAM output" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Dead-reckoned trajectory versus SLAM-corrected trajectory with mapped landmarks.
</div>

<h3>Extensions</h3>
The framework can be extended by experimenting with different SLAM variants (e.g., EKF SLAM vs. FastSLAM) and clustering strategies based on tree trunk diameter.  
Additional comparisons between “dead reckoning + landmarks only” and “GPS-assisted SLAM” provide insight into how exteroceptive sensing bounds drift over long trajectories.  

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
