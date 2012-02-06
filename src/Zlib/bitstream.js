/**
 * zlib.bitstream.js
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
 * @fileoverview bit �P�ʂł̏������ݎ���.
 */

goog.provide('Zlib.BitStream');

goog.scope(function() {

/**
 * �r�b�g�X�g���[��
 * @constructor
 */
Zlib.BitStream = function() {
  this.index = 0;
  this.bitindex = 0;
  this.buffer = [];
};

/**
 * �r�b�g���w�肵����������������
 * @param {!number} number �������ސ��l.
 * @param {!number} n �������ރr�b�g��.
 * @param {!boolean=} reverse �t���ɏ������ނȂ�� true.
 */
Zlib.BitStream.prototype.writeBits = function(number, n, reverse) {
  var i, add,
      buffer = this.buffer,
      bufferIndex = this.index;

  for (i = 0; i < n; i++) {
    if (buffer[bufferIndex] === undefined) {
      buffer[bufferIndex] = 0;
    }

    if (reverse) {
      add = number & 1;
      number >>>= 1;
    } else {
      add = ((number >>> n - i - 1) & 1) === 0 ? 0 : 1;
    }
    buffer[bufferIndex] = ((buffer[bufferIndex] << 1) | add) >>> 0;

    this.bitindex++;
    if (this.bitindex === 8) {
      this.bitindex = 0;
      this.reverseByte(bufferIndex);
      bufferIndex++;
    }
  }

  this.index = bufferIndex;
};

/**
 * �X�g���[���̏I�[�������s��
 * @return {!Array} �I�[������̃o�b�t�@�� byte array �ŕԂ�.
 */
Zlib.BitStream.prototype.finish = function() {
  if (this.bitindex > 0) {
    this.buffer[this.index] <<= 8 - this.bitindex;
  }

  this.reverseByte(this.index);

  return this.buffer;
};

/**
 * �w�肵���ʒu�̃o�C�g�̃r�b�g�����𔽓]����
 * @param {!number} index �r�b�g�����̔��]���s���ʒu.
 * @return {!number} ���]������̒l.
 */
Zlib.BitStream.prototype.reverseByte = function(index) {
  var dst = 0, src = this.buffer[index], i;

  for (i = 0; i < 8; i++) {
    dst = (dst << 1) | (src & 1);
    src >>>= 1;
  }

  this.buffer[index] = dst >>> 0;

  return this.buffer[index];
};


// end of scope
});

/* vim:set expandtab ts=2 sw=2 tw=80: */
