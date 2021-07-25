

const fs = require('fs');
const http = require('http');

var requests = require('requests');
const url = require('url');
let weather_status="cloud"
const homeFile=fs.readFileSync("home.html","utf-8");
  const replaceVal=(tempvalue,org)=>{
       let temperature=tempvalue.replace("{%temp%}",Math.floor(org.main.temp-(273)));
        temperature=temperature.replace("{%min_temp%}",Math.floor(org.main.temp_min-273));
        temperature=temperature.replace("{%max_temp%}",Math.floor(org.main.temp_max-273));
        temperature=temperature.replace("{%city%}",org.name);
        temperature=temperature.replace("{%country%}",org.sys.country);
        temperature=temperature.replace("{%weather_status%}",org.weather[0].main);
        return temperature;
  }
  let city_name="jabalpur";
 
const server=http.createServer((req,res)=>{
  if(req.url=='/'){
    city_name= "jabalpur";
    
   
  } 

  else if(req.url=="/favicon.ico"){
    console.log("fafu kamina pareshan kar diya");
  }
  else{
    city_name=req.url.replace("/","");

  }
  requests(`https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=11cbb19ccbb3cf74cb8e2e0619d865f3`)
    .on('data', function (chunk) {
      const objData=JSON.parse(chunk);
      const arrayData=[objData];
    
      
      const realTimeData =arrayData.map((value)=> replaceVal(homeFile,value)).join("");
      res.write(realTimeData);
     
      
     

    })

    .on('end', function (err) {
      if (err) return console.log('connection closed due to errors', err);
     
      res.end();
    });
  
})

server.listen(8000,()=>{
  console.log("listening");
})




