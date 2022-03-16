#!/usr/bin/bash

pip install -r 'requirements.txt'

unzip "./yolov4-zip-model/yolov4-pytorch.zip"

python app.py
