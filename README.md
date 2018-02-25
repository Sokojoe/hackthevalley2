#MapDart🎯

##nspiration
After not being on vacation for quite some time, we suddenly felt a strong craving for travel. But where to? We weren’t just interested in the typical places like Punta Cana, Paris - we wanted to consider places all over the world.

##What it does
Have you ever felt uninspired about travelling? Don’t know where to go next? Have no fear!
MapDart is here to save you! Using our web app users can search the world for randomly selected locations to travel too! MapDart provides users with the name of the location, current weather, temperature and much more! If you want to travel to the location just click the travel here button.

##Try it out
https://sokojoe.github.io/hackthevalley2/

##How we built it
We built the webapp primarily using React for the front end and calling lots of API’s to get our data. How does it work? First we randomly generate a country name chosen from REST Countries API, then we get a landscape image from Flickr API. We then get the lat and lon from Flickr and use that to get weather, and link it up to the travel here button.

##Challenges we ran into
One of the handicaps we decided to do for this hackathon was to keep the site entirely static, which meant that we could only send requests to API’s that support CORS (Cross-Origin Resource Sharing). Another challenge we ran into was finding API’s that permit many requests, because the purpose of our site is too allow users to spam the search button. We also had difficulty with Javascript since we are all beginners however I am quite proud of how far we came this weekend.

##Accomplishments that we're proud of
This is our first React App, and one that we are calling a variety of APIs with. We were required to daisy chain many  JS promises - a new concept for us - in order to properly handle the info returned by the many API requests.

##What we learned
- Take a break/sleep when you have to!!
- React Framework
- Getting comfortable with more complex  JS concepts like promises.
- Working with CORS supported API calls.

##What's next for MapDart?
- Local food/wine/music
- In app google maps panel
- Link to closest hotels from expedia
- History of previous locations
- Description

##Built With
React
Bootstrap
Flickr API
Google API
Open weather api
REST Countries API
