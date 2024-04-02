import { httpService } from './http.service'
import { storageService } from './async-storage.service'
import { userService } from './user.service'


export const reviewService = {
  add,
  query,
  remove
}

function query(filterBy) {

  var queryStr
  if (filterBy.toyId) queryStr = `?toyId=${filterBy.toyId}`
  else if (filterBy.userId) queryStr = `?userId=${filterBy.userId}`
  else queryStr = ''
  return httpService.get(`review${queryStr}`)
  // return storageService.query('review')
}

async function remove(reviewId) {
  await httpService.delete(`review/${reviewId}`)
  // await storageService.remove('review', reviewId)
}

async function add({ txt, toyId }) {
  const addedReview = await httpService.post(`review`, { txt, toyId })
  console.log('addedsdddddddd', addedReview);

  // const aboutUser = await userService.getById(aboutUserId)

  // const reviewToAdd = {
  //   txt,
  //   byUser: userService.getLoggedinUser(),
  //   aboutUser: {
  //     _id: aboutUser._id,
  //     fullname: aboutUser.fullname,
  //     imgUrl: aboutUser.imgUrl
  //   }
  // }

  // reviewToAdd.byUser.score += 10
  // await userService.update(reviewToAdd.byUser)
  // const addedReview = await storageService.post('review', reviewToAdd)
  return addedReview
}