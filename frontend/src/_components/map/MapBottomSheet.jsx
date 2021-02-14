import React, {useState, useEffect}from 'react';
import PropTypes from "prop-types";
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import "./MapBottomSheet.css";
import StorefrontRoundedIcon from '@material-ui/icons/StorefrontRounded';
import {getPlaceFeed} from '../../_actions/mapAction';

const MapBottomSheet = (props) => {
  const { id, placeName, addressName} = props.placeInfo;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPlaceFeed(id)); 
  },[])

  const feeds= useSelector((state) => {
    return JSON.parse(state.map.placeFeedsInfo.data)
  },shallowEqual)

  const goMapFeed = () => {
    props.history.push({
      pathname: "/food/feed",
      state : {
        id : id,
        placeName : placeName,
        addressName : addressName
      },
    });
  }

  MapBottomSheet.propTypes = {
    id : PropTypes.any.isRequired,
    placeName : PropTypes.any.isRequired,
    addressName : PropTypes.any.isRequired,
  };

  return (  
    <div className="bottomsheet">
      <StorefrontRoundedIcon id="storeIcon" fontSize="medium" />
      <h2>{placeName}</h2>

      <hr/>
      <h4>{addressName}</h4>
      <a onClick={goMapFeed}>리뷰보기</a>
    </div>
  );
}


export default withRouter(MapBottomSheet);