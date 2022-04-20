import React from "react";
import styled from "styled-components";
import {connect} from "react-redux";
import PostModal from "./PostModal";
import {useState} from "react";
import {useEffect} from "react";
import {getArticlesAPI, giveLikesAPI} from "../../actions";
import ReactPlayer from "react-player";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../../firebase";

const Main = (props) => {

  const [showModal, setShowModal] = useState("close");

  useEffect(() => {
    props.getArticles();
  }, [])

  const handleClick = (e) => {
    e.preventDefault();
    if(e.target !== e.currentTarget){
      return ;
    }
    switch(showModal){
      case "open":
        setShowModal("close");
        break;
      case "close":
        setShowModal("open");
        break;
      default:
        setShowModal("close");
        break;
    }
  }


  return (
      <>
        {
          !props.posts.length === 0
              ?
                <p>There are no posts</p>
              :
          <Container>
            <ShareBox>
              <div>
                {
                  props.user && props.user.photoURL ? (

                      <img src={props.user.photoURL} alt=""/>
                  ) : (
                      <img src="/images/user.svg" alt=""/>
                  )
                }
                <button onClick={handleClick} disabled={props.loading ? true : false}>
                  Зробити пост
                </button>
              </div>
              <div>
                <button>
                  <img src="/images/photo.svg" alt=""/>
                  <span>
                    Фото
                  </span>
                </button>
                <button>
                  <img src="/images/movie.svg" alt=""/>
                  <span>
                  Відео
                </span>
                </button>
                <button>
                  <img src="/images/events.svg" alt=""/>
                  <span>
                  Подій
                </span>
                </button>
                <button>
                  <img src="/images/title.svg" alt="" width="40" height="40"/>
                  <span>
                  Заголовки
                </span>
                </button>
              </div>
            </ShareBox>
            <Content>
              {
                props.loading && <img src="/images/spin.svg" alt=""/>
              }
              {
                props.posts.length > 0 &&
                props.posts.map((post, key) => (
                    <Article key={key}>
                      <SharedActor>
                        <a>
                          <a>
                            <img src={post.actor.image} alt="" />
                          </a>
                          <div>
                            <span>
                              {post.actor.name}
                            </span>
                            {/*<span>*/}
                            {/*  {post.actor.description}*/}
                            {/*</span>*/}
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
                              <SharedImg>
                                <a>
                                  {
                                    !post.sharedImg && post.video
                                        ?
                                        <ReactPlayer width={"100%"} url={post.video}/>
                                        :
                                        <img src={post.sharedImg} alt=""/>
                                  }
                                </a>
                              </SharedImg>
                            </>
                        ) : (
                            <DescriptionOnly>
                              {post.description}
                            </DescriptionOnly>
                        )
                      }
                      <SocialCounts>
                        <li>
                          <button>
                            <img
                                src="https://static-exp1.licdn.com/sc/h/d310t2g24pvdy4pt1jkedo4yb"
                                alt=""
                            />
                            <img
                                src="https://static-exp1.licdn.com/sc/h/lhxmwiwoag9qepsh4nc28zus"
                                alt=""
                            />
                            <img
                                src="https://static-exp1.licdn.com/sc/h/cpho5fghnpme8epox8rdcds22"
                                alt=""
                            />
                            <span>
                                {post.likes}
                            </span>
                          </button>
                        </li>
                        <li>
                          <a>
                            {post.comments} comment
                          </a>
                        </li>
                      </SocialCounts>
                      <SocialActions>
                        <button>
                          <img src="/images/like-icon.svg" alt="" width="20" height="20"/>
                          <button>
                            Like
                          </button>
                        </button>
                        <button>
                          <img src="/images/comments-icon.svg" alt="" width="20" height="20"/>
                          <span>
                            Comments
                          </span>
                        </button>
                        <button>
                          <img src="/images/share-icon.svg" alt="" width="20" height="20"/>
                          <span>
                            Share
                          </span>
                        </button>
                        <button>
                          <img src="/images/send-icon.svg" alt="" width="20" height="20"/>
                          <span>
                            Send
                          </span>
                        </button>
                      </SocialActions>
                    </Article>
                ))
              }
            </Content>
            <PostModal showModal={showModal} handleClick={handleClick}/>
          </Container>
        }
      </>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
    loading: state.articleState.loading,
    posts: state.articleState.posts,
  };
}

const mapDispatchToProps = (dispatch) => ({
  getArticles: () => dispatch(getArticlesAPI()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Main);

const Container = styled.div`
  grid-area: Main;
`;

const CommonCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;

const ShareBox = styled(CommonCard)`
  display: flex;
  flex-direction: column;
  color: #958b7b;
  margin: 0 0 8px;
  background: #fff;
  
  > div {
    > button {
      outline: none;
      color: rgba(0, 0, 0, .6);
      font-size: 14px;
      line-height: 1.5;
      min-height: 48px;
      background: transparent;
      border: none;
      display: flex;
      align-items: center;
      font-weight: 600;
      width: 25%;
      
    }
    :first-child {
      display: flex;
      align-items: center;
      padding: 8px 16px 0 16px;
      > img {
        width: 48px;
        border-radius: 50%;
        margin-right: 8px;
      }
      > button {
        cursor: pointer;
        margin: 4px 0;
        flex-grow: 1;
        border-radius: 35px;
        padding-left: 16px;
        border: 1px solid rgba(0, 0, 0, .15);
        background-color: #fff;
        text-align: left;
      }
    }
    :nth-child(2) {
      display: flex;
      flex-wrap: wrap;
      padding-bottom: 4px;
      justify-content: space-around;
      > button {
        > img {
          margin: 0 4px 0 22px;
          width: 25px;
          height: 25px;
        }
        > span {
          
        }
      }
      @media(max-width: 1128px){
        > button {
          > img {
            margin: 0 4px 0 8px;
          }
        }
      }
    }
  }
`;

const Article = styled(CommonCard)`
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
    > a {
      > img {
        width: 48px;
        height: 48px;
        border-radius: 50%;
      }
    }
    > div {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-basis: 0;
      margin-left: 8px;
      overflow: hidden;
      margin-top: auto;
      margin-bottom: auto;      
      > span {
        text-align: left;
        :first-child {
          font-size: 16px;
          font-weight: 700;
          color: rgba(0, 0, 0, 1);
        }
        :nth-child(n+1) {
          font-size: 14px;
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

const DescriptionOnly = styled(Description)`
  padding-bottom: 8px;
`;

const SharedImg = styled.div`
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

const SocialCounts = styled.ul`
  line-height: 1.3;
  display: flex;
  align-items: flex-start;
  overflow: auto;
  margin: 0 16px;
  padding: 8px 0;
  border-bottom: 1px solid #e9e5df;
  list-style: none;
  > li {
    margin-right: 5px;
    font-size: 14px;
    > button {
      display: flex;
      border: none;
      background: transparent;
      > img {
        :first-child {
          position: relative;
          left: 0;
        }
        :nth-child(2) {
          position: relative;
          left: -5px;
        }
        :nth-child(3) {
          position: relative;
          left: -10px;
        }
      }
    }
  }
`;

const SocialActions = styled.div`
  align-items: center;
  display: flex;
  margin: 0;
  min-height: 40px;
  padding: 4px 8px;
  flex-wrap: wrap;
  justify-content: space-around;
  button {
    display: inline-flex;
    align-items: center;
    padding: 8px;
    border: none;
    background: transparent;
    @media (min-width: 768px) {
      span {
        margin-left: 8px;
      }
    }
  }
`;

const Line = styled.div`
  width: 100%;
  display: flex;
  > hr {
    width: 81%;
    position: relative;
    left: -10px;
  }
  > span {
    position: relative;
    right: 10px;
    color: rgba(0, 0, 0, .6);
  }
  > img  {
    color: rgba(0, 0, 0, .6);
  }
  margin-bottom: 8px;
`;

const Content = styled.div`
  text-align: center;
  > img {
    width: 70px;
    height: 70px;
  }
`;