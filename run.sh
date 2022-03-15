#!/usr/bin/bash

# Checks if python is installed on the system,
# otherwise, it'll automatically install Python and install
# all the necessary libraries.


pip install -r requirements.txt

# Extract the pytorch zip file and move it to th
# root folder

python app.py