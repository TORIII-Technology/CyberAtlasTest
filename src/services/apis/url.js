const BASEURL = process.env.REACT_APP_API_URL

const URLs = {
  //auth
  getNonce: BASEURL + "/auth/nonce",
  postLogin: BASEURL + "/auth/login",

  //user
  getUser: BASEURL + "/user",
  putUser: BASEURL + "/user",

  //nfts
  getNfts: BASEURL + "/nfts/list",

  //stores
  getStores: BASEURL + "/store/list",
  getStore: BASEURL + "/store",

  //files, for upload image
  //content-type: multipart/form-data
  postFile: BASEURL + "/file/upload?object_type=user_post",

  //posts
  getPosts: BASEURL + "/post/list",
  getPost: BASEURL + "/post",
  postPost: BASEURL + "/post",
  putPost: BASEURL + "/post",
  deletePost: BASEURL + "/post",

  //comments
  getComments: BASEURL + "/comment/list",
  getComment: BASEURL + "/comment",
  postComment: BASEURL + "/comment",
  putComment: BASEURL + "/comment",
  deleteComment: BASEURL + "/comment",
}

export default URLs
