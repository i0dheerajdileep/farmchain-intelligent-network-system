import React,{useState,useEffect} from 'react'
import { CircularProgressbar,CircularProgressbarWithChildren,buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { CheckCircleIcon } from '@heroicons/react/20/solid'
import RadialSeparators from "./RadialSeparators";

function Report() {
    const percentage = 66;
    let [data, setData] = useState({
        current: {
            temp: 292.55,
            humidity: 89,
            wind_speed: 0,
            uvi: 0,
            weather: [{
                description: '',
                icon: ''
            }]
        },
        minutely:[
            {
               "dt":1684929540,
               "precipitation":0
            },]
    });
    let tempPercentage = data.current.temp - 273.15; 
    let isRaining = data.minutely[0].precipitation > 0;

    useEffect(() => {
      const fetchWeatherData = async () => {
        try {
          const lat = '10.014550';
          const long = '76.293159'
          const response = await fetch(
            `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&exclude={part}&appid=f5d11e2b2f1043ba4758a4051b07bb6e`
          );
  
          if (response.ok) {
            const data = await response.json();
            // Assuming the temperature is available in the main.temp property
            console.log(data,"dataaaaaa")
            // setTemperature(data.main.temp);
            setData(data);
          } else {
            console.error('Failed to fetch weather data');
          }
        } catch (error) {
          console.error('Error fetching weather data:', error);
        }
      };
  
      fetchWeatherData();
    }, []);


  return (
    <div className='flex justify-center flex-col'>
        <div className='flex  items-center gap-10 bg-gray-200 p-10 w-full   shadow-lg     rounded-lg'>
            <div className='h-36 w-36  flex justify-center items-center shadow-xl p-12 rounded-2xl bg-blue-950'style={{ width: 300, height: 300 }}>
                <CircularProgressbar value={data.current.humidity} text={`Humidity ${data.current.humidity}%`} 
                styles={{
                    text: {
                    // Text color
                    fill: '#fff',
                    // Text size
                    fontSize: '10px',
                    },
                }}
                />;
            </div>
            <div className='h-36 w-36  flex justify-center items-center shadow-lg p-12 rounded-2xl bg-blue-950'style={{ width: 300, height: 300 }}>
             <CircularProgressbarWithChildren
                value={tempPercentage}
                strokeWidth={7}
                styles={buildStyles({
                strokeLinecap: "butt",
                })}
            >
                <div style={{ fontSize: 20, marginTop: -5 }} className='text-white text-center'>
                    <strong className=''>{data.current.temp}</strong><br/>K Temperature
                </div>
                <RadialSeparators
                count={12}
                style={{
                    background: "#fff",
                    width: "2px",
                    // This needs to be equal to props.strokeWidth
                    height: `${7}%`
                }}
                />
             </CircularProgressbarWithChildren>
            </div>
        </div>
        <div className='py-3 flex'>
                <div className="rounded-md bg-green-50 p-4 m-5  shadow-xl">
                <div className="flex">
                    <div className="flex-shrink-0">
                    <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">Raindrop sensor reading</h3>
                    <div className="mt-2 text-sm text-green-700">
                        {isRaining ? <p>Rain is detected</p> : <p>Rain is not detected</p>}
                    </div>
                    <div className="mt-4">
                        <div className="-mx-2 -my-1.5 flex">
                        <button
                            type="button"
                            className="rounded-md bg-green-50 px-2 py-1.5 text-sm font-medium text-green-800 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
                        >
                            View status
                        </button>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                <div className="rounded-md bg-green-50 p-4 m-5  shadow-xl">
                <div className="flex">
                    <div className="flex-shrink-0">
                    <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">Soil moisture sensor reading</h3>
                    <div className="mt-2 text-sm text-green-700">
                        <p>Sufficient</p>
                    </div>
                    <div className="mt-4">
                        <div className="-mx-2 -my-1.5 flex">
                        <button
                            type="button"
                            className="rounded-md bg-green-50 px-2 py-1.5 text-sm font-medium text-green-800 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
                        >
                            View status
                        </button>
                        </div>
                    </div>
                    </div>
                </div>
                </div>

        </div>
    </div>
  )
}

export default Report