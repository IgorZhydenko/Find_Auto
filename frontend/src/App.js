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

function App() {
  const [userData, setUserData] = useState(undefined);
  const [firstLoad, setFirstLoad] = useState(true);
  const [posts, setPosts] = useState([]);

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
    //console.log('useEffect');
    const getPosts = () => {
      //console.log('getPosts');
      axios(
          {
            method: 'get',
            headers: {
              'Authorization': 'JWT ' + localStorage.getItem('login_token')
            },
            url: process.env.REACT_APP_LINK +
                process.env.REACT_APP_POSTS,
          }
      )
          .then(res => {
            //console.log(res.data.results, 'qwetr');
            //console.log(res);
            //console.log(res.data[2]);
            //console.log(JSON.stringify(res.data, 0, 2 ), 'setPosts 40');
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
            <Route component={() => <Posts userData={userData} posts={posts} updateAllPosts={updateAllPosts}/>} path='/posts' />
            <Route component={() => <PostPage userData={userData} posts={posts} updateAllPosts={updateAllPosts}/>} path='/post/:postId' />
          </BrowserRouter>
        }
      </div>
  );
}

export default App;
