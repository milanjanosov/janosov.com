---
title: Overviewing the Global Chocolate Trade
date: 2023-11-17T00:00:00
coverImg: overviewing_the_global_chocolate_trade.png
---
In this article, I explore the UN Comtrade international trade database by focusing on the “Chocolate and other food preparations containing cocoa” trade category.

<!--more-->


When I was trying to figure this map out, I was stuck for a bit - and then I was like, okay, let's get some calories in and get it going. tl;dr I decided to visualise the export flow network of chocolate (HS 1806) between the largest exporting countries using international trade data from Comtrade. This dataset contains information on which country exported to which, in what quantity, and in what value.

I used this information to create a non-geographical but topological map, a network visualisation. In this network, each country is a node, while country A is linked to country B if A exports chocolate products to country B, where the link is proportional to the total value of the traded goods in 2022. Node colours correspond to network communities - clusters of countries that seem to trade much more internally than the rest of the world, while node size measures the total value each country makes by exporting such sweets. Countries not exporting are marked by dark grey.

Read more: https://towardsdatascience.com/overviewing-the-global-chocolate-trade-6478adeb8ead


