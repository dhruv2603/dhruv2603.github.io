---
layout: page
title: Particle Filter Drone Navigation
description: Vision-based pose estimation and particle filter navigation for a nano-quadrotor
img: assets/img/ParticleFilter/card_img.png
importance: 3
category: work
---

<h1>Overview</h1>
This project develops a computer vision–based pose estimation pipeline and a particle filter navigation system for a nano-quadrotor flying over an AprilTag mat.   
The work is split into two tightly coupled parts: a perspective-n-point (PnP) observation model that estimates the drone pose from camera images, and a fifteen-state inertial navigation particle filter that fuses this pose with IMU data.   

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/ParticleFilter/tag.png" title="April Tag" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    An April Tag. 
</div>

<h1>Drone Observation Model</h1>
This module implements a perspective-n-point (PnP) observation model that uses calibrated camera intrinsics and an AprilTag map to estimate the 6-DoF pose of the drone.   
Each image provides AprilTag detections with pixel-space corner coordinates and IDs; these are paired with their known 3D world-frame locations to form 2D–3D correspondences for pose estimation.   

<h3 style="text-align: center;">AprilTag Map and Calibration</h3>
The AprilTags are arranged in a 12×9 grid with known tag size and spacing, allowing the 3D coordinates of every tag corner in the world frame to be computed analytically.   
Camera intrinsics and radial/tangential distortion parameters are provided, and the estimated camera pose is transformed into the drone body frame using a fixed extrinsic transform.   

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/ParticleFilter/card_img.png" title="AprilTag map" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    AprilTag landing mat used as a global map for pose estimation. 
</div>

<h3 style="text-align: center;">PnP Pose Estimation</h3>
For each frame, the pipeline extracts corner points of all visible AprilTags and feeds their 2D–3D correspondences to a PnP solver (e.g., OpenCV’s solvePnP) to estimate camera position and orientation.   
The resulting rotation matrix is converted to Euler angles (roll, pitch, yaw) using analytic expressions derived from the matrix structure to resolve angle ambiguities.   

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/ParticleFilter/trajectory_obs.png" title="Pose estimation" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Estimated vs. ground-truth 3D trajectory from the PnP-based observation model. 
</div>

<h3 style="text-align: center;">Trajectory Visualization</h3>
The estimated pose is computed for each time step and compared to motion-capture ground truth, producing 3D position plots and roll/pitch/yaw time histories.   
These visualizations highlight how AprilTag visibility, viewing angle, and tag layout influence pose accuracy across the trajectory.   

<h3 style="text-align: center;">Covariance Estimation</h3>
To use the observation model inside a navigation filter, the measurement noise covariance is estimated from residuals between the PnP pose estimates and motion-capture ground truth.   
Sample covariance over position and orientation residuals is computed and then adjusted into a practical covariance matrix \(R\) that captures realistic sensor noise while remaining numerically stable.   

<h1>Particle Filter Navigation</h1>
The navigation component uses a fifteen-state inertial model driven by IMU measurements to propagate a set of particles representing possible drone states.   
States include 3D position, 3D velocity, 3D attitude (Euler Z–X–Y), and accelerometer and gyroscope biases, allowing the filter to model both motion and slowly varying sensor errors.   

<h3 style="text-align: center;">Process Model and IMU Modeling</h3>
IMU outputs (angular velocity and linear acceleration) are modeled as noisy versions of the true body-frame motion, with additive white noise and bias random walks for both gyroscopes and accelerometers.   
The process model uses these IMU signals, gravity, and the current attitude to propagate position, velocity, orientation, and bias states forward in time for each particle.   

<h3 style="text-align: center;">Vectorized Particle Propagation</h3>
To handle thousands of particles efficiently, the implementation stores all particles in an array and applies vectorized linear algebra operations for prediction and update.   
This approach avoids Python-level loops, significantly reducing runtime and enabling experiments with particle counts from 250 up to 5000.   

<h3 style="text-align: center;">Measurement Update and Resampling</h3>
At measurement times, the AprilTag-based observation model provides a pose measurement and covariance, which are used to compute importance weights for each particle via the observation likelihood.   
A low-variance resampling algorithm then draws a new particle set from the weighted distribution, focusing computational effort on high-probability regions and mitigating particle degeneracy.   

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/ParticleFilter/trajectory_pf.png" title="Particle Filter" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Filtered vs. ground-truth 3D trajectory from the Particle filter model.
</div>

<h3 style="text-align: center;">Navigation Solution and Metrics</h3>
Because a particle filter represents the state distribution as a weighted set, the navigation solution is obtained using statistics such as maximum-weight particle, unweighted mean, or weighted mean over all particles.   
For each choice, root-mean-square error (RMSE) versus ground truth is computed, enabling comparison of solution strategies and quantifying the effect of particle count on accuracy.   

<h1>Analysis and Comparison</h1>
The project includes a comparison between the particle filter and a nonlinear Kalman filter from a related assignment, focusing on implementation effort, tuning difficulty, runtime, and tracking accuracy.   
While both are nonlinear estimators, the particle filter offers greater flexibility for non-Gaussian and multimodal distributions but requires more computation and careful particle management.   

<h3 style="text-align: center;">Key Takeaways</h3>
The combined system demonstrates how a vision-based PnP observation model can be integrated with an IMU-driven particle filter to achieve robust drone navigation over a known fiducial map.   
Experiments with different particle counts, covariance choices, and solution statistics provide insight into the trade-offs between accuracy, robustness, and computational cost in practical navigation systems.   

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
