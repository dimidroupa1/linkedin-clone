import React, {useEffect} from "react";
import styled from "styled-components";
import {connect} from "react-redux";
import {getPosts} from "../../actions";
import {useAuthState} from "react-firebase-hooks/auth";
import db, {auth} from "../../firebase";
import ReactPlayer from "react-player";
import {getUsersArticlesAPI} from "../../actions";



const RightSideProfile = (props) => {

    // useEffect(() => {
    //     props.getUsersArticles()
    // }, []);

    return (
        <>
            {
                !props.postsUser.length === 0
                    ?
                        <p>You don`t have any post</p>
                    :
                        <Container>
                            {
                                props.postsUser.length > 0 && props.postsUser.map((post, key) => (
                                        <Article key={key}>
                                            <SharedActor>
                                                <a>
                                                    <img src={props.user.photoURL} alt=""/>
                                                    <div>
                                                        <span>
                                                            {props.user.displayName}
                                                        </span>
                                                        <span>
                                                            {post.description}
                                                        </span>
                                                    </div>
                                                </a>

                                                <button>
                                                    <img src="/images/ellipsis-icon.svg" alt=""/>
                                                </button>
                                            </SharedActor>
                                            {
                                                post.sharedImg || post.video ? (
                                                    <>
                                                        <Description>
                                                            {post.description}
                                                        </Description>
                                                        <ShareImg>
                                                            <a>
                                                                {
                                                                    !post.sharedImg && post.video
                                                                        ?
                                                                        <ReactPlayer width={"100%"} url={post.video}/>
                                                                        :
                                                                        <img src={post.sharedImg} alt=""/>
                                                                }
                                                            </a>
                                                        </ShareImg>
                                                    </>
                                                ) : (
                                                    <>
                                                        <DescriptionOnly>
                                                            {post.description}
                                                        </DescriptionOnly>
                                                    </>
                                                )
                                            }
                                        </Article>
                                ))
                            }
                        </Container>
            }
        </>
    )

}

const mapStateToProps = (state) => {
    return {
        user: state.userState.user,
        postsUser: state.articleState.postsUser
    }
}

const mapDispatchToProps = (dispatch) => ({
    getUsersArticles: () => dispatch(getUsersArticlesAPI()),
})

export default connect(mapStateToProps, mapDispatchToProps)(RightSideProfile);

const Container = styled.div`
  grid-area: RightSideProfile;
  background: white;
  border: 1px solid rgba(0, 0, 0, .15);
  border-radius: 5px;
  padding: 12px 24px;
`;

const Article = styled.div`
  padding: 4px 0;
  margin: 0 0 8px ;
  overflow: visible;
`;

const SharedActor = styled.div`
  padding-right: 40px;
  flex-wrap: nowrap;
  padding: 12px 16px 0;
  margin-bottom: 8px;
  align-items: center;
  display: flex;
  > a {
    margin-right: 12px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    text-decoration: none;
    > img {
      width: 48px;
      height: 48px;
      border-radius: 50%;
    }
    > div {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-basis: 0;
      margin-left: 8px;
      overflow: hidden;
      margin-top: 8px;
      > span {
        text-align: left;
        :first-child {
          font-size: 14px;
          font-weight: 700;
          color: rgba(0, 0, 0, 1);
        }
        :nth-child(n+1) {
          font-size: 12px;
          color: rgba(0, 0, 0, .6);
        }
      }
    }
  }
  > button {
    position: absolute;
    right: 12px;
    top: 0;
    background: transparent;
    border: none;
    outline: none;
    width: 40px;
  }
`;

const Description = styled.div`
  padding: 0 16px;
  overflow: hidden;
  color: rgba(0, 0, 0, .9);
  font-size: 14px;
  text-align: left;
`;

const ShareImg = styled.div`
  margin-top: 8px;
  width: 100%;
  display: block;
  position: relative;
  background-color: #f9fafb;
  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;

const DescriptionOnly = styled(Description)`
  padding-bottom: 8px;
`;