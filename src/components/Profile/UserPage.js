import React from "react";
import styled from "styled-components";
import HeaderProfile from "./HeaderProfile";
import LeftSideProfile from "./LeftSideProfile";
import RightSideProfile from "./RightSideProfile";

const UserPage = (props) => {
    return(
        <Container>
            <HeaderProfile />
            <Content>
                <LeftSideProfile />
                <RightSideProfile />
            </Content>
        </Container>
    )
}

export default UserPage;

const Container = styled.div``;

const Content = styled.div`
  margin-top: 74px;
  display: grid;
  grid-template-areas: "LeftSideProfile RightSideProfile";
  grid-template-columns: minmax(200px, 540px) minmax(70px, 314px);
  column-gap: 20px;
  row-gap: 20px;
  justify-content: center;
  grid-template-rows: auto;
  @media(max-width: 768px){
    display: flex;
    flex-direction: column;
    padding: 0 5px;
  }
`;