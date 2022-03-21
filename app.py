from tool import darknet2pytorch
import torch
from tool.utils import load_class_names, plot_boxes_cv2
from tool.torch_utils import do_detect
from flask import Flask, render_template, request, redirect, url_for
import cv2
import numpy as np
import random
import string
import os

# load weights and model from pytorch format and the config from darknet
model_pt = darknet2pytorch.Darknet('yolov4-obj.cfg', inference=True)
model_pt.load_state_dict(torch.load('yolov4-pytorch.pth'))
model_pt.eval()

# create a flask app
app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        # generate a random string as the name of the image and as a session token
        session = ''.join(random.choices(string.ascii_uppercase + string.digits, k=8))
        image = request.files['image']
        try:
            image = np.asarray(bytearray(image.read()), dtype="uint8")
            og_image = cv2.imdecode(image, cv2.IMREAD_COLOR)
            image = cv2.resize(og_image, (512, 512))
            boxes = do_detect(model_pt, image, 0.5, 0.4, use_cuda=False)
            print(boxes[0])
            with open(f'static/{session}.txt', 'w') as f:
                f.write(str(len(boxes[0])) + '\n')
            plot_boxes_cv2(og_image, boxes[0], f'static/{session}.png', class_names=load_class_names('obj.names'))
            return redirect(f'/results/{session}' )
        except Exception as e:
            print(e)
            return redirect(url_for('index'))
    return render_template('index.html')

@app.route('/results/<session>')
def results(session):
    with open(f"static/{session}.txt", "r") as f:
        num_boxes = int(f.readline())
    try:
        return render_template('results.html', session=session, num_boxes=num_boxes)
    except:
        return redirect(url_for('index'))

@app.route('/delete/<session>')
def delete(session):
    try:
        os.remove(f'static/{session}.png')
        os.remove(f'static/{session}.txt')
    except:
        print(f'tried to remove {session}.png but it does not exist')

@app.route('/deleteall/<key>')
def deleteall(key):
    with open('admin-key', 'r') as keyfile:
        if keyfile.read() == key:
            # delete all image file from static folder
            for file in os.listdir('static'):
                if file.endswith('.png'):
                    os.remove(f'static/{file}')
            return 'success'
        else:
            return 'Invalid key'


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)