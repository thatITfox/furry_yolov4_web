#!/usr/bin/bash

# call this function if python IS installed
py_installed () {
  pip install -r requirements.txt

  # Extract the pytorch zip file and move it to the
  # project root folder
  sudo unzip ./yolov4-zip-model/yolov4-pytorch.zip -d /yolov4-zip-model

  # python app.py
}

# call this function if python is NOT installed
py_not_installed () {
  # install python from source code
  wget https://www.python.org/ftp/python/3.8.4/Python-3.8.4.tgz
  sudo apt-get update
  sudo apt-get upgrade -y
  sudo apt-get install python3 python-pip
  python -V

  # once python is installed, call this function
  py_installed

  # commenting this part of the script since this will install python from source

  # for apt systems
  # sudo apt-get install -y make build-essential libssl-dev zlib1g-dev \
  #      libbz2-dev libreadline-dev libsqlite3-dev wget curl llvm \
  #      libncurses5-dev libncursesw5-dev xz-utils tk-dev

  # yum systems
  # sudo yum -y groupinstall "Development Tools"
  # sudo yum -y install gcc openssl-devel bzip2-devel libffi-devel

  # extract
  # tar xvf Python-3.8.4.tgz
  # cd Python-3.8.4

  # ./configure --enable-optimizations --with-ensurepip=install

  # build
  # make -j 8
}

# Checks if python is installed on the system,
# otherwise, it'll automatically install Python and install
# all the necessary libraries.
check_py() {
  if ! command -v python &> /dev/null
  then
    py_not_installed
  fi

  py_installed
}

check_py