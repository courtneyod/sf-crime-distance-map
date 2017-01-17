#The Safeway

**About**

Built a graph representation of San Francisco street intersections and crime, then used A* to traverse the graph of street intersections in SF. The graph uses variable edge weights based on crime severity and the distance between each node. (Note: there is no frontend for this project)

**Data**
Process street intersection data and crime data to be in a graph format from SFOpenData:
 - [crime data](https://data.sfgov.org/Public-Safety/SFPD-Incidents-Current-Year-2016-/9v2m-8wqu). The crime data lists the crime type along with the intersection or block number it occurred on. Screen shot of ![data](https://github.com/courtneyod/sf-crime-distance-map/blob/master/images/crimedata.png)
 - [street intersection data](https://data.sfgov.org/Geographic-Locations-and-Boundaries/List-of-Streets-and-Intersections/pu5n-qu5c). The street data lists intersections and connecting intersection. Screen shot of ![data](https://github.com/courtneyod/sf-crime-distance-map/blob/master/images/street-intersection.png)

Implemented graph and translated street data into graph nodes and connecting intersections into graph edges.

**A Star**
Algorithm optimizes for the safest and fastest path between to points. Use euclidian distance (distance between two lat and long points) as the heuristic.

Used Google API's (Maps in particular) to translate the intersections into lat/long coordinates for the heuristic.

 **Example Output**
 If a user is looking for the safest way between `('CAPRA WAY,SCOTT ST') & ("FRANCISCO ST,BAKER ST");`, the algorithm will output the following directions:
 ![Directions](https://github.com/courtneyod/sf-crime-distance-map/blob/master/images/directions.png)
