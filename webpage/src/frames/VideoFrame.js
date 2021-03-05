import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Divider, IconButton } from "@material-ui/core";
import { Link, Route, Switch } from "react-router-dom";

import SideItem from "../components/SideItem/SideItem";

import { PrivateRoute, PublicRoute, TestRoute, TotalRoute } from "../router";

import { IoReorderThreeOutline } from "react-icons/io5";
import { AiOutlineSearch } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import Logo from "../sources/youtube_logo.svg";import CustomButton from "../components/CustomButton/CustomButton";
import ProfileMenu from "../components/ProfileMenu/ProfileMenu";
;

const VideoFrame = ({ location, history }) => {
    // location.pathname 으로 색을 결정
    const { pathname } = location;
    const source = axios.CancelToken.source();

    const [ userInfo, setUserInfo ] = useState(); 

    const viewRoute = () => {
        return <Switch>
            { TotalRoute.map( ({ classify, path, component }, idx) => <Route key={`route-${idx}`} path={`${classify}${path}`} exact component={component} /> ) }
        </Switch>
    }

    const createMenuList = (routes) => {
        return <Box marginTop="0.7rem" marginBottom="0.7rem">
            { routes.map( (route, idx) => <SideItem key={`menu-${idx}`} route={route} mode={sidebar} selected={ pathname === route.classify+route.path }/> ) }
        </Box>
    }

    // 좌측 사이드바 온오프
    const [ sidebar, setSidebar ] = useState(true);
    const onClickSidebar = () => setSidebar(!sidebar);

    // 상단 폼 동작기능
    const [ search, setSearch ] = useState('');

    // 검색기능
    const onChangeSearch = ({ currentTarget: { value }}) => setSearch(value);
    const onClickSearch = () => {
      alert("검색기능");
    }
    
    // 프로필 관련
    const onClickLogin = () => { // 로그인 기능
      history.push('/identify/sign-in');
    }

    const axiosUser = () => {
      axios.post('/api/', {}, { cancelToken: source.token })
        .then()
        .catch( e => {
          if(axios.isCancel(e)) return;
          alert(e);
        })
    };

    const onClickLogo = () => history.push('/');

    useEffect(() => {
      const storage = localStorage.getItem('userInfo');
      if( storage ) setUserInfo(JSON.parse(storage));
      return () => {
        source.cancel();
      }
    }, [])

    return (
      <Box width="100vw" height="100vh" display="flex" flexDirection="column" bgcolor="#f2f2f2">
          <Box id="header" height="3.7rem" bgcolor="white" //style={{ opacity: "90%" }}
            display="flex" alignItems="center" justifyContent="space-between" paddingLeft="1rem" paddingRight="1rem">
            <Box id="header-side-onoff" display="flex" width="10rem" justifyContent="space-between">
                <IconButton size="small" onClick={onClickSidebar}><IoReorderThreeOutline size="1.8rem"/></IconButton>
                <img alt="youtube logo" src={Logo} style={{ width: "6rem", cursor: "pointer" }} onClick={onClickLogo}/>
            </Box>
            <Box id="header-search-bar" maxWidth="40rem" flex={1} display="flex" alignItems="center">
                <input placeholder="검색" value={search} onChange={onChangeSearch}
                  style={{ fontSize: "1rem", padding: "0.15rem 0.3rem", flex: "1" }} />
                <button onClick={onClickSearch}
                  style={{ cursor: "pointer", border: "1px #666666 solid", borderLeft: "0", background: "#eeeeee", width: "4rem", height: "1.65rem", color: "#666666" }}>
                  <AiOutlineSearch size="1rem"/>
                </button>
            </Box>
            <Box id="header-user">
              { userInfo
                ? <ProfileMenu userInfo={userInfo} />
                : <CustomButton onClick={onClickLogin}>
                    <FaUserCircle size="1.5rem"/>
                    <Box marginLeft="0.5rem">로그인</Box>
                  </CustomButton>
              }
            </Box>
          </Box>
          <Box flex={1} display="flex" overflow="auto">
              <Box id="side-bar" bgcolor="#f7f7f7" width={ sidebar ? "15.3rem" : "4.5rem" } 
                display="flex" flexDirection="column" overflow="auto">
                { createMenuList(PublicRoute) }
                <Divider />
                { createMenuList(PrivateRoute) }
                <Divider />
                { createMenuList(TestRoute) }
              </Box>
              <Box id="page-view" flex={1} padding="auto">
                { viewRoute() }
              </Box>
          </Box>
      </Box>
    );
};

export default VideoFrame;