import * as React from 'react';
import { useState, useEffect} from 'react';
import ReactMapGL,{Marker,Popup} from 'react-map-gl';
import listOfLogEntries from './Api';

function App() {
	const [showPopup, setShowPopup] = useState({});
	const [addLogEntry, setAddLogEntry]= useState(null)
	const[logEntries, setLogEntries]= useState([]);
	const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 4
	});
	useEffect(() => {
		(async()=>{
		const logEntries = await	listOfLogEntries();
	  setLogEntries(logEntries)
		})()

	}, []);
const showAddMarkerPopUp = (event) =>{
	const [longitude, latitude] = event.lngLat;
	setAddLogEntry({
		longitude,
		latitude
	})

}

  return (
		<ReactMapGL
		mapStyle="mapbox://styles/yagnesh88/ckhf425nu04y81ar7nkn72ndm"
		mapboxApiAccessToken={process.env.REACT_APP_MPBOX_TOKEN}
		{...viewport}
		onViewportChange={nextViewport => setViewport(nextViewport)
		}
onDblClick={showAddMarkerPopUp}
	> 
	{logEntries.map(log =>{
	return(
    <>	
	 			<Marker key={log._id} latitude={log.longitude} longitude={log.latitude} offsetLeft={0} offsetTop={-28} >
		 
					<div onClick={()=> setShowPopup({
				
					[log._id]:true
				})}>
		<svg 
		style={{
		
			stroke:"#fc4e4e"
	
		}}
		viewBox="0 0 24 24" 
		width="28" height="28" 
		stroke="currentColor" 
		stroke-width="2" 
	
		fill="#fcf14e"
		stroke-linecap="round" 
		stroke-linejoin="round" >
			<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
			<circle cx="12" cy="10" r="3"></circle>
		</svg>
		</div>
	</Marker>
	{showPopup[log._id] ?( <Popup
		latitude={log.longitude}
		longitude={log.latitude}
		closeButton={true}
		closeOnClick={false}
		dynamicPosition={true}
		onClose={() => setShowPopup(false)}
		anchor="right" >
		<div className="popup">
			<h3>{log.title}</h3>
			<h6>{log.comments}</h6>
		</div>
	</Popup>):null } </>)
	})} 
	{
		addLogEntry ? (
			<>
			<Marker key={addLogEntry._id} latitude={addLogEntry.latitude} longitude={addLogEntry.longitude} offsetLeft={0} offsetTop={-28} >
		 
		 <div onClick={()=> setShowPopup({
		 
			 [addLogEntry._id]:true
		 })}>
 <svg 
 style={{
 
	 stroke:"#5af542"

 }}
 viewBox="0 0 24 24" 
 width="28" height="28" 
 stroke="currentColor" 
 stroke-width="2" 

 fill="#f5424b"
 stroke-linecap="round" 
 stroke-linejoin="round" >
	 <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
	 <circle cx="12" cy="10" r="3"></circle>
 </svg>
 </div>
</Marker>
				<Popup
		latitude={addLogEntry.longitude}
		longitude={addLogEntry.latitude}
		closeButton={true}
		closeOnClick={false}
		dynamicPosition={true}
		onClose={() => setAddLogEntry(null)}
		anchor="right" >
		<div className="popup">
			<h3>Add your entry log here</h3>
		</div>
	</Popup>
			</>
		):null
	}
	
	</ReactMapGL>
  );
}

export default App;
