import $ from 'jquery';
import NProgress from 'nprogress-npm';

export const REQUEST_POSTS = 'REQUEST_POSTS';
function requestPosts() {
  return {
    type: REQUEST_POSTS
  };
}

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
function receivePosts(type, json) {
  return {
    type: RECEIVE_POSTS,
    posts: json.data,
    meta: json.meta,
    status: json.status,
    receivedAt: Date.now(),
  };
}

export const IS_LOGIN = 'IS_LOGIN';
function isLog(isLogin){
  console.log(isLogin);
  return {
    type: IS_LOGIN,
    value: isLogin
  }
}


export function isLogin(){
  return dispatch => {
    const isLogin = document.getElementById('isLogin').value;
    //console.log(isLogin)
    dispatch(isLog(isLogin));
  }
}

export function signupPost(email, password) {
  return dispatch => {
    NProgress.start();
    dispatch(requestPosts());
    return $.ajax({
      url: '/signup',
      dataType: 'json',
      cache: false,
      type: 'post',
      data: {
        email: email,
        password: password
      },
      success: function(response) {
        console.log(response);
        NProgress.done();
        dispatch(receivePosts('signup', response));
      },
      error: function(xhr, status, err) {
        console.error(xhr);
      }
    });
  };
}

export function loginPost(email, password) {
  return dispatch => {
    NProgress.start();
    dispatch(requestPosts());
    return $.ajax({
      url: '/login',
      dataType: 'json',
      cache: false,
      type: 'post',
      data: {
        email: email,
        password: password
      },
      success: function(response) {
        console.log(response);
        NProgress.done();
        window.location.href = '/help';
        dispatch(receivePosts('login', response));
      },
      error: function(xhr, status, err) {
        console.error(xhr);
      }
    });
  };
}

export function fetchPosts(page, sort = '') {
  return dispatch => {
    NProgress.start();
    dispatch(requestPosts());
    return $.ajax({
      url: '',
      dataType: 'json',
      cache: false,
      type: 'post',
      data: {
        total_page: 10,
      },
      success: function(response) {
        NProgress.done();
        window.location.href = '/help';
        dispatch(receivePosts('fetch', response));
      },
      error: function(xhr, status, err) {
        console.error(xhr);
      }
    });
  };
}

// function shouldFetchPosts(state, subreddit) {
//   const posts = state.postsBySubreddit[subreddit]
//   if (!posts) {
//     return true
//   } else if (posts.isFetching) {
//     return false
//   } else {
//     return posts.didInvalidate
//   }
// }

// export function fetchPostsIfNeeded(subreddit) {

//   // Note that the function also receives getState()
//   // which lets you choose what to dispatch next.

//   // This is useful for avoiding a network request if
//   // a cached value is already available.

//   return (dispatch, getState) => {
//     if (shouldFetchPosts(getState(), subreddit)) {
//       // Dispatch a thunk from thunk!
//       return dispatch(fetchPosts(subreddit))
//     } else {
//       // Let the calling code know there's nothing to wait for.
//       return Promise.resolve()
//     }
//   }
// }
