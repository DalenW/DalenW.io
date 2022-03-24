---
layout: post
title: Image Manipulation with Rails
published: false
---

# Image Manipulation with Rails

For one of my clients I was tasked with generating ID cards in a web app that runs on Ruby on Rails. Initially I wasn't sure how I was going to tackle this.
Rails isn't well known for image manipulation. However, there is a little bit of image manipution built into rails, with Active Storage varients. From what the Rails docs say, varients use RMagick on the backend, and RMagick is simply a wrapper for ImageMagick, a popular package for processing and manipulating images. The Rails docs indicated that `vips`, a lighter and faster image processor, will become default soon. But for this example I will use RMagick. 

I wanted to write this post because while the documentation for RMagick is very comprehensive, there's very little in the way of examples. 
So hopefully this will help someone else with a similar application. 
This will cover two things. Adding text to existing images, and adding an image on top of another image. Essentially using an ID card template and adding the user's name, downloading a cropped and compressed profile picture from active storage, adding said picture to the ID card template, and uploading the new image back to active storage. 

This code can be ran in both a controller and job. If possible I would recommend putting this in a job, since it can take a while on slower hardware, but it really depends on the control flow of your app. In my case, I needed to display the manipulated image to the user and they needed to immedietly download it, so I stuck it in a controller, and pretty much just told the user that they will have to wait a second or two for the image to be processed.

### Loading your image

First thing we need is an object that represents out base image that we can manipulate with RMagick. That object will be an `ImageList` object. Here's what that code looks like:

```ruby
new_card = ImageList.new(PATH_TO_IMAGE) do
	self.format = 'jpeg'
end
```

An `ImageList` is actually an array of images. If you're just working with one image and adding text to it, you can use the regular image object. But this tutorial is using an ID card as an example, so we'll be working with multiple images. If you're not sure, just leave it as `ImageList`

The format can be whatever you want, but I'd recommend something common like `jpeg`. After we've manipulated our image, it will be saved in this format. For compatibility reasons, I would also make sure your template image matches this format. When I started writing this code I used `.tif` templates because I figured "Hey higher quality is better and it's getting processed anyways". RMagick does not handle tif images well, so I converted them to jpegs. 

### Adding Text to Images

With RMagick, adding text is pretty straight forward. Take a look at this code below.

```ruby
Draw.new.annotate(new_card, text_box_width, text_box_height, text_left_x, y, text) do
  self.gravity = Magick::CenterGravity
  self.font = font_path
  self.fill = text_color
  self.pointsize = text_size
end
```

Let me explain what each variable represents.

`new_card` is the the `ImageList` object, holding our template image.

`text_box_width` and `text_box_height`. These are two integer values that represent the box you want your text to go in. When you set the `gravity` of the text, aka how it will align, it will use these values to determine that. So if you have a width of 200, and you center the text, it will center 100 pixels off of the left most pixel. 

`text_left_x` is the left most pixel of your text box. `y` is the y value. And `text` is a string representing the text you want to write to the image. 

RMagick does not automatically wrap text if it exceeds the `text_box_width`. Instead it'll just overlap. So if you expect to wrap text, you'll need to write your own function to do so. In my code I wrote functions to both wrap and shrink text. So the code above was wrapped in a for each function that looks like this.

```ruby
lines.each do |text, y, text_size|
	# shadow is drawn first so it's on the bottom
	Draw.new.annotate(new_card, text_box_width, text_box_height, text_left_x + shadow_size, y + shadow_size, text) do
	  self.gravity = Magick::CenterGravity
	  self.font = font_path
	  self.fill = shadow_color
	  self.pointsize = text_size
	end

	Draw.new.annotate(new_card, text_box_width, text_box_height, text_left_x, y, text) do
	  self.gravity = Magick::CenterGravity
	  self.font = font_path
	  self.fill = text_color
	  self.pointsize = text_size
	end
end
```

Lines is an array of arrays. Each sub array contains 3 values. `text`, `y`, and `text_size`. This code also includes text shadowing. I simply right the shadow text first, offsetted by a preset integer value (I used `1`), then I wrote proper text on top of that text. So in my case the shadow was just text written in black, and then text written in white on top of that.

The `Draw` object has a lot of options. The 4 main ones are the ones I used. If you need other options check out the documentation [here](https://rmagick.github.io/draw.html). 

`self.gravity` needs to be a [Magick Gravity Constant](https://rmagick.github.io/draw.html#gravity_eq). 

`self.font` needs to be a string represeting a path to the font file. So I used something like this. `Rails.root.join('FOLDER', 'FILE.ttf').to_s`




