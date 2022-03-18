import React from "react";
import styled from "styled-components";
import LeftSide from "./LeftSide";
import Main from "./Main";
import RightSide from "./RightSide";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

const Home = (props) => {
    return (
        <Container>
            { !props.user && <Redirect to="/" /> }
            <Section>
                <h5>
                    <a href="https://www.zsu.gov.ua/All_news/ua">
                        Ми з Україною
                    </a>
                </h5>
                <p>
                    -Давайте підтримаемо Україну в цей не простий час
                </p>
            </Section>
            <LayOut>
                <LeftSide />
                <Main />
                <RightSide />
            </LayOut>
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
      user: state.userState.user
    };
}

export default connect(mapStateToProps)(Home);

const Container = styled.div`
    padding-top: 52px;
    justify-self: center;
`;

const Content = styled.div`
    max-width: 1128px;
    margin-left: auto;
    margin-right: auto;
`;

const Section = styled.section`
    min-height: 50px;
    padding: 16px 0;
    box-sizing: content-box;
    text-align: center;
    text-decoration: underline;
    display: flex;
    justify-content: center;
    > h5 {
        font-size: 14px;
        > a {
            font-weight: 700;
            color: #0a66c2;
        }
        > a:visited {
            color: #0a66c2;
        }
    }
    > p {
        font-size: 14px;
        color: #434649;
        font-weight: 600;
    }
    @media (max-width: 768px) {
        flex-direction: column;
        padding: 0 5px;
    }
`;

const LayOut = styled.div`
    /* margin-left: 50%;
    transform: translateX(18%); */
    display: grid;
    justify-content: center;
    grid-template-areas: 'LeftSide Main RightSide';
    grid-template-columns: minmax(70px, 314px) minmax(200px, 540px) minmax(70px, 314px);
    column-gap: 25px;
    row-gap: 25px;
    grid-template-rows: auto;
    margin: 25px;
    @media (max-width: 768px) {
        display: flex;
        flex-direction: column;
        padding: 0 5px;
    }
`;