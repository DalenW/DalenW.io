---
layout: post
title: Host a Static Website on Firebase
---

# Host a Static Website on Firebase

If you've ever needed to host a static website for free, Firebase is a good start. 
It's simple to use, and everything on it is behind a CDN, so you're getting excellent load times pretty much anywhere in the world. This guide will be broken up into several large steps, with a few sub-steps. If you have any questions, feel free to email me.

### 1. Setup your domain

Every website needs a domain. I'd recommend setting up every domain you have on [Cloudflare](https://www.cloudflare.com). It's free, it caches your content around the world similar to what firebase does, and it offers a lot of security features. 

Connecting a domain to Cloudflare is pretty straight forward, and not the focus of this guide. If you want a step-by-step guide for that, Cloudflare has an official guide [here](https://support.cloudflare.com/hc/en-us/articles/201720164-Creating-a-Cloudflare-account-and-adding-a-website). Once it's connected, we'll need to setup the Firebase project.

### 2. Setup Firebase Project

Navigate to [Firebase's website](https://firebase.google.com), login with your google account, and click on ["Go to Console"](https://console.firebase.google.com/). From here you'll click on "+ Add Project". Then there are 3 steps to create a new project.

1. **Project Name:** This can be anything. I'd suggest keeping it short and to the point.
2. **Google Analytics:** I'd recommend turning this off, or keep it on. It doesn't really make a difference. Cloudflare does have their own analytics if you're interested in something a little more privacy focused. 
3. **Google Analytics Optional:** If you enabled Google Analytics in the previous step, here you'll select an analytics account. 

Now that the Firebase project is created, we need some code for it. 

### 3. Create a git repo

With your preffered git provider (I recommend GitHub for later firebase integration), we need to create a repo for your website. If you already have one, you can skip this step. So create a git repo, and if during the setup you're offered to commit a readme and license to your new repo, do that. 

Then clone your repo onto your computer. At this point, there's only one branch in your repo and it's probably called "main" or "master". Using your preffered git client, create a new branch from that commit and call it something like "release". We'll have at least 2 branches with this project. A master branch for development, and a release branch. The release branch will be what will be synced with your live website. With a GitHub repo, Firebase can auto-deploy your release branch as soon as it is committed to. 

### 4. Setup Firebase in Project

### 5. Configuring Firebase




