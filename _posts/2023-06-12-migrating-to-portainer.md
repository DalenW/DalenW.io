---
layout: post
title: Migrating Caprover to Portainer
published: true
---

Before I fully understood Docker Services and Swarm, I needed an easy way to host containers for personal and business use.
Caprover fit that solution perfectly.
I was able to spin up premade images / stacks, and manage them with basic functionality.
But these days I need finer control, and that's where Portainer comes in.
Portainer is perfect if all you need is a UI to upload Docker Compose files and spin up services there.
It also offeres easy configuration and management of other Docker features such as Networks, Volumes, and Nodes. 

Caprover runs off of docker containers, just like Portainer.
So to migrate to Portainer, I just had to install Portainer, shut down the Caprover containers, and "take over" the containers. 
Taking over the containers consists of rebuilding the images in a docker compose file, and using the same volumes as before for data persistence.

The overall steps look like this:

1. Configure your firewall to allow Portainer. 
2. Install and run the Portainer docker image.
3. Access Portainer over your web browser and complete the initial configuration steps. 
4. Create your Traefik stack to replace Caprover's NGinx Proxy. Stop the stack immedietly as Caprover's is still running and it won't be able to bind to the ports. 
5. Rebuild your services in Docker Compose.
6. Copy the data from your old Caprover volumes to your new volumes. (More on this later)
7. Shutdown the Caprover services
8. Start your new stacks. (including Traefik)


Migrating the volumes is probably the trickiest step.
Caprover doesn't follow the normal Docker naming scheme of `<STACK NAME>_<VOLUME NAME>`. 
Instead it's something like `captain--<CONTAINER NAME>--<VOLUME NAME>`.

I was hesitant to rename the volumes as it may mess with other Docker processes, so here's what I did. 
I created the new Volume, and copied the data from the captain volume to the new one.
Make sure to use `rsync` to preserve permission and group data for each file.
Overall command looked something like this:
`rsync -raz _data <NEW VOLUME>`
`_data` will be copied under the new volume. 

All in all that should be it. 