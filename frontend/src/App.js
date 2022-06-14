//import {BrowserRouter, Redirect, Route} from "react-router-dom";
import {BrowserRouter, Navigate, Redirect, Route, Routes} from "react-router-dom";

import React, {useEffect, useState} from 'react';
import Header from "./ReactComponents/Mutual/Header";
import LanguageButton from "./ReactComponents/Mutual/LanguageButton";
import Login from "./ReactComponents/Body/Authentication/Login";
import Registration from "./ReactComponents/Body/Authentication/Registration";
import Administration from "./ReactComponents/Body/Administration/Administration";
import axios from 'axios';
import jwt_decode from "jwt-decode";

import i18n from "i18next";
import "./i18n";
import './App.css';
import Posts from "./ReactComponents/Body/Posts/Posts";
import PostPage from "./ReactComponents/Body/Posts/PostPage";
import Home from "./ReactComponents/Mutual/Home";
import AboutUs from "./ReactComponents/Mutual/AboutUs";
import Bookmarks from "./ReactComponents/Mutual/Bookmarks";

function App() {
  const [userData, setUserData] = useState(undefined);
  const [firstLoad, setFirstLoad] = useState(true);
  const [posts, setPosts] = useState([]);

  // const [name, setName] = useState('');
  // const [info, setInfo] = useState('');
  // const [isSearch, setIsSearch] = useState(true);
  // const [vehicleSeenDate, setVehicleSeenDate] = useState('');
  // const [vehicleSeenPlace, setVehicleSeenPlace] = useState('');
  // const [registrationNumber, setRegistrationNumber] = useState('');
  // const [vinCode, setVinCode] = useState('');
  // const [brand, setBrand] = useState('');
  // const [model, setModel] = useState('');
  // const [year, setYear] = useState(new Date());
  // const [color, setColor] = useState('');
  // const [distinctFeature, setDistinctFeature] = useState('');
  // const [images, setImages] = useState([]);

    const [filterData, setFilterData] = useState({name:"", info:"", isSearch:true, vehicleSeenDate:"",
        vehicleSeenPlace:"", registrationNumber:"", vinCode: "", brand:"", model:"", year:"", color:""});

  const languageInit = () => {
    const currentLanguage = localStorage.getItem('resource-lang');
    if (currentLanguage) {
      i18n.changeLanguage(currentLanguage);
    }
  }

  useEffect(() => {
    if (firstLoad) {
      verifyUser();
    }
    setFirstLoad(false);
  }, [firstLoad])

  const updateAllPosts = (newPosts) => {
    setPosts(newPosts)
  }

  useEffect(() => {
    const getPosts = () => {
      axios(
          {
            method: 'get',
            headers: {
              'Authorization': 'JWT ' + localStorage.getItem('login_token')
            },
            data: {
                filterData,
            },
            url: process.env.REACT_APP_LINK +
                process.env.REACT_APP_POSTS,
          }
      )
          .then(res => {
            updateAllPosts(res.data.results);
          })
          .catch(err => {
            console.log(err);
          })
    }
    getPosts();
  }, [])

  const verifyUser = () => {
    let current_token = localStorage.getItem('login_token');
    if (!current_token) {
      setUserData(null);
      return;
    }

    axios({
      method: 'post',
      url: process.env.REACT_APP_LINK + process.env.REACT_APP_VERIFY,
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        'token': current_token
      }
    })
        .then(_ => {
          const decodedToken = jwt_decode(current_token);
          setUserData({
            'isAdmin': decodedToken['is_admin'],
            'userId': decodedToken['user_id'],
          });
        })
        .catch(_ => {
          setUserData(null);
        })
  }

  languageInit();

  return (
      <div className="App">
        {
          userData !== undefined &&
          <BrowserRouter>
            <Route component={() => <Header
                userData={userData}
                setUserData={setUserData} />} path='/' />
            <Route exact path='/'>
              <Redirect to={
                userData === null ? '/login' : userData['isAdmin'] ? '/administration' : '/posts'
              } />
            </Route>
            <Route component={
              () => <Login setUserData={setUserData} />
            } path='/login' />
            <Route component={() => <Registration />} path='/register' />
            <Route component={() => <LanguageButton />} path='/' />
            {
              userData && userData['isAdmin'] &&
              <Route component={() => <Administration />} path='/administration' />
            }
            <Route component={() => <Home/>} path='/home' />
            <Route component={() => <AboutUs/>} path='/about-us' />
            <Route component={() => <Posts userData={userData} setFilterData={setFilterData} filterData={filterData} posts={posts} updateAllPosts={updateAllPosts}/>} path='/posts' />
            <Route component={() => <Bookmarks userData={userData} updateAllPosts={updateAllPosts}/>} path='/bookmarks' />
            <Route component={() => <PostPage userData={userData} posts={posts} updateAllPosts={updateAllPosts}/>} path='/post/:postId' />
          </BrowserRouter>
        }
      </div>
  );
}

export default App;
