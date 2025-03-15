---
layout: page
title: Alohamora
description: Boundary Detection and Image Recognition
img: assets/img/Alohamora/card_image.jpg
importance: 3
category: work
---

<h1>Phase 1</h1>
Implementation of Pb-lite boundary detection algorithm using filter masks with a comparison to baseline Canny and Sobel outputs.

<h2>Process Overivew</h2>
The pb (probability of boundary) boundary detection algorithm significantly outperforms classical methods by considering texture and color discontinuities in addition to intensity discontinuities. Qualitatively, much of this performance jump comes from the ability of the pb algorithm to suppress false positives that the classical methods produce in textured regions. In this home work, a simplified version of pb is developed, which finds boundaries by examining brightness, color, and texture information across multiple scales (different sizes of objects/image). The output of the algorithm is a per-pixel probability of being a boundary. The simplified boundary detector is evaluated against the well regarded Canny and Sobel edge detectors. A qualitative evaluation is carried out against human annotations (ground truth) from a subset of the Berkeley Segmentation Data Set 500 (BSDS500).

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Aloharmora/Overwiew.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Pb-lite boundary detection overview
</div>

<h3>Filter Banks</h3>
The first step of the pb-lite boundary detection pipeline is
to filter the image with a set of filter banks. Three different
sets of filter banks have been created for this purpose:
<ul>
<li>Oriented Difference of Gaussian (DoG) Filters</li>
<li>Leung-Malik (LM) Filters</li>
<li>Gabor Filters</li>
</ul>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Aloharmora/DoG.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Aloharmora/LMS.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Aloharmora/Gabor.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Aloharmora/LML.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Filter Banks for boundary detection of images
</div>

<h3>Texton Map</h3>
Filtering an input image with each element of the filter bank results in a vector of filter responses centered on each pixel. If the filter bank has N filters, then there are N filter responses at each pixel. A distribution of these N-dimensional filter responses could be thought of as encoding texture properties. This representation is simpyfied by replacing each N-dimensional vector with a discrete texton ID. This is done by clustering the filter responses at all pixels in the image in to K textons using kmeans clustering. Each pixel is then represented by a one-dimensional, discrete cluster ID instead of a vector of high-dimensional, real-valued filter responses known as “Vector Quantization”. This can be represented with a single channel image with values in the range of [1,2,3,...,K] where K=64.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Aloharmora/texton_map_1.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Alohamora/texton_map_2.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Alohamora/texton_map_3.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Texton maps for 3 different images

<h3>Brightness Map</h3>
The concept of the brightness map is as simple as capturing the brightness changes in the image. Again the brightness values are clustered using kmeans clustering into 16 clusters.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Aloharmora/brightness_map_1.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Aloharmora/brightness_map_2.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Alohamora/brightness_map_3.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Brightness maps for 3 different images
</div>

<h3>Color Map</h3>
The concept of the color map is to capture the color changes or chrominance content in the image. Again the color values are clustered using kmeans clustering into 16 clusters.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Aloharmora/color_map_1.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Aloharmora/color_map_2.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Alohamora/color_map_3.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Color maps for 3 different images
</div>

<h3>Texton, Brightness and Color gradients</h3>
To obtain these gradients, we need to compute differences of values across different shapes and sizes. This can be achieved very efficiently by the use of Half-disc masks. The half-disc masks are simply pairs of binary images of half-discs. This is very important because it will allow us to compute the (chi-square) distances using a filtering operation, which is much faster than looping over each pixel neighborhood and aggregating counts for histograms.

These gradients encode how much the texture, brightness and color distributions are changing at a pixel and are computed by comparing the distributions in left/right half-disc pairs. If the distributions are the similar, the gradient is small and if the distributions are dissimilar, then the gradient is large. Because the half-discs span multiple scales and orientations, a series of local gradient measurements are obtained encoding how quickly the texture or brightness distributions are changing at different scales and angles.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Aloharmora/texton_grad_1.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Aloharmora/texton_grad_2.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Alohamora/texton_grad_3.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Aloharmora/brightness_grad_1.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Aloharmora/brightness_grad_2.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Alohamora/brightness_grad_3.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Aloharmora/color_grad_1.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Aloharmora/color_grad_2.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Alohamora/color_grad_3.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Texton, Brightness and Color gradients for 3 different images
</div>

<h3>Boundary Detection</h3>
The pb-lite boundary detection algorithm is finally applied to the images. To calculate the final filtering kernel from the earlier kernels, the Tg , Bg and Cg averaged to create a single kernel

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Aloharmora/sobel_1.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Aloharmora/sobel_2.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Alohamora/sobel_3.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Aloharmora/canny_1.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Aloharmora/canny_2.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Alohamora/canny_3.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Aloharmora/pb_lite_1.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Aloharmora/pb_lite_2.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Alohamora/pb_lite_3.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Sobel, Canny and Pb-lite output for 3 different images
</div>

