#use fast api taking string as parameter from a get function and converting it to image and then to numpy array and then to a dataframe and then to a prediction and then to a json file and then to a string and then to a response

from fastapi import FastAPI
import uvicorn
import numpy as np
import pandas as pd
from typing import Union
import io
import cv2
import pickle
import base64
from typing import List
from pydantic import BaseModel
from keras.applications.vgg16 import preprocess_input, decode_predictions

app = FastAPI()
model = pickle.load(open("brai_tumor_model.pkl", "rb"))


def get_cv2_image_from_base64_string(b64str):
    encoded_data = b64str.split(',')[1]
    nparr = np.frombuffer(base64.b64decode(encoded_data), np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    return img


@app.get("/")
def read_root():
    return {"Hello": "World"}

class ImageRequest(BaseModel):
    image: List[str]


@app.post('/predict')
async def predict(request: ImageRequest):

    predict_img=[]
    for item in request.image:
        # Decode the base64-encoded image
        image = get_cv2_image_from_base64_string(item)
        image = cv2.resize(image,(224,224))
        predict_img.append(image)
    # # Convert the image to a numpy array
    #image_array = np.array(image)
    #print(image_array.shape)
    prediction = model.predict(np.array(predict_img))
    result = np.argmax(prediction, axis =1)

    print(prediction)

    # Return the prediction as a JSON response
    return {'result': result.tolist()}