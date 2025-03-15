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
        {% include figure.liquid loading="eager" path="assets/img/Alohamora/Overwiew.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Pb-lite boundary detection overview
</div>

<h3 style="text-align: center;">Filter Banks</h3>
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
        {% include figure.liquid loading="eager" path="assets/img/Alohamora/DoG.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Alohamora/LMS.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Alohamora/Gabor.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Alohamora/LML.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Filter Banks for boundary detection of images
</div>

<h3 style="text-align: center;">Texton Map</h3>
Filtering an input image with each element of the filter bank results in a vector of filter responses centered on each pixel. If the filter bank has N filters, then there are N filter responses at each pixel. A distribution of these N-dimensional filter responses could be thought of as encoding texture properties. This representation is simpyfied by replacing each N-dimensional vector with a discrete texton ID. This is done by clustering the filter responses at all pixels in the image in to K textons using kmeans clustering. Each pixel is then represented by a one-dimensional, discrete cluster ID instead of a vector of high-dimensional, real-valued filter responses known as “Vector Quantization”. This can be represented with a single channel image with values in the range of [1,2,3,...,K] where K=64.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Alohamora/texton_map_1.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
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

<h3 style="text-align: center;">Brightness Map</h3>
The concept of the brightness map is as simple as capturing the brightness changes in the image. Again the brightness values are clustered using kmeans clustering into 16 clusters.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Alohamora/brightness_map_1.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Alohamora/brightness_map_2.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Alohamora/brightness_map_3.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Brightness maps for 3 different images
</div>

<h3 style="text-align: center;">Color Map</h3>
The concept of the color map is to capture the color changes or chrominance content in the image. Again the color values are clustered using kmeans clustering into 16 clusters.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Alohamora/color_map_1.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Alohamora/color_map_2.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Alohamora/color_map_3.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Color maps for 3 different images
</div>

<h3 style="text-align: center;">Texton, Brightness and Color gradients</h3>
To obtain these gradients, we need to compute differences of values across different shapes and sizes. This can be achieved very efficiently by the use of Half-disc masks. The half-disc masks are simply pairs of binary images of half-discs. This is very important because it will allow us to compute the (chi-square) distances using a filtering operation, which is much faster than looping over each pixel neighborhood and aggregating counts for histograms.

These gradients encode how much the texture, brightness and color distributions are changing at a pixel and are computed by comparing the distributions in left/right half-disc pairs. If the distributions are the similar, the gradient is small and if the distributions are dissimilar, then the gradient is large. Because the half-discs span multiple scales and orientations, a series of local gradient measurements are obtained encoding how quickly the texture or brightness distributions are changing at different scales and angles.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Alohamora/texton_grad_1.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Alohamora/texton_grad_2.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Alohamora/texton_grad_3.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Alohamora/brightness_grad_1.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Alohamora/brightness_grad_2.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Alohamora/brightness_grad_3.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Alohamora/color_grad_1.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Alohamora/color_grad_2.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Alohamora/color_grad_3.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Texton, Brightness and Color gradients for 3 different images
</div>

<h3 style="text-align: center;">Boundary Detection</h3>
The pb-lite boundary detection algorithm is finally applied to the images. To calculate the final filtering kernel from the earlier kernels, the Tg , Bg and Cg averaged to create a single kernel

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Alohamora/sobel_1.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Alohamora/sobel_2.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Alohamora/sobel_3.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Alohamora/canny_1.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Alohamora/canny_2.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Alohamora/canny_3.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Alohamora/pb_lite_1.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Alohamora/pb_lite_2.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Alohamora/pb_lite_3.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Sobel, Canny and Pb-lite output for 3 different images
</div>

<hr> 

<h1>Phase 2</h1>
In this phase multiple neural network architectures are implemented and compared on various criterion like number of model parameters, train and test set accuracies.

<h2>Process Overivew</h2>
The primary objective is image classification using Neural networks. The model is trained on the CIFAR-10 dataset. There are a total of 60000 images in the dataset which are split into 50000 train images and 10000 test images. There are 10 classes in the dataset and the output of the model is a probability of the 10 classes while the input to the model being a single image. The training is performed using the PyTorch library.

<h3 style="text-align: center;">Data Preprocessing</h3>
The the training part:
<ul>
    <l1>The images are normalized between 0 and 1</li>
    <li>flipped horizontally</li> 
    <li>rotated by a maximum of 30 degrees</li> 
    <li>randomly affined</li>
    <li>jittered on color</li>
</ul>
For the testing part the images are just normalized before being fed into the model.

<h3 style="text-align: center;">Base Model</h3>
The Base Model is a basic convolutional network.
Hyperparameters: 
The hyperparameters used to train the Base Model as are follows:
<ul>
    <li>Learing rate: 0.01</li>
    <li>Batch size: 32 — 64 — 256 — 512</li>

</ul>
The model has 5 hidden which includes two convolutional layers and three fully connected layers.
MaxPool layers are used after each convolutional layer which reduces the image size to half.

The model achieves a training accuracy of 53%.

The model and results are shown below

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Alohamora/BaseModel.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Base Model
</div>

<div class="row justify-content-sm-center">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Alohamora/Base_accuracy_vs_epochs.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Alohamora/Base_loss_vs_epochs.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Accuracy and loss curves along epochs
</div>

<div class="row justify-content-sm-center">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Alohamora/Base_checkpoint_train.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Alohamora/Base_checkpoint_test.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Train and Test Confusion Matrices
</div>

<h3 style="text-align: center;">Normalized Model</h3>
The Base Model is modified to include a batch normalization layer in between each convolutional layer.
Hyperparameters: 
The hyperparameters used to train the Base Model as are follows:
<ul>
    <li>Learing rate: 0.01</li>
    <li>Batch size: 64 — 256 — 512</li>
    <li>Number of epochs: 20 — 50 — 75</li>
    <li>Optimizer: SGD</li>
    <li>Activation: ReLU</li>
    <li>Loss Function: Cross Entropy</li>
</ul>
The model has 6 hidden which includes three convolutional layers and three fully connected layers.
The train accuracy improved from the Base Model to 66%.
The model and results are shown below

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Alohamora/NormModel.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Normalized Model
</div>

<div class="row justify-content-sm-center">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Alohamora/Norm_accuracy_vs_epochs.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Alohamora/Norm_loss_vs_epochs.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Accuracy and loss curves along epochs
</div>

<div class="row justify-content-sm-center">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Alohamora/Norm_checkpoint_train.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Alohamora/Norm_checkpoint_test.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Train and Test Confusion Matrices
</div>

<h3 style="text-align: center;">ResNet Model</h3>
By adding shortcut connections to the Base Model a Residual Network or ResNet can be constructed. Deep networks often show behaviour of degradation in training accuracy due
to saturation. Residual networks overcome this degradation by using shortcut connections.
Hyperparameters: 
The hyperparameters used to train the Base Model as are follows:
<ul>
    <li>Learing rate: 0.01</li>
    <li>Batch size: 64 — 256 — 512</li>
    <li>Number of epochs: 20 — 50 — 75</li>
    <li>Optimizer: SGD</li>
    <li>Activation: ReLU</li>
    <li>Loss Function: Cross Entropy</li>
</ul>
The model has 9 hidden layers which includes seven convolutional layers and two fully connected layers.
The train accuracy improved from the Base Model to 76%.
The model and results are shown below

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Alohamora/ResnetModel.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    ResNet Model
</div>

<div class="row justify-content-sm-center">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Alohamora/Resnet_accuracy_vs_epochs.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Alohamora/Resnet_loss_vs_epochs.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Accuracy and loss curves along epochs
</div>

<div class="row justify-content-sm-center">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Alohamora/Resnet_checkpoint_train.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Alohamora/Resnet_checkpoint_test.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Train and Test Confusion Matrices
</div>

<h3 style="text-align: center;">ResNeXt Model</h3>
The ResNeXt models are highly modularized models which are constructed by repeating a building block that aggregates a set of transformations with the same topology. This results inn a simple, multibranch architecture requiring only a few parameters to be set. ResNeXt present a new dimension called as cardinality which is essentially nothing but the size of the set of transformations as an additional dimension to the existing dimensions of depth
and width. 
Hyperparameters: 
The hyperparameters used to train the Base Model as are follows:
<ul>
    <li>Cardinality: 32</li>
    <li>Learing rate: 0.01</li>
    <li>Batch size: 64 — 256 — 512</li>
    <li>Number of epochs: 20 — 50 — 75</li>
    <li>Optimizer: SGD</li>
    <li>Activation: ReLU</li>
    <li>Loss Function: Cross Entropy</li>
</ul>
In the ResNeXt model, each shortcut block has three convolution layers in between. There are a total of 12 shorcut blocks, having a total of 36 convolutional layers in them. Additionally there is fully connected hidden layer having a length of 2048 nodes.
The train accuracy improved from the Base Model to 64%.
The model and results are shown below

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Alohamora/ResnextModel.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    ResNeXt Model
</div>

<div class="row justify-content-sm-center">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Alohamora/Resnext_accuracy_vs_epochs.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Alohamora/Resnext_loss_vs_epochs.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Accuracy and loss curves along epochs
</div>

<div class="row justify-content-sm-center">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Alohamora/Resnext_checkpoint_train.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Alohamora/Resnext_checkpoint_test.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Train and Test Confusion Matrices
</div>


<h3 style="text-align: center;">DenseNet Model</h3>
From ResNet it is safe to say that convolutional networks can be substantially deeper, more accurate and efficient to train if they have shortcut connections. While Base Model having L layers, has L connections, the Dense Convolutional Network has L(L+1)/2 connections in its network. For each layer, the feature maps from all the preceding layers are used as inputs, and its own feature maps are used as inputs in all subsequent layers. DenseNet models alleviate the vanishing gradient problem due to the shortcut connections.

Hyperparameters: 
The hyperparameters used to train the Base Model as are follows:
<ul>
    <li>Growth rate: 16</li>
    <li>Learing rate: 0.01</li>
    <li>Batch size: 64 — 256 — 512</li>
    <li>Number of epochs: 20 — 50 — 75</li>
    <li>Optimizer: SGD</li>
    <li>Activation: ReLU</li>
    <li>Loss Function: Cross Entropy</li>
</ul>
The DenseNet consists of DenseLayers which are the building blocks of the Dense Blocks. The model consists of these Dense blocks and the Transition layers between each of these blocks.
The train accuracy improved from the Base Model to 79%.
The model and results are shown below

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Alohamora/DenseBlock.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    DenseNet Model
</div>

<div class="row justify-content-sm-center">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Alohamora/Densenet_accuracy_vs_epochs.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Alohamora/Densenet_loss_vs_epochs.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Accuracy and loss curves along epochs
</div>

<div class="row justify-content-sm-center">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Alohamora/Densenet_checkpoint_train.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Alohamora/Densenet_checkpoint_test.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Train and Test Confusion Matrices
</div>

<h3 style="text-align: center;">Model Comparisons</h3>
<table border="1" cellpadding="10" cellspacing="0" style="width: 100%; text-align: center;">
    <caption>Metrics after training for 20 Epochs</caption>
    <thead>
        <tr>
            <th>Model</th>
            <th>Accuracy Loss</th>
            <th>Loss</th>
            <th># of Params</th>
            <th>Inference Time (sec)</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Base</td>
            <td></td>
            <td></td>
            <td>10</td>
            <td>0.004</td>
        </tr>
        <tr>
            <td>Train</td>
            <td>0.55</td>
            <td>1.2</td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td>Test</td>
            <td>0.49</td>
            <td>1.4</td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td>Normalized</td>
            <td></td>
            <td></td>
            <td>37</td>
            <td>0.006</td>
        </tr>
        <tr>
            <td>Train</td>
            <td>0.75</td>
            <td>0.75</td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td>Test</td>
            <td>0.68</td>
            <td>0.9</td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td>ResNet</td>
            <td></td>
            <td></td>
            <td>74</td>
            <td>0.012</td>
        </tr>
        <tr>
            <td>Train</td>
            <td>0.8</td>
            <td>0.6</td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td>Test</td>
            <td>0.76</td>
            <td>0.62</td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td>ResNeXt</td>
            <td></td>
            <td></td>
            <td>289</td>
            <td>0.026</td>
        </tr>
        <tr>
            <td>Train</td>
            <td>0.65</td>
            <td>1.0</td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td>Test</td>
            <td>0.65</td>
            <td>1.07</td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td>DenseNet</td>
            <td></td>
            <td></td>
            <td>655</td>
            <td>0.053</td>
        </tr>
        <tr>
            <td>Train</td>
            <td>0.8</td>
            <td>0.59</td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td>Test</td>
            <td>0.79</td>
            <td>0.61</td>
            <td></td>
            <td></td>
        </tr>

    </tbody>
</table>
