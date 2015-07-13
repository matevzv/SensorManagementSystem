SensorManagementSystem
======================


## Installation in Windows
Installation was performed on Windows 8.1   


### Prerequisites  

SMS requires git, node.js, mongodb and npm.


####1. Install git
https://git-scm.com/download/win


####2. Install node.js
https://nodejs.org/

-> select Install


####3. Install MongoDB
Complete manual on how to install MongoDB you can find on the link 
  
  http://docs.mongodb.org/manual/installation/ 
  
  -> select Install on Windows

https://www.mongodb.org/downloads?_ga=1.220748696.141358494.1436366125 

-> select Download


### Setup the SMS
To setup the SMS platform on your computer follow steps bellow.


#### 1. Fork and Clone SMS repository
  -Fork the  repository on GitHub. 
  
This can be done by clicking on the fork button.
  
  -Clone the repository to your computer (change _username_ with your Github user name).
  
#####First method:

  This can be done by clicking on the "Clone in Desktop" button. 
  
  The button is on the right side of the page.

#####Second method:
  
  Open GitHub app from your computer. 
  
    Select Clone then you select the repository you want to clone and at the end you click on "Clone".
  
#####Third method:
  
    Press the Win key, type cmd.exe, and press Ctrl + Shift + Enter to run the Command Prompt as Administrator.   
    
    In the directory you want to make the clone : git clone https://github.com/username/SensorManagementSystem.git
  
 


#### 2. Install SMS dependencies
To install SMS dependencies using _npm_ package manager type:

Press the Win key, type cmd.exe, and press Ctrl + Shift + Enter to run the Command Prompt as Administrator.
  
  -> npm install


#### 3. Fill a database with the dummy data
To insert dummy data into your database type:
   
   ->node top.js fill_dummy_data


#### 4. Run the SMS
 To run SMS type:
   
   ->node top.js run 

Now open your web browser and visit [http://localhost:3000](http://localhost:3000/), to login use u:_vik_  p:_vik_.
