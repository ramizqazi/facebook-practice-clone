/**
 * Get posts
 */
export const getPosts = (state) => state.Home.posts;
/**
 * Get posts By Id
 */
export const getPostsById = (state, uid) => {
  const posts = [];
  getPosts(state) ? getPosts(state).map((post) => {
    if (post.userId === uid) {
      posts.push(post);
    }
  }) : null;
  return posts;
};

/**
* Get remaining todos
*/
export const getLoading = (state) => state.Home.loading;

/**
* Get remaining todos
*/
export const getError = (state) => state.Home.error;
