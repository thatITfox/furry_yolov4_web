import random
import string

def random_ascii_char(length):
    return ''.join(random.choices(string.ascii_letters, k=length))

with open('admin-key', 'w') as key:
    key.write(random_ascii_char(32))