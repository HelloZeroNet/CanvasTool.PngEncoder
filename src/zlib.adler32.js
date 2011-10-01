/**
 * zlib.adler32.js
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
 * @fileoverview Adler32 checksum ����.
 */

goog.provide('Zlib.Adler32');

goog.scope(function() {


/**
 * Adler32 �n�b�V���l�̍쐬
 * @param {Array|Uint8Array} array �Z�o�Ɏg�p���� byte array.
 * @return {number} Adler32 �n�b�V���l.
 */
Zlib.Adler32 = function(array) {
  return Zlib.Adler32.update(1, array);
};

/**
 * Adler32 �n�b�V���l�̍X�V
 * @param {number} adler ���݂̃n�b�V���l.
 * @param {Array|Uint8Array} array �X�V�Ɏg�p���� byte array.
 * @return {number} Adler32 �n�b�V���l.
 */
Zlib.Adler32.update = function(adler, array) {
  var s1 = adler & 0xffff;
      s2 = (adler >>> 16) & 0xffff;

  for (var i = 0, l = array.length; i < l; i++) {
    s1 = (s1 + array[i]) % 65521;
    s2 = (s2 + s1) % 65521;
  }

  return (s2 << 16) | s1;
};


// end of scope
});

/* vim:set expandtab ts=2 sw=2 tw=80: */
