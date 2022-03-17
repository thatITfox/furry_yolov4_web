#!/usr/bin/bash

# pip install -r requirements.txt

zip -F -o "yolov4-zip-model/yolov4-pytorch.zip" --out "yolov4-pytorch_out.zip"
unzip "yolov4-pytorch_out.zip"
rm -rf "yolov4-pytorch_out.zip"

# python app.py
