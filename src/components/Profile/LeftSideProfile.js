import React, {useEffect} from "react";
import styled from "styled-components";
import {connect} from "react-redux";

const LeftSideProfile = (props) => {
    return (
        <Container>
            <Header>

            </Header>
            <User>
                <UserImg>
                    {
                        props.user ? (
                            <img src={props.user.photoURL} alt="" />
                        ) : (
                            <img src="/images/user.svg" alt="" />
                        )
                    }
                </UserImg>
                <UserName>
                    {
                        props.user ? (
                            <span>
                                {props.user.displayName}
                            </span>
                        ) : (
                            <span>
                                Name Surname
                            </span>
                        )
                    }
                </UserName>
                <UserEmail>
                    {
                        props.user ? (
                            <span>
                                {props.user.email}
                            </span>
                        ) : (
                            <span>
                                Name Surname
                            </span>
                        )
                    }
                </UserEmail>
            </User>
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.userState.user,
    }
}

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(LeftSideProfile);

const Container = styled.div`
  grid-area: LeftSideProfile;
  background: white;
  border: 1px solid rgba(0, 0, 0, .15);
  border-radius: 5px;
  max-height: 250px;
`;

const Header = styled.div`
  background-image: url("/images/card-bg.svg");
  background-position: center;
  background-size: 540px;
  height: 136px;
`;

const User = styled.div`
  
`;

const UserImg = styled.div`
    > img {
      width: 80px;
      border-radius: 50%;
      position: relative;
      top: -40px;
      left: 40px;
    }
`;

const UserName = styled.div`
  position: relative;
  top: -30px;
  left: 30px;
  font-weight: 600;
`;

const UserEmail = styled.div`
  font-size: 12px;
  position: relative;
  top: -30px;
  left: 30px;
`;












