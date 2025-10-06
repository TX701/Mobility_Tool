mapboxgl.accessToken = "pk.eyJ1IjoicnN0dmRldiIsImEiOiJjbWc4OGhzcjgwNTNxMmtwdGhlMWR3eDN2In0.Arna-I1oQmDjHKX-tmUIyg";
let center = [-83.211269, 42.672954] // longitute, latitude
let bounds = [[-83.255980, 42.625370], [-83.151353, 42.704894]];

// large space that will be outside of our bounds, we use it so we can darken everything outside of oakland
let wholeWord = [[-83.23946,42.6927258],[-83.238945,42.6925996],[-83.2387733,2.6394312],[-83.1568909,42.6389258],[-83.1570625,42.6941144],[-83.23946,42.6927258]];
// oaklands coordinates
let oakland = [[-83.19413, 42.68034], [-83.19321, 42.66018], [-83.19926, 42.66002], [-83.20724, 42.65725], [-83.21027, 42.65613], [-83.21299, 42.65534], [-83.21388, 42.65505], [-83.2145, 42.65479], [-83.21503, 42.65453], [-83.21601, 42.65417], [-83.21693, 42.65391], [-83.2178, 42.65366], [-83.21843, 42.65347], [-83.21923, 42.65323], [-83.21976, 42.65311], [-83.21972, 42.65348], [-83.2194, 42.65417], [-83.21845, 42.65559], [-83.21793, 42.65638], [-83.21765, 42.65703], [-83.21741, 42.65776], [-83.21721, 42.65851], [-83.21711, 42.65937], [-83.21717, 42.66044], [-83.21723, 42.6609], [-83.21737, 42.66157], [-83.21759, 42.6621], [-83.21791, 42.6628], [-83.2182, 42.6633], [-83.21897, 42.66484], [-83.21923, 42.66533], [-83.21957, 42.66612], [-83.21978, 42.66668], [-83.21986, 42.66756], [-83.21998, 42.6686], [-83.22014, 42.67004], [-83.22027, 42.67176], [-83.22029, 42.67243], [-83.22088, 42.67889], [-83.21978, 42.67887], [-83.21752, 42.67881], [-83.21677, 42.67885], [-83.2153, 42.67886], [-83.21451, 42.67899], [-83.21328, 42.67926], [-83.21236, 42.67955], [-83.2114, 42.67985], [-83.21036, 42.68003], [-83.20935, 42.68003], [-83.20835, 42.68005], [-83.20641, 42.6801], [-83.20196, 42.68019], [-83.20196, 42.68019], [-83.1946, 42.68031]];

// above oaklands coordinates are clockwise which is used when using two different polygons the first (counter clockwise) is the space and the second (clockwise) is a whole within that space. if we want to outline oakland alone we need its coordinates counterclockwise as well
let counterClockWise = [[-83.1946, 42.68031], [-83.20196, 42.68019], [-83.20196, 42.68019], [-83.20641, 42.6801], [-83.20835, 42.68005], [-83.20935, 42.68003], [-83.21036, 42.68003], [-83.2114, 42.67985], [-83.21236, 42.67955], [-83.21328, 42.67926], [-83.21451, 42.67899], [-83.2153, 42.67886], [-83.21677, 42.67885], [-83.21752, 42.67881], [-83.21978, 42.67887], [-83.22088, 42.67889], [-83.22029, 42.67243], [-83.22027, 42.67176], [-83.22014, 42.67004], [-83.21998, 42.6686], [-83.21986, 42.66756], [-83.21978, 42.66668], [-83.21957, 42.66612], [-83.21923, 42.66533], [-83.21897, 42.66484], [-83.2182, 42.6633], [-83.21791, 42.6628], [-83.21759, 42.6621], [-83.21737, 42.66157], [-83.21723, 42.6609], [-83.21717, 42.66044], [-83.21711, 42.65937], [-83.21721, 42.65851], [-83.21741, 42.65776], [-83.21765, 42.65703], [-83.21793, 42.65638], [-83.21845, 42.65559], [-83.2194, 42.65417], [-83.21972, 42.65348], [-83.21976, 42.65311], [-83.21923, 42.65323], [-83.21843, 42.65347], [-83.2178, 42.65366], [-83.21693, 42.65391], [-83.21601, 42.65417], [-83.21503, 42.65453], [-83.2145, 42.65479], [-83.21388, 42.65505], [-83.21299, 42.65534], [-83.21027, 42.65613], [-83.20724, 42.65725], [-83.19926, 42.66002], [-83.19321, 42.66018], [-83.19413, 42.68034]]

let urlTest = "http://localhost:5678/webhook-test/829cc1f7-0682-42cc-975e-7024ea52e8ba"; // testing the workflow
let urlProduction = "http://localhost:5678/webhook/829cc1f7-0682-42cc-975e-7024ea52e8ba";

fetch(urlProduction)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    constructPinPoints(data);
  })
  .catch(error => {
    console.error('Error:', error);
});

let colorArray = ["#92F797", "#D2F792", "#EFF792", "#F7D292", "#F79292"];

const constructPinPoints = (data) => {
  data.forEach(element => {
    let text = `Title: ${element.Title}\nDifficulty: ${element.Difficulty}\nDescription: ${element.Description}`
    const popup = new mapboxgl.Popup({ offset: 25 }).setText(text);
    let marker = new mapboxgl.Marker().setLngLat([element.Longitude, element.Latitude]).setPopup(popup).addTo(map);
    let svg = marker._element.getElementsByTagName("svg")[0];
    let path = svg.getElementsByTagName("path")[0];
    path.setAttribute("fill", colorArray[element.Difficulty - 1]);
  });
}

const map = new mapboxgl.Map({
  container: "map",
  center: center, 
  style: "mapbox://styles/mapbox/standard",

  // maxBounds: [[-83.181724, 42.68476011], [-83.231481, 42.683692], [-83.231115, 42.649170], [-83.176593, 42.649992]],
  config: {
    basemap: {
      // lightPreset: "dusk",
    }
  },
  zoom: 16
});

map.on("load", () => {
    map.addSource("Oakland", {
        "type": "geojson",
        "data": {
            "type": "Feature",
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                  wholeWord, oakland
                ]
            }
        }
    });

    map.addLayer({
        "id": "Oakland-Polygon",
        "type": "fill",
        "source": "Oakland",
        "paint": {
          "fill-color": "rgba(0, 0, 0, 0.6)",
        }
    });
});