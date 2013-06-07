#!/usr/bin/env python
"""
A simple directory watching script that will compute the checksum for all files
within a path and execute a change when the sum changes.

This will not work well with large files as it reads the entire file into
memory.
"""
import argparse
import hashlib
import os
import subprocess
import time


def checksum(directories):
    sums = []
    for _dir in directories:
        for dir, dirs, files in os.walk(_dir):
            for subdir in dirs:
                sums += checksum([os.path.join(dir, subdir)])
            for file in files:
                sums.append(filesum(os.path.join(dir, file)))
    return sums


def filesum(path_to_file):
    return hashlib.md5(file(path_to_file, 'r').read()).hexdigest()


def main(dir, action):
    sums = checksum(dir)
    sum = hashlib.md5(''.join(sums)).hexdigest()
    while True:
        sums = checksum(dir)
        new_sum = hashlib.md5(''.join(sums)).hexdigest()
        if new_sum != sum:
            subprocess.call(action, shell=True)
        sum = new_sum
        time.sleep(1)


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--dir', nargs='+', help='Directory to watch',
                        default='.')
    parser.add_argument('--action', nargs='?',
        help='Action to perform on change')
    args = parser.parse_args()
    main(args.dir, args.action)
