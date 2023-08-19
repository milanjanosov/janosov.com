---
title: "Visualizing Urban Networks"
date: 2023-08-15T00:00:00
coverImg: visualize_urban_networks.png
---

Here I share an example code for my recent LinkedIn post series on visualizing urban networks using OSMnx and Matplotlib.



<!--more-->


Here is the code on how to do figures like this:

```python
# query the admin boundaries of the city
# as an example, use Milan Janosov's hometown
city = 'Siklós, Hungary'
admin = ox.geocode_to_gdf(city)

# download the road network and transform into gdf
G = ox.graph_from_polygon(admin.geometry.to_list()[0])
nodes, edges = ox.graph_to_gdfs(G)

# visualize with matplotlib
electric_blue = "#00FFFF"
color_bcg = '#000000'

f, ax = plt.subplots(1, 1, figsize=(12, 12))
edges.plot(ax=ax, color=electric_blue)
ax.set_facecolor(color_bcg)

# get rid of the ticks
for xlabel_i in ax.get_xticklabels(): xlabel_i.set_visible(False)
for ylabel_i in ax.get_yticklabels(): ylabel_i.set_visible(False)
for tick in ax.get_xticklines(): tick.set_visible(False)
for tick in ax.get_yticklines(): tick.set_visible(False)

# add the title
ymin, ymax = plt.ylim()
extension = 0.2 * (ymax - ymin)
ax.set_ylim(ymin, ymax + extension)
ax.set_title(city, fontsize=30, color=electric_blue, y=0.9)

```
