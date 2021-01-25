import React, { useState, useEffect } from 'react';
import { Link, withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerFeed } from "../../_actions/feedAction";
import "./CSS/CreateFeed.css"
import ReactStars from "react-rating-stars-component";
import NavigateBeforeRoundedIcon from '@material-ui/icons/NavigateBeforeRounded';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

function CreateFeed(props) {
  const [loggedUser, setLoggedUser] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [score, setScore] = useState(0);
  const selectedFile = props.location.state.selectedFile[0]
  const placeInfo = props.location.state.detailPlace

  useEffect(() => {
    onLoggedUser()

    // setFormDatas(formData)
  }, []);

  const dispatch = useDispatch();
  const onTitleHandler = (e) => {
    setTitle(e.currentTarget.value);
  }
  const onContentHandler = (e) => {
    setContent(e.currentTarget.value);
  }
  const onLoggedUser = (e) => {
    setLoggedUser(JSON.parse(localStorage.getItem("loggedInfo")));
  };
  const ratingChanged = (newRating) => {
    setScore(newRating)
    console.log(selectedFile)
    console.log(placeInfo)
    console.log(placeInfo.place_name)
    console.log(placeInfo.address_name)
    console.log(loggedUser.email)
    
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (title && content && score) {
      var formData = new FormData();
      formData.append("file", `${selectedFile}`)
      formData.append("title", `${title}`)
      formData.append("content", `${content}`)
      formData.append("score", `${score}`)
      formData.append("location", `${placeInfo.address_name}`)
      formData.append("storeName", `${placeInfo.place_name}`)
      formData.append("userEmail", `${loggedUser.email}`)

      dispatch(registerFeed(formData))
        .then((res) => {
          if (res.payload.status) {
            alert("피드가 작성되었습니다!");
            props.history.push("/feed/flippages");
          } else {
            alert("피드 생성 실패"); 
          }
        })
        .catch((err) => {
          for (let value of formData.keys()) {
            console.log(value);
          }
          console.log("피드 실패 에러");
          console.log(err);
        });
    } else {
      alert("이건뭐고");
    }
  };

  return (
    <div className="createWapper">
      <h2>오늘의 맛일기</h2>
      {/* <h3>작성자 : {loggedUser.nickname}</h3> */}
      <br/>
      <hr/>
      <form onSubmit={onSubmitHandler}>
        <ReactStars
          count={5}
          onChange={ratingChanged}
          size={24}
          activeColor="#ffd700"
        />
        <input
          type="title"
          value={title}
          onChange={onTitleHandler}
          autoFocus
          required
          placeholder="뭐 먹음?!"
        />
        <input
          type="content"
          value={content}
          onChange={onContentHandler}
          required
          placeholder="어땠음?!"
        />     

        <div id="feed-button-wapper">
          <a id="goback">
            <Link to="/feed/camera"> <NavigateBeforeRoundedIcon fontSize="large"  /> </Link>
          </a>
          <button id="next" type="submit">
            <NavigateNextIcon fontSize="large"  />
          </button>
        </div>     
      </form>
    </div>
  );
};

export default withRouter(CreateFeed);