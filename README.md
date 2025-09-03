**React Weather App (Open-Meteo API)**

A simple weather app built with ReactJS that lets users search for any city and view its current weather.
Powered by the Open-Meteo API (no API key required ).

**Features**

Search weather by city name    
Shows:   

1.Temperature    
2.Wind speed   
3.Weather condition icons (clear, cloudy, rain, snow, drizzle)    
4.Humidity  
5.Responsive card-style UI  

**Tech Stack**  

1.ReactJS   
2.Open-Meteo API  
3.CSS    

**How It Works**   

User enters a city → fetch latitude/longitude via Open-Meteo Geocoding API.  
Use coordinates to fetch current weather.   
Display temperature, humidity, windspeed, and weather condition (via weathercode → mapped to icons).    

**Run the App**   
1.Local   
npm install    
npm start  # or npm run dev (if using Vite)    

2.Online (CodeSandbox)     

*Import project into CodeSandbox    
*Copy files → app runs instantly     
*Share with public link     
  
**Future Scope**    

1.Add pressure, 7-day forecast    
2.Dark/Light theme toggle    
3.Deploy on Netlify/Vercel    

**Built with React + Open-Meteo API for learning and demonstration.**    
