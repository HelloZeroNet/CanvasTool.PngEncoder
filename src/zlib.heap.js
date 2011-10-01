/**
 * zlib.heap.js
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
 * @fileoverview Heap Sort ����. �n�t�}���������Ŏg�p����.
 */

goog.provide('Zlib.Heap');

goog.scope(function() {

/**
 * �J�X�^���n�t�}�������Ŏg�p����q�[�v����
 * @param {number} length �q�[�v�T�C�Y.
 * @constructor
 */
Zlib.Heap = function(length) {
  this.buffer = new Array(length * 2);
  this.length = 0;
};

/**
 * �e�m�[�h�� index �擾
 * @param {number} index �q�m�[�h�� index.
 * @return {number} �e�m�[�h�� index.
 *
 */
Zlib.Heap.prototype.getParent = function(index) {
  return ((index - 2) / 4 | 0) * 2;
};

/**
 * �q�m�[�h�� index �擾
 * @param {number} index �e�m�[�h�� index.
 * @return {number} �q�m�[�h�� index.
 */
Zlib.Heap.prototype.getChild = function(index) {
  return 2 * index + 2;
};

/**
 * Heap �ɒl��ǉ�����
 * @param {number} index �L�[ index.
 * @param {number} value �l.
 * @return {number} ���݂̃q�[�v��.
 */
Zlib.Heap.prototype.push = function(index, value) {
  var current, parent,
      heap = this.buffer,
      swap;

  current = this.length;
  heap[this.length] = index;
  heap[this.length + 1] = value;
  this.length += 2;

  // ���[�g�m�[�h�ɂ��ǂ蒅���܂œ���ւ������݂�
  while (current > 0) {
    parent = this.getParent(current);

    // �e�m�[�h�ƒl���r���Đe�̕����傫����Βl�� index �����ւ���
    if (heap[current + 1] < heap[parent + 1]) {
      swap = heap[current];
      heap[current] = heap[parent];
      heap[parent] = swap;

      swap = heap[current + 1];
      heap[current + 1] = heap[parent + 1];
      heap[parent + 1] = swap;

      current = parent;
    // ����ւ����K�v�Ȃ��Ȃ����炻���Ŕ�����
    } else {
      break;
    }
  }

  return this.length;
};

/**
 * Heap�����ԏ������l��Ԃ�
 * @return {{index: number, value: number, length: number}} {index: �L�[index,
 *     value: �l, length: �q�[�v��} �� Object.
 */
Zlib.Heap.prototype.pop = function() {
  var index, value,
      heap = this.buffer,
      current, parent;

  index = heap[0];
  value = heap[1];

  // ��납��l�����
  heap[0] = heap[this.length - 2];
  heap[1] = heap[this.length - 1];
  this.length -= 2;

  parent = 0;
  // ���[�g�m�[�h���牺�����Ă���
  while (true) {
    current = this.getChild(parent);

    // �͈̓`�F�b�N
    if (current >= this.length) {
      break;
    }

    // �ׂ̃m�[�h�Ɣ�r���āA�ׂ̕����l����������Ηׂ����݃m�[�h�Ƃ��đI��
    if (current + 2 < this.length && heap[current + 3] < heap[current + 1]) {
      current += 2;
    }

    // �e�m�[�h�Ɣ�r���Đe�̕����傫���ꍇ�͓���ւ���
    if (heap[parent + 1] > heap[current + 1]) {
      swap = heap[current];
      heap[current] = heap[parent];
      heap[parent] = swap;

      swap = heap[current + 1];
      heap[current + 1] = heap[parent + 1];
      heap[parent + 1] = swap;
    } else {
      break;
    }

    parent = current;
  }

  return {index: index, value: value, length: this.length};
};


// end of scope
});

/* vim:set expandtab ts=2 sw=2 tw=80: */
