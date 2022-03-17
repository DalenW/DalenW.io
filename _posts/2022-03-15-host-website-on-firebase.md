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

1. **Project Name:** This can be anything. I'd suggest keeping it short and to the point. ![[firebase-new-step-1.png]]
2. **Google Analytics:** I'd recommend turning this off, or keep it on. It doesn't really make a difference. Cloudflare does have their own analytics if you're interested in something a little more privacy focused. ![[firebase-new-step-2.png]]
3. **Google Analytics Optional:** If you enabled Google Analytics in the previous step, here you'll select an analytics account. 

Now that the Firebase project is created, we need some code for it. 

### 3. Create a git repo

With your preffered git provider (I recommend GitHub for later firebase integration), we need to create a repo for your website. If you already have one, you can skip this step. So create a git repo, and if during the setup you're offered to commit a readme and license to your new repo, do that. 

![[github-new.png]]

Then clone your repo onto your computer. At this point, there's only one branch in your repo and it's probably called "main" or "master". Using your preffered git client, create a new branch from that commit and call it something like "release". We'll have at least 2 branches with this project. A master branch for development, and a release branch. The release branch will be what will be synced with your live website. With a GitHub repo, Firebase can auto-deploy your release branch as soon as it is committed to. 

![[git-branches.png]]

### 4. Setup Firebase in Project

In your terminal, you'll want to navigate to your git repo. If this is the first time using Firebase, which if you're reading this it probably is, you'll want to install the [Firebase CLI tools](https://firebase.google.com/docs/cli#windows-npm). With Node installed on your machine, you simply need to run `npm install -g firebase-tools` to install the Firebase CLI. And if you haven't already, run `firebase login` to login to your Firebase account. 

After that, it's time to initalize our Firebase project. Simply run `firebase init` and follow the on screen instructions.
![[firebase-init.png]]
We'll want to select hosting. Firebase has a lot of options, that you can enable later to add functionality to your website beyond serving static code. But for that purpose, we're going to select the first "Hosting" option.

Then we're going to select "Use an existing project". ![[firebase-use-existing-project.png]]

And then we simply choose our already created Firebase project in the list. ![[firebase-select-project.png]]

Now we're going to setup the hosting aspect of our project.
![[firebase-hosting-setup.png]]
We'll want to keep `public` as our public directory, because that makes sense. But we're going to say no to the single page app. I'll explain this later, but if you want your website to have multiple pages, say no to this. And we're going to want to enable automtic builds and deploys with GitHub. Saying yes to that option will automatically connect Firebase to your GitHub account in a similar way Firebase logged you into their CLI.

![[firebase-github.png]]
First it'll ask us for the repository. The format for this is `GITHUB_USERNAME/REPO_NAME`. As you can see for me it was `dalenw/test-firebase`. We'll want to say "No" to the build script. If you were using a framework like Jekyll or Vue to generate static content, you could auto-build with the command you put in. But this guide isn't about that; this is to serve raw HTML. 

Next we'll want to setup auto-deployment. So give the "Yes" option like I did and type in the name of your release branch that we created earlier. What this means is that everytime the `release` branch is updated, usually through a pull request, it will tell Firebase to download the `release` branch and host it. So with this you can edit your `master` branch as much as you want, and Firebase won't host your changes until it's in the `release` branch. 

At this point we have some new files in our project. As of this post, my file structure looks like this. You'll probably want to commit what you have right now to git.
![[files-1.png]]

If you run `firebase serve` in your terminal, it will host your website with the default files. And if you navigate to [http://localhost:5000](http://localhost:5000), you should see what the default files look like!


### 5. Connecting Firebase to your domain



