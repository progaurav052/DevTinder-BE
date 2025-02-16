#DevTinder APi

#authRouter
- POST /signup --done
- POST /login  --done
- POST /logout --done


#profileRouter
- GET /profile/view  --done
- PATCH /profile/edit  --done 
- PATCH /profile/password  -- (Reset password API , make use of email and old password , not forgot password); --done



#connectionRequestRouter 
  - Sender POV
- POST /request/send/interested/:userId -- when we right swipe - check from tinder 
- POST /request/send/ignored/:userId  -- when we left swipe
 -- an single API can be used to create this , using dynamic api request 
 -- /request/send/:status/:userId


- reciver POV -> when he recives an notification with accept and ignore , if he clicks any these API WILL BE CALLED 
- POST /request/review/accepted/:requestId 
- POST /request/review/rejected/:requestId
- we can make this dynammic also --> /request/review/:status:requestId


#userRouter
- GET /user/connections
- GET /user/requestrecived
- GET /user/feedAPi - gets you the profiles of other user on platform

//tinder is also using mongoDb --> _id is there in console of profiles


Need to create express router to group api 
avoid writing all api in one file

 