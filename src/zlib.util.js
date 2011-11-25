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
 * @param {number=} size array size.
 * @return {Array} network byte order array.
 */
Zlib.Util.convertNetworkByteOrder = function(number, size) {
  var tmp = [], octet, nullchar;

  do {
    octet = number & 0xff;
    tmp.push(octet);
    number >>>= 8;
  } while (number > 0);

  if (typeof(size) === 'number') {
    nullchar = 0;
    while (tmp.length < size) {
      tmp.push(nullchar);
    }
  }

  return tmp.reverse();
};


/**
 * �z�񕗂̃I�u�W�F�N�g�̕����R�s�[
 * @param {Array|Uint8Array} arraylike �z�񕗃I�u�W�F�N�g.
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
 * @param {Array|Uint8Array} dst ������z��.
 * @param {Array|Uint8Array} src �������z��.
 * @return {number} ������̔z��T�C�Y.
 */
Zlib.Util.push = function(dst, src) {
  var i = 0, dl = src.length, sl = src.length, pushImpl = (!!dst.push);

  if (pushImpl) {
    for (; i < sl; i++) {
      dst.push(src[i]);
    }
  } else {
    for (; i < sl; i++) {
      dst[dl + i] = src[i];
    }
  }

  return dst.length;
}

// end of scope
});

/* vim:set expandtab ts=2 sw=2 tw=80: */
