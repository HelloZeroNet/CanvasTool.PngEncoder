(function() {
var CanvasTool = {};

/*****************************************************************************
 * copy from canvas2png.js
 *****************************************************************************/
CanvasTool.PngEncoder = function() {
  /**
   * ����
   * @type {number}
   */
  this.width;

  /**
   * �c��
   * @type {number}
   */
  this.height;

  /**
   * �r�b�g�[�x
   * @type {number}
   */
  this.bitDepth = 8;

  /**
   * �F���
   * @type {CanvasTool.PngEncoder.ColourType}
   */
  this.colourType = CanvasTool.PngEncoder.ColourType.TRUECOLOR_WITH_ALPHA;

  /**
   * ���k���@
   * @type {CanvasTool.PngEncoder.CompressionMethod}
   */
  this.compressionMethod = CanvasTool.PngEncoder.CompressionMethod.DEFLATE;

  /**
   * �t�B���^���@
   * @type {CanvasTool.PngEncoder.FilterMethod}
   */
  this.filterMethod = CanvasTool.PngEncoder.FilterMethod.BASIC;

  /**
   * ��{�t�B���^�̃^�C�v
   * @type {CanvasTool.PngEncoder.BasicFilterType}
   */
  this.filterType = CanvasTool.PngEncoder.BasicFilterType.NONE;

  /**
   * �C���^���[�X���@
   * @type {CanvasTool.PngEncoder.InterlaceMethod}
   */
  this.interlaceMethod = CanvasTool.PngEncoder.InterlaceMethod.NONE;

  /**
   * �K���}�l ( null �̏ꍇ gAMA �`�����N�͕t�^����Ȃ�)
   * @type {?number}
   */
  this.gamma = null;

  /**
   * ��b�F�x ( null �̏ꍇ cHRM �`�����N�͕t�^����Ȃ�)
   * Primary chromaticities and white point
   * @type {?{
   *   whitePointX: number,
   *   whitePointY: number,
   *   redX: number,
   *   redY: number,
   *   greenX: number,
   *   greenY: number,
   *   blueX: number,
   *   blueY: number}}
   */
  this.chrm = null;

  /**
   * �����p���b�g
   * name �̓p���b�g��, num �͈ȉ��̒ʂ�.
   * �����̎��͏o������S�Ă̐F�𐄏��p���b�g�Ɋ܂߂�
   * 0 �͖��� ( sPLT �`�����N��t�^���Ȃ�)
   * 1 �ȏ�̎��͏o���p�x��� n ���܂Ő����p���b�g�Ɋ܂߂�
   * @type {?{
   *   name: string,
   *   num: number
   * }}
   */
  this.splt = null;

  /**
   * Standard RGB colour space ( null �̏ꍇ sRGB �`�����N�͕t�^����Ȃ�)
   * @type {?CanvasTool.PngEncoder.RenderingIntent}
   */
  this.srgb = null;

  /**
   * Significant bits ( null �̏ꍇ sBIT �`�����N�͕t�^����Ȃ�)
   * @type {Array.<number>}
   */
  this.sbit = null;

  /**
   * ICC �v���t�@�C�� ( null �̏ꍇ iCCP �`�����N�͕t�^����Ȃ�)
   * @type {?{
   *   name: string,
   *   compressionMethod: CanvasTool.PngEncoder.CompressionMethod,
   *   profile: Array
   * }}
   */
  this.iccp = null;

  /**
   * Image Histogram ��ۑ����邩�ǂ��� (true �� hIST �`�����N��t�^����)
   * @type {boolean}
   */
  this.hist = false;

  /**
   * Physical pixel dimensions
   * @type {?{
   *   x: number,
   *   y: number,
   *   unit: CanvasTool.PngEncoder.UnitSpecifier
   * }}
   */
  this.phys = null;

  /**
   * Image last-modification time
   * @type {Date}
   */
  this.time = null;

  /**
   * Textual data
   * @type {?{
   *   keyword: string,
   *   text: string
   * }}
   */
  this.text = null;

  /**
   * Compressed textual data
   * @type {?{
   *   keyword: string,
   *   text: string,
   *   compressionMethod: CanvasTool.PngEncoder.CompressionMethod
   * }}
   */
  this.ztxt = null;

  /**
   * �p���b�g�g�p���Ƀ��`�����l����ۑ����邩
   * @type {boolean}
   */
  this.trns = true;
};

/**
 * �`�����N�^�C�v
 * @enum {Array.<number>}
 */
CanvasTool.PngEncoder.ChunkType = {
  // �K�{�`�����N
  IHDR: ['IHDR'],
  PLTE: ['PLTE'],
  IDAT: ['IDAT'],
  IEND: ['IEND'],
  // �⏕�`�����N
  TRNS: ['tRNS'],
  GAMA: ['gAMA'],
  CHRM: ['cHRM'],
  SBIT: ['sBIT'],
  SRGB: ['sRGB'],
  ICCP: ['iCCP'],
  BKGD: ['bKGD'],
  HIST: ['hIST'],
  PHYS: ['pHYs'],
  SPLT: ['sPLT'],
  TEXT: ['tEXt'],
  ZTXT: ['zTXt'],
  ITXT: ['iTXt'],
  TIME: ['tIME']
};

/**
 * ���k�t���O
 * @enum {number}
 */
CanvasTool.PngEncoder.CompressionFlag = {
  UNCOMPRESSED: 0,
  COMPRESSED: 1
};

/**
 * ���k���@
 * ���݂� Deflate ���k�̂ݒ�`����Ă���
 * @enum {number}
 */
CanvasTool.PngEncoder.CompressionMethod = {
  DEFLATE: 0
};

/**
 * �F��Ԃ̒�`
 * 1 �r�b�g��(0x01)�������Ă���΃p���b�g�g�p,
 * 2 �r�b�g��(0x02)�������Ă���΃J���[,
 * 3 �r�b�g��(0x04)�������Ă���΃��`�����l���t��
 * @enum {number}
 */
CanvasTool.PngEncoder.ColourType = {
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
CanvasTool.PngEncoder.FilterMethod = {
  BASIC: 0
};

/**
 * ��{�ƂȂ� 5 ��ނ̃t�B���^
 * @enum {number}
 */
CanvasTool.PngEncoder.BasicFilterType = {
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
CanvasTool.PngEncoder.InterlaceMethod = {
  NONE: 0,
  ADAM7: 1
};

/**
 * Rendering intent for Standard RGB colour space
 * @enum {number}
 */
CanvasTool.PngEncoder.RenderingIntent = {
  PERCEPTUAL: 0,
  RELATIVE: 1,
  SATURATION: 2,
  ABSOLUTE: 3
};

/**
 * Unit Specifier for Physical pixel dimensions
 * @enum {number}
 */
CanvasTool.PngEncoder.UnitSpecifier = {
  UNKNOWN: 0,
  METRE: 1
};

})();
