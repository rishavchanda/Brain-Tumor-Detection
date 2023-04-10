# use fast api taking string as parameter from a get function and converting it to image and then to numpy array and then to a dataframe and then to a prediction and then to a json file and then to a string and then to a response
from flask import Flask, json, request
from tensorflow.keras.models import model_from_json
from flask_cors import CORS, cross_origin
import numpy as np
import pandas as pd
import cv2
import pickle
import base64
from io import BytesIO
from PIL import Image
from typing import List
from pydantic import BaseModel
import tensorflow as tf

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# model = pickle.load(open("brain_tumor_model.pkl", "rb"))
json_file = open('model.json', 'r')
loaded_model_json = json_file.read()
json_file.close()
loaded_model = model_from_json(loaded_model_json)
# load weights into new model
loaded_model.load_weights("model.h5")


def get_cv2_image_from_base64_string(b64str):
    encoded_data = b64str.split(',')[1]
    nparr = np.frombuffer(base64.b64decode(encoded_data), np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    return img


def get_image_from_base64_string(b64str):
    encoded_data = b64str.split(',')[1]
    image_data = BytesIO(base64.b64decode(encoded_data))
    img = Image.open(image_data)
    return img

@app.route('/home',methods=['GET'])
def home():
    return "Hello World"

@app.route("/", methods=['POST'])
def read_root():
    data = json.loads(request.data)
    predict_img = []
    for item in data['image']:
        #Decode the base64-encoded image
        image = get_cv2_image_from_base64_string(item)
        image = cv2.resize(image,(224,224))
        predict_img.append(image)
        # encoded_data = item.split(',')[1]
        # image_data = BytesIO(base64.b64decode(encoded_data))
        # pil_image = Image.open(image_data)
        # # Resize the image to 224x224
        # resized_image = pil_image.resize((224, 224))
        # # Append the resized image to the list
        # predict_img.append(resized_image)

    # np_images = np.array([np.array(img) for img in predict_img])
    # # Convert the NumPy array to a TensorFlow tensor
    # tf_images = tf.convert_to_tensor(np_images, dtype=tf.float32)
    # # # Convert the image to a numpy array
    prediction = loaded_model.predict(np.array(predict_img))
    result = np.argmax(prediction, axis=1)

    # make the probablity frtom prediction
    # print(prediction[:,1])
    # print(result)

    return {"result": prediction[:, 1].tolist()}


if __name__ == '__main__':
    app.run(port=5000)
