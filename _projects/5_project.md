---
layout: page
title: Auto Pano
description: Panorama Stitching usinig Classical and Deep Learning methods
img: assets/img/AutoPano/card_img.png
importance: 1
category: work
---

<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.min.js"></script>

<div id="pdf-container"></div>

<script>
  const url = 'assets/pdf/AutoPano_Report.pdf'; // Path to your PDF file
  
  // Asynchronously download PDF
  pdfjsLib.getDocument(url).promise.then(function(pdfDoc_) {
    pdfDoc = pdfDoc_;
    const numPages = pdfDoc.numPages;
    
    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      pdfDoc.getPage(pageNum).then(function(page) {
        const scale = 1.5;
        const viewport = page.getViewport({ scale: scale });

        // Create a canvas to render the page content
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        // Append the canvas to the PDF container
        document.getElementById('pdf-container').appendChild(canvas);

        // Render the page
        const renderContext = {
          canvasContext: ctx,
          viewport: viewport
        };
        page.render(renderContext);
      });
    }
  });
</script>
