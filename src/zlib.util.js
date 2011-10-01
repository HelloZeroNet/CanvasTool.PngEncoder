/**
 * zlib.util.js
 *
 * The MIT License
 *
 * Copyright (c) 2011 imaya
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * @fileoverview �G���Ȋ֐��Q���܂Ƃ߂����W���[������.
 */

goog.provide('Zlib.Util');

goog.scope(function() {

/**
 * module Zlib.Util
 */
Zlib.Util = {};

/**
 * make network byte order byte array from integer
 * @param {number} number source number.
 * @param {number=} padding padding.
 * @return {Array} network byte order array.
 */
Zlib.Util.convertNetworkByteOrder = function(number, padding) {
  var tmp = [], octet, nullchar;

  do {
    octet = number & 0xff;
    tmp.unshift(octet);
    number >>>= 8;
  } while (number > 0);

  if (typeof(padding) === 'number') {
    nullchar = 0;
    while (tmp.length < padding) {
      tmp.unshift(nullchar);
    }
  }

  return tmp;
};


/**
 * �z�񕗂̃I�u�W�F�N�g�̕����R�s�[
 * @param {Object} arraylike �z�񕗃I�u�W�F�N�g.
 * @param {number} start �R�s�[�J�n�C���f�b�N�X.
 * @param {number} length �R�s�[���钷��.
 * @return {Array} �����R�s�[�����z��.
 */
Zlib.Util.slice = function(arraylike, start, length) {
  var result, arraylength = arraylike.length;

  if (arraylike instanceof Array) {
    return arraylike.slice(start, start + length);
  }

  result = [];

  for (var i = 0; i < length; i++) {
    if (start + i >= arraylength) {
      break;
    }
    result.push(arraylike[start + i]);
  }

  return result;
}

/**
 * �z�񕗂̃I�u�W�F�N�g�̌���
 * ������̔z��Ɍ������̔z���ǉ����܂�.
 * @param {Object} arraylike1 ������z��.
 * @param {Object} arraylike2 �������z��.
 * @return {Object} ������̔z��.
 */
Zlib.Util.concat = function(arraylike1, arraylike2) {
  var length1 = arraylike1.length,
      length2 = arraylike2.length,
      index,
      BufSize = 0xffff;

  if (arraylike1 instanceof Array && arraylike2 instanceof Array) {
    if (arraylike2.length > BufSize) {
      for (index = 0; index < length2; index += BufSize) {
        Array.prototype.push.apply(
            arraylike1,
            arraylike2.slice(index, index + BufSize)
        );
      }
      return arraylike1;
    } else {
      return Array.prototype.push.apply(arraylike1, arraylike2);
    }
  }

  for (index = 0; index < length2; index++) {
    arraylike1[length1 + index] = arraylike2[index];
  }

  return arraylike1;
}


// end of scope
});

/* vim:set expandtab ts=2 sw=2 tw=80: */
