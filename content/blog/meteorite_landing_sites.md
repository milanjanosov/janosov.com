---
title: Meteorite Landing Sites
date: 2023-11-1T00:00:00
coverImg: meteorite_landing_sites.png
---
The long-awaited #30DayMapChallenge has started, mappy November, folks! And here comes my first map, focusing on point data. Specifically, I used NASA's Open Data Portal's Meteorite Landing data. This dataset contains about 40k observations, which, when placed on a map, show a remarkable correlation with population densities. So either meteorites target inhabited lands, or we have more data on meteorites where there are more people to find them, right?

On the viz, I sized each dot marker, corresponding to one meteorite, based on its recorded mass in grams, which ranges from 0.01 g to 60,000 kg or 60 tons. By the way, this 60-ton giant Hoba and was found in 1920 in Grootfonteinn, Namibia. Then, I coloured each marker based on the time of its discovery. Fun fact: the first recorded meteorite, Nōgata (472g), was found in Fukuoka Prefecture, Japan, in 861, shortly after the impact. After this observation, there is nothing in the data for centuries in the database. Then, finally, Elbogen came in 1399 (107000.0), and then, Rivolta de Bassi (103.3g) in 1490 and Ensisheim (127000.0g) in 1491. Looking at later periods in the data set, it turns out that 35% of the meteorites were recorded after 2000 and 98% after 1899.

Additionally, I used Python and Folium to create the interactive version of this map as a html file -- which you will find in the attached notebook.

Interactive version: https://www.janosov.com/DAY1.html

𝐃𝐚𝐭𝐚 𝐬𝐨𝐮𝐫𝐜𝐞: https://data.nasa.gov/Space-Science/Meteorite-Landings/gh4g-9sfh

Data access: 2023 February 21


<!--more-->

further stuff
