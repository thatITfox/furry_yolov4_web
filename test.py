import numpy as np
import cv2

img = cv2.imread('image_1.png')
print(img.shape)

def fitimginbrowser(img):
    h, w, c = img.shape
    if h > w:
        img = cv2.resize(img, (int(w*100/h), 100))
    else:
        img = cv2.resize(img, (100, int(h*100/w)))
    return img

print(fitimginbrowser(img).shape)
while True:
    cv2.imshow('image', fitimginbrowser(img))
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break