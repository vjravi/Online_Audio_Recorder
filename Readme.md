## Online Audio Recorder

This is an online audio recorder written javascript. 
A similar one was used to record audio samples as part of a task on
[Amazon Mechanical Turk](https://www.mturk.com) (AMT). 

## Problem
AMT does not allow usage of MTurk APIs outside of USA. However, a task in the form of a single HTML file can be used. This limits the usage of Java applets to creat such recording applications. It also has the disadvantage that the audio cannot be uploaded on Amazon Web Services AWS server.  

As a solution, an upload option was provided as part of this script which uploads audio to our personal file server. An *upload* button shows up once an audio sample is recorded which can be used to send it to the file server.

## Sample image
![](sample_screenshot.png) 

## Credits
The recorder script is adapted from Matt Diamond's [Recorderjs](https://github.com/mattdiamond/Recorderjs).  
The code for recording remains same.