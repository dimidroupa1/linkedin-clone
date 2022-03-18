import React, {useEffect} from "react";
import styled from "styled-components";
import {getUsersAPI} from "../../actions";
import {connect} from "react-redux";

const Users = (props) => {

    useEffect(() => {
        props.getUsers()
    }, [])

    return (
        <>
            {
                !props.users.length === 0
                    ?
                        <p>There are no users</p>
                    :

                        <Container>
                            {
                                props.users.length > 0 &&
                                props.users.map((post, key) => (
                                    <User key={key}>
                                        <img src={post.user.photoURL} alt="" />
                                        <div>
                                            <span>
                                                {post.user.name}
                                            </span>
                                            <span>
                                                {post.user.email}
                                            </span>
                                        </div>
                                    </User>
                                ))
                            }
                        </Container>
            }
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        users: state.articleState.users
    };
}

const mapDispatchToProps = (dispatch) => ({
    getUsers: () => dispatch(getUsersAPI()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Users);

const Container = styled.div`
  margin-top: 74px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-left: 10px;
  margin-right: 10px;
`;

const User = styled.div`
  margin-top: 15px;
  margin-right: 10px;
  margin-left: 10px;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, .15);
  border-radius: 5px;
  padding: 12px 24px;
  display: flex;
  width: 300px;
  > img {
    width: 50px;
    border-radius: 50%;
  }
  > div {
    display: flex;
    flex-direction: column;
    margin-top: auto;
    margin-bottom: auto;
    margin-left: 8px;
    > span {
      :first-child {
        color: rgba(0, 0, 0, .6);
        font-size: 14px;
      }
      :nth-child(2) {
        color: rgba(0, 0, 0, .6);
        font-size: 12px;
      }
    }
    
  }
`;