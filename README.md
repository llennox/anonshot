# anonshot

anonshot is a pseudo anonymous, location based, video/photo sharing app you can take a look at the backend here.   
- https://github.com/llennox/anonAPI (django, check out the views.py file for all the functionality)

It returns 8 photos/videos sorted by closest then newest at a time in a
scrollview list, users can add photo/videos and comment

think of it as a digital sticky notes you can drop places.

# build

first get react-native running https://facebook.github.io/react-native/docs/getting-started.html

to run the project download the git repository
```
git clone https://github.com/llennox/anonshot
```

go to the directory
```
cd anonshot
```
install dependencies
```
npm install
```
then run either it on a physical or emulated ios or andoid device   
I'm currently running it on a physical android device runnning 5.1.1
```
react-native run-android
react-native run-ios
```

# funcionality in the works

- log in/log out/ create createAccount
- delete/flag photos/videos
- view all authenticated user photos  
- and finally private messaging functionality

# use cases

Because the file server https://github.com/llennox/anonApi is standalone,   
it could be easily configured to run on a private wifi network enabling usage   
when the rest of the network could be cut off in the event of a disaster.   

As for the app remaining on the public network users could:

- sell/buy goods,  
- showcase their work,  
- arrange meetups,  
- and socialize with people in their vicinity
