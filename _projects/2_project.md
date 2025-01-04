---
layout: page
title: Robotic Arm Manipulation
description: Manipulating and Controlling a robotic arm in real world
img: assets/img/RoboticArm.png
importance: 2
category: work
giscus_comments: false
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
<h1>Problem Statement 1</h1>
<ul>
<li>Implement a forward kinematics node that:</li>
<ul>
<li>Subscribes to the joint values topic and reads them from the robot's joint states topic.</li>
<li>Calculates the end effector pose</li>
<li>Publishes the pose as a ROS topic</li>
</ul>
<li>Implement an inverse kinematics node that has a service client implementation that takes a desired pose of the end effector from the user and returns joint positions as response.</li>
<li>Place an object at a particular location on the chess board. Calculate the inverse kinematics for that gripper pose to find the point angles. Move the robot to that position, pick the object and lift it.</li>
</ul>

<h2>Implementation</h2>
<h3>1. Forward Kinematics</h3>
At each joint, the robot is assigned a frame and the DH-parameter table is calculated based on the frame assignments.<br>
The homogeneous transformation matrix w.r.t the previous frame can then be calculated as:

<div class="mathjax-equation">
$$
    A_i = \left[\begin{array}{cccc}
    cos\theta_i & -sin\theta_i cos\alpha_i & sin\theta_i sin\alpha_i & a_i cos\theta_i \\
    sin\theta_i & cos\theta_i cos\alpha_i & -cos\theta_i sin\alpha_i & a_i sin\theta_i \\
    0 & sin\alpha_i & cos\alpha_i & d_i \\
    0 & 0 & 0 & 1
    \end{array}
    \right]
$$
</div>
Finally, the pose of the end effector frame can be calclated w.r.t the base frame by multiplying all the frame transformation in between these frames.

The pose of the robotic arm is calculated for 3 different orientations as shown below:
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Robot_FK_1.jpeg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Robot_FK_2.jpeg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Robot_FK_3.jpeg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Robot Pose at three different positions
</div>

<h3>2. Inverse Kinematics</h3>
The side view and top view of the robot arm are shown in the figure below:

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/side-view.jpeg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/top-view.jpeg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Robot Top view and Side view
</div>

Using the geometry of the robot and the given pose, we can calculate the angles $$\theta_1$$, $$\theta_2$$, $$\theta_3$$ and $$\theta_4$$ <br>

The Inverse Kinematics node is tested with three different inputs using the <b>ros2 service call</b> command and the terminal outputs are shown below:
<div class="row justify-content-sm-center">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/IK_test_3.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Terminal Output
</div>

<h3>3. Object Manipulation</h3>
This is done with the help of the forwardn and inverse kinematics node.<br>
The position of the object is known.<br>
The desired pose of the robot arm is calculated such that the gripper is just above the object.<br>
This pose is sent to the inverse kinematics node to calculate the joint angles.<br>
The joint angles are calculated and provided to the controller to move the robot arm.<br>
Then the gripper is opened and desired pose at the object is sent to the inverse kinematics node, which provides the desired joint angles for the robot arm at the object position.<br>
When the robot moves to that position, the gripper is closed and again the robot arm is moved to the initial position which results in the pick action on the object.

{% include video.liquid path="assets/img/Bonus_Video.mp4" 
                   class="video-class" 
                   width="800" 
                   height="450" 
                   autoplay="false" 
                   controls="true" 
                   caption="Picking and placing an object" %}


<h1>Problem Statement 2</h1>
<ul>
<li>Implement a node wih two services:</li>
<ul>
<li>One takes joint velocities and converts them to end effector velocities.</li>
<li>The other takes end effector velocities and converts them to joint velocities.</li>
</ul>
<li>Create a node that provides incremental position references to the robot joints i.e. q_ref = q_ref_old + delta_q * sampling_time. The node would then send the q_ref to the joint position controllers of the robot as joint goals.</li>
<li>Give a constant velocity reference in the '+y' direction. Convert this velocity to the joint space velocities using the jacobian and feed it as a reference (detla_q) to the incremental position reference node.</li>
</ul>

<h2>Implementation</h2>
<ul>
<li>joint vel srv.py</li>
– Takes in joint velocities and gives back the end effector Twist<br>
– Created a service message named JointVel.srv in the custom service folder<br>
– The service message takes Float32Multiarray messgae type as input and provides a Twist message type as an output<br>
– Created a subscriber that requests Float32Multiarray message type for joint position values<br>
– Created a function that calculates transformation matrix from the given DH parameters for all the frames<br>
– Calculated the origin vectors and z vectors for all the joint frames and the end effector frame<br>
– Calculated the Jacobians for all the joints affecting the end effector and combined them to form the Jacobian matrix<br>
– Calculated the end effector Twist by multiplying the Jacobian Matrix and the joint velocities vector
<li>end eff vel.py</li>
– Takes in end effector Twist and gives back joint velocities<br>
– Created a service message named Twist.srv the custom service folder<br>
– The service message takes Twist message type as input and provides a Float32Multiarray message type as an output<br>
– Created a subscriber that requests Float32Multiarray message type for joint poisiton values<br>
– Created a function that calculates transformation matrix from the given DH parameters for all frames<br>
– Calculated the origin vectors and z vectors for all the joint frames and the end effector frame<br>
– Calculated the Jacobians for all the joints affecting the end effector and combined them to form the Jacobian matrix<br>
– Calculated the Pseudo-inverse of Jacobian matrix using Numpy<br>
– Calculated the joint velocities by multiplying the Pseudo-inverse of the Jacobian Matrix and the end effector Twist<br>
</ul>

The terminal output for the two services is shown below:

<div class="row justify-content-sm-center">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Ass2_Q1.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Terminal Output
</div>

For achieving a positive velocity in the y-direction, the steps taken to get to the solution are as follows:
• Created a new node named IncrementalPositionClient<br>
• Created a new client to request the SetJointPosition service<br>
• Created a new client to call the cal joint vel service created before which takes in end effector Twist and provides joint velocities<br>
• Developed a function to calculate forward kinematics from the current joint values<br>
• In the main function, hard coded the Twist of the the end effector and calculated the joint velocities and updated the joint position using the given formula:
<div class="mathjax-equation">
$$ qref = qref_{old} + ∆q ∗ sampling time $$
</div>
• Calculated the forward kinematics from the new joint position values and saved the end effector position in an array.<br>
• Plotted the end effector position vs time.<br>

The resutls are given below:
<div class="row justify-content-sm-center">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Grp_assn_2_Q2andQ3.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Terminal Output
</div>

Top right terminal window shows the joint output values from the service <b>cal_joint_vel</b> which takes in end effector twist and gives out joint velocities and the bottom right terminal window shows the output while running the <b>incremental_pos_client</b> node.

The trajectory of the end effector of the robot is saved in tractory.txt file and plotted with respect to time.<br>
Figure below shows three plots x vs time, y vs time and z vs time.<br>
The number of samples are 100 and sampling time is taken as 1 second.<br>
The end effector velocity in y-direction is taken as 1.0

The resutls are given below:
<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/trajectoy_plot.jpeg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Terminal Output
</div>

From the plot it can be seen that the robot is moving in y-direction in linear fashion to time.<br>
The z-direction values are also stable after a while and the x-values are also approximately stable.<br>

{% include video.liquid path="assets/img/robot_increment_video.mp4" 
                   class="video-class" 
                   width="800" 
                   height="450" 
                   autoplay="false" 
                   controls="true" 
                   caption="Incremental position change" %}

<h1>Problem Statement 3</h1>
<ul>
<li>Implement a position controller for your robot joints. Here we want you to write PD Controllers yourselves. DO NOT use the readily available ROS packages.</li>
<li>You need to apply your controller only to one of the actuators of the robot: Actuator 4. That is the actuator right before the gripper.</li>
<li>Your package will read the joint position values from actuator 4, receive a position reference value for the actuator through a service, and publish joint efforts/currents (continuously with high sampling rates) to the actuator to make it move to the desired location.</li>
<li>You will need to tune the PD gains (you do not need to calculate them in this assignment; the dynamics equation of robot is not provided anyways). While tuning, start with very small $K_p$ gain and zero $K_d$ gain. Gradually increase the $K_p$ gain until you see some overshoot. Then, increase $K_p$ and $K_d$ gains together, and try to achieve a fast convergence with minimal overshoot.</li>
</ul>

<h2>Implementation</h2>
<ul>
<li> The dynamixel_sdk_examples.zip folder was used and modified for our implementation, where the read_write_node.cpp and the current_read_write_node.cpp file were combined to form a single file combined_read_write.cpp. The same process was done for combining the hpp files.</li>
<li> From these files it was made sure that the topic set_current and the service get_position are available and working. </li>
<li> We made sure that corresponding message and service are present in the dynamixel_sdk_custom_interfaces folder and they were named as SetCurrent.msg and GetPosition.srv.</li>
<li> The PD controller node contains a publisher to set the current values to be given to motor 4, a client for getting the position values from the encoder of motor 4 and a custom service "PosRef.srv" for setting the desired position.</li>
<li> While trying out different gain values for the PD controller, we found that the values $$K_p = 0.3$$ and $$K_d = 0.01$$ worked optimally for our case. This can also be verified by the video shown below.</li>
</ul>

The results are given below:
<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Plot2.jpeg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Desired Position 1200
</div>

{% include video.liquid path="assets/img/Final_video.mp4" 
                   class="video-class" 
                   width="800" 
                   height="450" 
                   autoplay="false" 
                   controls="true" 
                   caption="PD control of the gripper" %}