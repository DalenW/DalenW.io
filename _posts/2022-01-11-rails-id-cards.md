---
layout: post
title: Rails ID Card Generation
---

For one of my clients I was tasked with generating ID cards in a web app that runs on Ruby on Rails.
Initially I wasn't sure how I was going to tackle this.
Rails isn't well known for image manipulation. 
However, there is a little bit of image manipution built into rails, with Active Storage varients. 
From what the Rails docs say, varients use RMagick on the backend, and RMagick is simply a wrapper for ImageMagick, a popular package for processing and manipulating images.
The Rails docs indicated that `vips`, a lighter and faster image processor, will become default soon.
But for this example I will use RMagick. 

I wanted to write this post because while the documentation for RMagick is very comprehensive, there's very little in the way of examples. 
So hopefully this will help someone else with a similar application. 
This will cover two things. 
Adding text to existing images, and adding an image on top of another image.
Essentially using an ID card template and adding the user's name, downloading a cropped and compressed profile picture from active storage, adding said picture to the ID card template, and uploading the new image back to active storage.


