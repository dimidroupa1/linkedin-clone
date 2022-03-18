import React, {useEffect} from "react";
import styled from "styled-components";
import Header from "../Home/Header";
import {connect} from "react-redux";
import {getUsersAPI} from "../../actions";
import Users from "./Users";

const NetWork = (props) => {



    return (
        <Container>
            <Header />
            <Users />
        </Container>
    )
}


export default NetWork;

const Container = styled.div``;
