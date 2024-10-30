export const ApiURL = "http://localhost:8080/api/v1"

export const registerEndPoint = `${ApiURL}/auth/register`
export const loginEndPoint = `${ApiURL}/auth/login`
export const logoutEndPoint = `${ApiURL}/auth/logout`

export const userProfileEndPoint = `${ApiURL}/user/profile`
export const userEditProfileEndPoint = `${ApiURL}/user/profile/edit`
export const userFollowEndPoint = `${ApiURL}/user/follow/`
export const userUnfollowEndPoint = `${ApiURL}/user/unfollow/`
export const userFollowersEndPoint = `${ApiURL}/user/followers/`
export const userFollowingEndPoint = `${ApiURL}/user/following/`
export const userCountFollowersEndPoint = `${ApiURL}/user/countfollowers/`
export const userCountFollowingEndPoint = `${ApiURL}/user/countfollowing/`
export const isFollowedUserEndPoint = `${ApiURL}/user/isfollowed/`
export const isFollowerUserEndPoint = `${ApiURL}/user/isfollower/`

export const getFeedEndPoint = `${ApiURL}/post/feed`
export const getNewPostsEndPoint = `${ApiURL}/post/feed/new`
export const uploadPostEndPoint = `${ApiURL}/post/new`
export const getUserPostsEndPoint = `${ApiURL}/post/userfeed`
