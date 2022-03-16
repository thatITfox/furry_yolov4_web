from tool import darknet2pytorch
import torch
from tool.utils import load_class_names, plot_boxes_cv2
from tool.torch_utils import do_detect
from flask import Flask, render_template, request, redirect, url_for
import cv2
import numpy as np
import random
import string


def fitimginbrowser(img):
    h, w, _ = img.shape
    if h >= w:
        img = cv2.resize(img, (int(w*500/h), 500))
    else:
        img = cv2.resize(img, (500, int(h*500/w)))
    return img

# load weights and model from pytorch format and the config from darknet
model_pt = darknet2pytorch.Darknet('yolov4-obj.cfg', inference=True)
model_pt.load_state_dict(torch.load('yolov4-pytorch.pth'))
model_pt.eval()

# create a flask app
app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        image = request.files['image']
        image = np.asarray(bytearray(image.read()), dtype="uint8")
        og_image = cv2.imdecode(image, cv2.IMREAD_COLOR)
        image = cv2.resize(og_image, (512, 512))
        boxes = do_detect(model_pt, image, 0.5, 0.4, use_cuda=False)
        print(boxes[0])
        plot_boxes_cv2(fitimginbrowser(og_image), boxes[0], 'static/result.png', class_names=load_class_names('obj.names'))
        return redirect(url_for('results'))
    return render_template('index.html')

@app.route('/results')
def results():
    return render_template('results.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)