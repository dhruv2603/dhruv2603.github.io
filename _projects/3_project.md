---
layout: page
title: Suntracker on Rocker-Bogie mechanism
description:
img: assets/img/Suntracker.jpg
importance: 2
category: work
---

<h1>Problem Statement</h1>
IV Labs summer project in which solar panels which always points towards sun are attached to an all terrain robot base(Rocker-Bogie mechanism) that is controlled remotely by Bluetooth joystick app. 

<h2>Software Required</h2>
<ul>
<li>Arduino IDE</li>
<li>Joystick Bluetooth Commander App</li>
</ul>

<h2>Theory</h2>
<ul>
<li>Rocker-Bogie Mechanism</li>
- X and Y values are used to have precise control of Left Hand Side(LHS) and Right Hand Side(RHS) motors. <br>
- Simply, if Y is +ve the LHS motors will have Y+X speed and RHS motor will have Y-X speed. <br>
- If Y is -ve then LHS motors  will have Y-X speed and RHS motors will have Y+X speed. <br>
- Direction of rotation will be decided according to the signage of values of Y+X and Y-X in both the cases. <br>
- This will the bot to move according to the position of joystick on screen. <br>
- It is easy to figure out how this can take care of all possible cases of movement one  might require fromm bot.
<li>Suntracker</li>
- In this case 4 ldrs are kept along +ve and -ve X-Y axis. Values obtained from ldrs along X-axis and Y-axis are compared and then the whole apparatus is moved with the help of two servos such that the difference between them becomes less than 50. <br>
- After every comparisions solar panels moves by 1 deg reducing the differnce between 
ldrs readings.
</ul>

<h2>Development</h2>
- A major problem spotted during the simulation phase was that the platform was extremely unstable. <br>
- In order to stabilize the platform efficiently, a three-gear differential mechanism has been used in which three identical bevel gears are arranged such that gear A and gear C are perpendicular to gear B as shown in the figure. <br>
- When one rocker tends to rotate, the gear at that end transfers the rotation to the gear B and eventually to the third gear such that gear A and gear C tend to rotate in the opposite direction, thus stabilizing the platform about the axles. 

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/differential_gear.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Differential gear mechanism
</div>

The robot is controlled by the joystick Bluetooth commander app.<br> 
The joystick is free to move anywhere inside the circle, thus giving the user more freedom while robot controlling. <br> 
When the app gets connected to the Bluetooth module HC−05 present in the robot, it is ready to send x and y coordinate signals of a joystick.<br> 
When y > 0, the speed of the left wheel is given by y+x and the speed of the right wheel is given by y − x. <br> 
However, if y < 0, it’s vice versa. <br> 
These values are then mapped according to the range of micro-controllers, so at extreme positions, maximum power is obtained.

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/bt_joystick.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Bluetooth Joystick App
</div>

As the robot is continuously moving through various terrains and time, fixed solar panels cannot absorb enough energy all the time.<br> 
In the sun-tracking mechanism, light-dependent resistors (LDRs) are used to detect the direction of the maximum intensity of solar rays.<br> 
Two servomotors are placed perpendicular to each other such that panels can move in a specific region. <br>
A special arrangement is made such that if solar panels are not perpendicular to rays, two LDRs will be exposed to more light than the other two, and then, the servomotors will rotate in such a way that the intensity of sunlight falling on each LDR is same.

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/solar_panels.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Bluetooth Joystick App
</div>

<h2>Result</h2>
The robot was tested to determine the extent of its capabilities on various terrains and lighting conditions and following features were determined:
<ul>
<li>Better stability on the platform due to differential gear mechanism</li>
<li>Ability to climb slope of gradient upto 45 degrees</li>
<li>Ability to traverse extremely uneven surfaces</li>
<li>Ability to climb steps of max height of 15cm</li>
<li>Improved energy absorbing efficiency from solar panels by 38.96 percent</li>
</ul>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/step_obstacles.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/eficiency_graph.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Left image shows robot in action while traversing eneven terrain while right image shows the improvement in energy efficiency due to movement of solar panels.
</div>
