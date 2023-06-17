#######################################################################################
# Design of UAV-Based Leaf Disease Detection System for Rice Plan Using Deep Learning
#
# Vher Jann T. Alcantara
# Arland J. Bindoy
# Altz Kienn D. de Vera
# Nathaniel Kent G. Pablo 
#
######################################################################################

from picamera2 import *
from datetime import datetime
from signal import pause
import time
import board
import adafruit_adxl34x
import RPi.GPIO as GPIO

import sys
import glob
import re
import numpy as np
import cv2

# Keras
import matplotlib.pyplot as plt

import pymysql
import pyrebase
import os
import subprocess
import dropbox
from dropbox.exceptions import AuthError, ApiError

#---------------------Dropbox-------------------------------------------------------- 
# Dropbox access token
access_token = 'sl.Bgb-bQHqWMjctB89oiWyCIJsPEOPIK-GjgYNVK9VMTZDZ1okqOe1U3ftmkIIMc7UIrCohkUo0F21dqpUAYt-dQye9enDj1UBHcEoX08DSraRaT0CnVfLVJSjzyyLsi5N-32lVz8'

# Dropbox folder containing the images to download
dropbox_folder = '/images/'

# Local folder to download the images to
local_folder = '/home/pi/Desktop/testing/images'

#----------------------MOdel---------------------------------------------------------
net = cv2.dnn.readNet('/home/pi/Desktop/testing/Leaf_diseasev2.onnx')

#----------------------Acellerometer-------------------------------------------------
i2c = board.I2C()
accelerometer = adafruit_adxl34x.ADXL343(i2c)
accelerometer.enable_motion_detection(threshold=17)

#----------------------Camera--------------------------------------------------------
#camera = Picamera2()
#config = camera.create_still_configuration(main={"size":(4656, 3496)}, transform=libcamera.Transform(vflip=True,hflip=True), buffer_count=6)
#(2328,1748) 2k
#(4656, 3496) 4k
#camera.configure(config)
#camera.start_preview(Preview.NULL)
#camera.set_controls({"AwbMode":0,"AfMode":0,"LensPosition": 275.0,"ScalerCrop":(1862,1398,930,698)})
#zoom {"ScalerCrop":(1552,1166,1550,1164)}
#2x (1164,874,2326,1746)
#3x (1552,1166,1550,1164)
#4x (1746,1312,1162,872)
#5x (1862,1398,930,698)
#6x (1940,1456,776,582)
#7x (1996,1498,664,498)


#----------------------GPIO----------------------------------------------------------
#GPIO.setmode(GPIO.BCM)
#GPIO.setup(10, GPIO.IN, pull_up_down=GPIO.PUD_DOWN) #Arming switch
#GPIO.setwarnings(False)
#subprocess.check_output("echo gpio |sudo tee /sys/class/leds/led0/trigger", shell=True) #LED
#subprocess.check_output("echo 0 |sudo tee -a /sys/class/leds/led0/brightness", shell=True)
#SwitchState = 0
#lstSwitchState = 0

#---------------------database connection-------------------------------------------
connection = pymysql.connect(host="localhost", user="admin1", password="secret", database="leaf")
connection.autocommit = True
cursor = connection.cursor()

#------------------------NGROK---------------------------------------------
res = subprocess.call("/home/pi/Desktop/start-ngrok.sh")
#config = {
#  "apiKey": "AIzaSyCRVY2pVmf3EoeSYytefEVyvcT85WngmB8",
#  "authDomain": "tester-3bddf.firebaseapp.com",
#  "databaseURL": "https://tester-3bddf-default-rtdb.asia-southeast1.firebasedatabase.app/",
#  "storageBucket": "tester-3bddf.appspot.com"
#}
#firebase = pyrebase.initialize_app(config)
#db = firebase.database()
ngrokLink = open('ngrokPublicUrl.txt').read()
ngrokLink = ngrokLink.strip()

ngrokPublicUrl = ngrokLink + "/images/datetime.php"

print(ngrokLink)
print(ngrokPublicUrl)

#db.child("ngrok_public_url").set(ngrokPublicUrl)
#getNgrokUrl = db.child("ngrok_public_url").get()

#if (ngrokPublicUrl == getNgrokUrl.val()):
#  print("GOOD")
#else:
#  print("BAD")



#-------Prediction-------

def capture(date_time):
    if accelerometer.events["motion"]:
        raise Exception("movement")
    camera.start()
    
    if accelerometer.events["motion"]:
        raise Exception("movement")
    camera.capture_file('/var/www/html/images/%s.jpg' % date_time)
    print('%s No Movement = capturing' % date_time)
    camera.stop()
    
def db_comm(img_loc,sts,res,dt):
    insertData = "INSERT INTO captured_leaf(Image_Loc, Status, Result, Datetime) VALUES (%s,%s,%s,%s);"
    data=(img_loc,sts,res,dt)
    cursor.execute(insertData,data)
    connection.commit()

def arming_seq(sec):
    for i in range(sec):
        light_on(.16)
        light_off(.16)
        light_on(.16)
        light_off(.5)
        print(i)
        
def standby():
    light_on(.1)
    light_off(.1)
    light_on(.1)
    light_off(.1)
    light_on(.1)
    light_off(.5)
    
def light_on(dly):
    #subprocess.check_output("echo 1 |sudo tee -a /sys/class/leds/led0/brightness", shell=True)
    time.sleep(dly)
    
def light_off(dly):
    #subprocess.check_output("echo 0 |sudo tee -a /sys/class/leds/led0/brightness", shell=True)
    time.sleep(dly)

def format_yolov5(frame):

    row, col, _ = frame.shape
    _max = max(col, row)
    result = np.zeros((_max, _max, 3), np.uint8)
    result[0:row, 0:col] = frame
    return result

def detect(image, net):
    blob = cv2.dnn.blobFromImage(image , 1/255.0, (640, 640), swapRB=True)
    net.setInput(blob)
    predictions = net.forward()
    return predictions

def load_classess():
    class_list = []
    with open("config_files/classes.txt", "r") as f:
        class_list = [cname.strip() for cname in f.readlines()]
    return class_list
class_list = load_classess()

def wrap_detection(input_image,output_data):
    class_ids = []
    confidences = []
    boxes = []

    rows = output_data.shape[0]

    image_width, image_height, _ = input_image.shape
    x_factor = image_width / 640
    y_factor =  image_height / 640

    for r in range(rows):
        row = output_data[r]
        confidence = row[4]
        if confidence >= 0.4:

            classes_scores = row[5:]
            _, _, _, max_indx = cv2.minMaxLoc(classes_scores)
            class_id = max_indx[1]
            if (classes_scores[class_id] > .25):

                confidences.append(confidence)

                class_ids.append(class_id)

                x, y, w, h = row[0].item(), row[1].item(), row[2].item(), row[3].item() 
                left = int((x - 0.5 * w) * x_factor)
                top = int((y - 0.5 * h) * y_factor)
                width = int(w * x_factor)
                height = int(h * y_factor)
                box = np.array([left, top, width, height])
                boxes.append(box)

    indexes = cv2.dnn.NMSBoxes(boxes, confidences, 0.25, 0.2) 

    result_class_ids = []
    result_confidences = []
    result_boxes = []

    for i in indexes:
        result_confidences.append(confidences[i])
        result_class_ids.append(class_ids[i])
        result_boxes.append(boxes[i])
        
    return result_class_ids,result_confidences,result_boxes

#-------------------------Main loop---------------------
print("start")
def main():
    global lstSwitchState
    global SwitchState
    
    while True:
        # Connect to Dropbox
        try:
            dbx = dropbox.Dropbox(access_token)
        except AuthError as e:
            print(f'Error connecting to Dropbox: {e}')
            exit()

        # Get a list of all files in the Dropbox folder
        try:
            files = dbx.files_list_folder(dropbox_folder).entries
        except ApiError as e:
            print(f'Error getting list of files from Dropbox: {e}')
            exit()

        # Loop through each file and download it if it doesn't already exist locally
        for file in files:
            # Check if the file is an image file
            if file.name.lower().endswith(('.jpg', '.jpeg', '.png', '.gif')):
                # Check if the file already exists in the local download folder
                local_path = os.path.join(local_folder, file.name)
                if os.path.isfile(local_path):
                    print(f'{file.name} already exists in the download folder')
                else:
                    # Download the file from Dropbox
                    try:
                        dbx.files_download_to_file(local_path, file.path_display)
                        print(f'{file.name} downloaded successfully')
                        image_name = (f'{file.name}')
                        
                        #time
                        timestamp = datetime.now().isoformat()
                        currDT = timestamp
                        # Load the YOLOv5 image classification model
                        model_imageclass = cv2.dnn.readNet("/home/pi/Desktop/testing/Image_classificationv3.onnx")

                        # Set backend and target to CUDA to enable GPU inference (optional)
                        #model.setPreferableBackend(cv2.dnn.DNN_BACKEND_CUDA)
                        #model.setPreferableTarget(cv2.dnn.DNN_TARGET_CUDA)

                        # Load the input image
                        image_class = cv2.imread("/home/pi/Desktop/testing/images/%s" %image_name)
                        image_class = cv2.resize(image_class, (224,224))
                        # Prepare the input blob for the YOLOv5 model
                        blob = cv2.dnn.blobFromImage(image_class , 1/255.0, (224, 224), swapRB=True)

                        # Set the input blob for the YOLOv5 model
                        model_imageclass.setInput(blob)

                        # Perform a forward pass of the YOLOv5 model to get the output predictions
                        output = model_imageclass.forward()

                        # Get the predicted class label
                        predicted_class = output.argmax()

                        # Define a list of class names for the YOLOv5 model
                        image_class_names = ["Rice_plant", "Other"]

                        # Get the predicted class name
                        image_predicted_class_name = image_class_names[predicted_class]

                        # Draw the predicted class label on the input image
                        cv2.putText(image_class, image_predicted_class_name, (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1.0, (0, 0, 255), 2)

                        # Show the input image with the predicted class label
                        print(image_predicted_class_name)
                        
                        if  image_predicted_class_name == "Rice_plant":
                            image = cv2.imread("/home/pi/Desktop/testing/images/%s" %image_name)#/var/www/html/images/%s.jpg" %timestamp)
                            frame = cv2.resize(image, (640,640))
                            Image_Location = format_yolov5(frame)
                            outs = detect(Image_Location,net)
                            class_ids, confidences, boxes = wrap_detection(Image_Location, outs[0])

                            for (classid, confidence, box) in zip(class_ids, confidences, boxes):

                                cv2.rectangle(frame, box, (0, 255, 255), 2)
                                cv2.rectangle(frame, (box[0], box[1] - 20), (box[0] + box[2], box[1]), (0, 255, 255), -1)
                                cv2.putText(frame, class_list[classid], (box[0], box[1] - 10), cv2.FONT_HERSHEY_SIMPLEX, .5, (0,0,0))

                            cv2.imwrite("/var/www/html/images/%s" %image_name, frame)
                            Image_Loca=("https://%s/images/%s" %(ngrokLink,image_name))#("https://%s/images/%s" %(ngrokLink,image_name))
                            try:
                                Result_img = (class_list[classid])
                            except NameError:
                                 Result_img = "No detected disease"
                                 
                            if Result_img == "No detected disease":
                                Status = 0
                                print(Result_img,Status)
                            elif Result_img == "Blast" or "Blight" or "Brownspot":
                                Status = 1
                                print(Result_img,Status)
                            #Status = 1 if Result_img == "Blast" or "Blight" or "Brownspot" else 0
                            
                            db_comm(Image_Loca,Status,Result_img,currDT)
                            #print(confidence)
                            print(currDT)
                            print(Image_Loca)
                            print(Result_img)
                            print(Status)
                        else:
                            print('Not a Rice plant')
                    except ApiError as e:
                        print(f'Error downloading {file.name} from Dropbox: {e}')
        #time.sleep(60)
        #print("---------NEW---------")
        
        #SwitchState = GPIO.input(10)
        #if SwitchState != lstSwitchState: #Arming switch
            #if SwitchState:
                #arming_seq(7)
                
        #print(SwitchState)
        
        #if SwitchState:
            #print("test")
            #if not accelerometer.events["motion"]: #motion detection
                #light_on(0)
                #timestamp = datetime.now().isoformat()
                #currDT = timestamp
                #try:
                    #capture(timestamp)
                
                    #light_off(0)
                     
            
                #except Exception:
                    #camera.stop()
                    #print("Capture Canceled")
                #except:
                    #print("FAILED")
                
                #print('---------done---------')
                
    else:
        standby()
        print('.')
        
        #lstSwitchState = SwitchState
    loop


if __name__ == "__main__":
     main()
            
            
        
