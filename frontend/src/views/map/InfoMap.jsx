import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import "./InfoMap.css";
import MyLocationIcon from '@material-ui/icons/MyLocation';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withRouter } from "react-router-dom";
import { getAllPlace } from "../../_actions/mapAction";
import MapBottomSheet from "../../_components/map/MapBottomSheet";
import { displayMarkerNow } from "../../_components/map/displayMarkerNow";
import acorn from "../../_assets/acorn.png";
import mapMarker from "../../_assets/mapMarker.png";
import { getLikeFeeds } from "../../_actions/userAction";

const { kakao } = window;
const useStyles = makeStyles((theme) => ({
  root: {
    margin: '0px auto',
    width: '100%',
    color : '#8d6e63',
    display: 'flex',
  },
  appbar:{
    boxShadow: "2px 2px 2px rgba(0,0,0,0.5)"
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    color:'white',
    fontFamily: 'GmarketSansMedium',
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    textShadow: "2px 2px 2px rgba(255, 235, 59, 0.5)"
  }
}));

const InfoMap = (props) => {
  const classes = useStyles();
  const [map, setCreateMap] = useState(null);
  const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
  const [infowindows, setInfoWindows] = useState([]);
  const [bounds, setBounds] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [place, setPlace] = useState(null);
  const [isLocation, setIsLocation] = useState(false);
  const [isdisplayMarkers, setdisplayMarkers] = useState(false);
  const [isgetPlaces, setIsGetPlaces] = useState(false);
  const [likeMarkers, setLikeMarkers] = useState([])
  const [likeObject, setLikeObject] = useState([]);
  const [allObject, setAllObject] = useState([]);
  const [toggleBtn, setToggleBtn] = useState(false);
  const [clusterer, setClusterer] = useState(null);
  const email = JSON.parse(localStorage.getItem("loggedInfo")).email;
  const dispatch = useDispatch();

  //????????? ???????????? ??????
  const createMap = () => {
    let container = document.getElementById("allmap");
    let options = {
      center: new kakao.maps.LatLng(37.506502, 127.053617),
      level: 7,
    };
    let map = new kakao.maps.Map(container, options);

    setBounds(new kakao.maps.LatLngBounds());
    // map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
    setCreateMap(map);
    setdisplayMarkers(true);

    kakao.maps.event.addListener(map, 'click', function(mouseEvent) {        
      setPlace(null)
      removeInfoWindow()
    });

    let clus = new kakao.maps.MarkerClusterer({
      map: map, // ???????????? ??????????????? ???????????? ????????? ?????? ?????? 
      averageCenter: true, // ??????????????? ????????? ???????????? ?????? ????????? ???????????? ?????? ????????? ?????? 
      minLevel: 8 // ???????????? ??? ?????? ?????? ?????? 
    });

    setClusterer(clus)
  };
  //????????? ?????? ????????? ???????????? ?????? 
  const displayAllMarkers = React.useCallback(() => {
    setTimeout(() => {
      removeMarker(map,likeObject)
      setLikeObject([])
      removeInfoWindow()
      setToggleBtn(true);
      setPlace(null);
      clusterer.clear() // ?????? ?????? ???????????? ????????? ?????? ?????? 
      let bounds = new kakao.maps.LatLngBounds();
  
      for (let i = 0; i < markers.length; i++) {
          let placePosition = new kakao.maps.LatLng(markers[i].y, markers[i].x); 
          // var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
  
          let marker = new kakao.maps.Marker({
            map: map,
            position: placePosition,
            // image: markerImage
          });
  
          allObject.push(marker)
  
          bounds.extend(placePosition);
  
            kakao.maps.event.addListener(marker, "click", function () {
              setPlace(markers[i]);
              infowindow.setContent(
                '<div style="padding:5px;font-size:12px;">' +
                  markers[i].placeName +
                  "</div>"
              );
              infowindows.push(infowindow)
              infowindow.open(map, marker);
              map.setCenter(placePosition);
  
              map.setLevel(4);
            });
        }
        clusterer.addMarkers(allObject)
    }, 100);
  })

  const displayLikeMarkers = React.useCallback(() => {
      removeMarker(map,allObject)
      setAllObject([])
      removeInfoWindow()
      setToggleBtn(false);
      setPlace(null);
      clusterer.clear() // ?????? ?????? ???????????? ????????? ?????? ?????? 
      let bounds = new kakao.maps.LatLngBounds();
      for (let i = 0; i < likeMarkers.length; i++) {
          let placePosition = new kakao.maps.LatLng(likeMarkers[i].y, likeMarkers[i].x);
  
          var imageSrc = acorn, // ?????????????????? ???????????????    
          imageSize = new kakao.maps.Size(27, 27), // ?????????????????? ???????????????
          imageOption = {offset: new kakao.maps.Point(27, 27)}; // ?????????????????? ???????????????. ????????? ????????? ???????????? ????????? ???????????? ????????? ???????????????.
  
          var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
  
          let marker = new kakao.maps.Marker({
            map: map,
            position: placePosition,
            image: markerImage
          });
  
          likeObject.push(marker)
  
          bounds.extend(placePosition);
  
            kakao.maps.event.addListener(marker, "click", function () {
              // removeNowmarker();
  
              setPlace(likeMarkers[i]);
              infowindow.setContent(
                '<div style="padding:5px;font-size:12px;">' +
                  likeMarkers[i].placeName +
                  "</div>"
              );
              infowindows.push(infowindow)
              infowindow.open(map, marker);
              
              map.setCenter(placePosition);
              
              map.setLevel(4);
            });
      }
      clusterer.addMarkers(likeObject)
  })

  const removeMarker = (map, markers) => {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }           
  }

  const removeInfoWindow = () => {
    for (let i =0; i < infowindows.length; i++) {
      infowindows[i].close()
    } 
  }
  // ???????????? ?????? ????????? ???????????? ?????????
  const nowLocation = () => {
    // HTML5??? geolocation?????? ????????? ??? ????????? ???????????????
    if (navigator.geolocation) {
      // GeoLocation??? ???????????? ?????? ????????? ???????????????
      navigator.geolocation.getCurrentPosition(function (position) {
        let lat = position.coords.latitude, // ??????
          lon = position.coords.longitude; // ??????

        let locPosition = new kakao.maps.LatLng(lat, lon), // ????????? ????????? ????????? geolocation?????? ????????? ????????? ???????????????
          message = '<div style="padding:5px;">?????? ??????</div>'; // ?????????????????? ????????? ???????????????

        // ????????? ?????????????????? ???????????????
        let nowInfo=displayMarkerNow(locPosition, map ,message)
        infowindows.push(nowInfo[1])
      });
    } else {
      // HTML5??? GeoLocation??? ????????? ??? ????????? ?????? ?????? ????????? ??????????????? ????????? ???????????????

      let locPosition = new kakao.maps.LatLng(33.450701, 126.570667),
        message = "geolocation??? ???????????? ?????????..";

    displayMarkerNow(locPosition, map, message);
     
    }
  };

  function getPlaces() {
    setIsLocation(true)
      dispatch(getAllPlace())
      .then((res) => {
        let addPlaces = JSON.parse(res.payload.data);
        setMarkers(markers => markers.concat(addPlaces));
        setIsGetPlaces(true);
      })
  }

  function getLikePlaces() {
    dispatch(getLikeFeeds(email))
    .then((res)=>{
      let likePlaces = JSON.parse(res.payload.data);
      likePlaces.map((places) => {
         setLikeMarkers(likeMarkers => likeMarkers.concat(places.place))
      })
    })
  }

  const goLikeList = () => {
    setTimeout(() => {
      props.history.push('/food/likefeed')  
    }, 200);
  }
  
  // ?????? ????????? ???????????? ????????? ???????????? ??????
  useEffect(() => {
    createMap();
    getPlaces();
    getLikePlaces();
  },[]);

  useEffect(() => {
    // isLoaction??? ?????? map??? ?????? ???????????? nowLocation??? ???????????? ?????? ????????????.
    if (isLocation){
      nowLocation();
    }
  },[isLocation])

  useEffect(()=>{
    if(isgetPlaces){
      displayAllMarkers();
    }
  },[isgetPlaces])

  return (
    <>
    <div className={classes.root}>
      <AppBar className={classes.appbar} position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            ?????? ??????
             {toggleBtn ? (
              <div className="like_wrap_Btn">
                <button className="like_btn" onClick={displayLikeMarkers}><img className="img_acorn"src={acorn} alt="acorn"/>???????????? ?????? ??????</button>
              </div>
              ):(
                <div className="all_wrap_Btn">
                  <button className="all_btn" onClick={displayAllMarkers}><img className="img_acorn"src={mapMarker} alt="mapMarker" width="24px" height="26.8px" />?????? ?????? ?????? </button>
                </div>
              )
            }
              {/* <div className="btn_wrap">
                  <div className="wrap_Btn">
                    <button className="like_btn" onClick={displayLikeMarkers}><img className="img_acorn"src={acorn} alt="acorn"/>???????????? ?????? ??????</button>
                    <button className="all_btn" onClick={displayAllMarkers}><img className="img_acorn"src={mapMarker} alt="mapMarker" width="24px" height="26.8px" />?????? ?????? ?????? </button>
                  </div>
              </div> */}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
      <MyLocationIcon  className="location_icon" fontSize="large" onClick={nowLocation} color = "primary" />
    <div className="infomap">
        {toggleBtn ? (null):(<button className="likeListBtn" onClick={goLikeList}>????????? ??????</button>)}
      <div id="allmap" style={{ width: "100vw", height: "83vh" }}>
      </div>
    </div>
      {place && <MapBottomSheet placeInfo={place}/>}
    </>
  );
};

export default withRouter(InfoMap);
