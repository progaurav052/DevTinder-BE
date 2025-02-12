#DevTinder APi

#authRouter
- POST /signup
- POST /login
- POST /logout


#profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password 


#connectionRequestRouter
- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

#userRouter
- GET /user/connections
- GET /user/requestrecived
- GET /user/feedAPi - gets you the profiles of other user on platform

//tinder is also using mongoDb --> _id is there in console of profiles


Need to create express router to group api 
avoid writing all api in one file

 