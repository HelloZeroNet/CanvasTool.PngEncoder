var Canvas2PNG = {};

/*****************************************************************************
 *
 * copy from canvas2png.js
 *****************************************************************************/

Canvas2PNG.Library = function() {
  var canvas = function() {};

  /**
   * Canvas �G�������g
   * @type {Element}
   */
  this.canvas = canvas;

  /**
   * 2D �R���e�L�X�g
   * @type {Object}
   */
  this.ctx = canvas.getContext('2d');

  /**
   * ����
   * @type {number}
   */
  this.width = canvas.width;

  /**
   * �c��
   * @type {number}
   */
  this.height = canvas.height;

  /**
   * �r�b�g�[�x
   * @type {number}
   */
  this.bitDepth = 8;

  /**
   * �F���
   * @type {Canvas2PNG.Library.ColourType}
   */
  this.colourType = Canvas2PNG.Library.ColourType.TRUECOLOR_WITH_ALPHA;

  /**
   * ���k���@
   * @type {Canvas2PNG.Library.CompressionMethod}
   */
  this.compressionMethod = Canvas2PNG.Library.CompressionMethod.DEFLATE;

  /**
   * �t�B���^���@
   * @type {Canvas2PNG.Library.FilterMethod}
   */
  this.filterMethod = Canvas2PNG.Library.FilterMethod.BASIC;

  /**
   * ��{�t�B���^�̃^�C�v
   * @type {Canvas2PNG.Library.BasicFilterType}
   */
  this.filterType = Canvas2PNG.Library.BasicFilterType.NONE;

  /**
   * �C���^���[�X���@
   * @type {Canvas2PNG.Library.InterlaceMethod}
   */
  this.interlaceMethod = Canvas2PNG.Library.InterlaceMethod.NONE;

  /**
   * �p���b�g�g�p���Ƀ��`�����l����ۑ����邩
   * @type {boolean}
   */
  this.saveAlpha = true;

};

/**
 * �`�����N�^�C�v
 * @enum {string}
 */
Canvas2PNG.Library.ChunkType = {
  // �K�{�`�����N
  IHDR: 'IHDR',
  PLTE: 'PLTE',
  IDAT: 'IDAT',
  IEND: 'IEND',
  // �⏕�`�����N
  TRNS: 'tRNS'
};

/**
 * ���k���@
 * ���݂� Deflate ���k�̂ݒ�`����Ă���
 * @enum {number}
 */
Canvas2PNG.Library.CompressionMethod = {
  DEFLATE: 0
};

/**
 * �F��Ԃ̒�`
 * 1 �r�b�g��(0x01)�������Ă���΃p���b�g�g�p,
 * 2 �r�b�g��(0x02)�������Ă���΃J���[,
 * 3 �r�b�g��(0x04)�������Ă���΃��`�����l���t��
 * @enum {number}
 */
Canvas2PNG.Library.ColourType = {
  GRAYSCALE: 0,
  TRUECOLOR: 2,
  INDEXED_COLOR: 3,
  GRAYSCALE_WITH_ALPHA: 4,
  TRUECOLOR_WITH_ALPHA: 6
};

/**
 * �t�B���^���@
 * ���݂� 0 �̊�{ 5 ��ނ̃t�B���^�̂ݒ�`
 * @enum {number}
 */
Canvas2PNG.Library.FilterMethod = {
  BASIC: 0
};

/**
 * ��{�ƂȂ� 5 ��ނ̃t�B���^
 * @enum {number}
 */
Canvas2PNG.Library.BasicFilterType = {
  NONE: 0,
  SUB: 1,
  UP: 2,
  AVERAGE: 3,
  PAETH: 4
};

/**
 * �C���^���[�X���@
 * @enum {number}
 */
Canvas2PNG.Library.InterlaceMethod = {
  NONE: 0,
  ADAM7: 1
};

