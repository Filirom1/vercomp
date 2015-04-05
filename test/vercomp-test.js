var expect = require('chai').expect,
    vercomp = require('..');

describe('split', function(){
  it('keeps numbers together', function(){
    var res = vercomp.split('123')
    expect(res).to.eql([123])
  })

  it('keeps upper and lower case character together', function(){
    var res = vercomp.split('aZeRtYuIoP')
    expect(res).to.eql(['aZeRtYuIoP'])
  })

  it('separate alpha and numeric', function(){
    var res = vercomp.split('ab12cd34ef')
    expect(res).to.eql(['ab',12,'cd',34,'ef'])
  })

  it('separate with dots, underscore and dash', function(){
    var res = vercomp.split('12.34.56-78_90')
    expect(res).to.eql([12,34,56,78,90])
  })

  it('separate with unknown characters', function(){
    var res = vercomp.split('12&$é34}@^56')
    expect(res).to.eql([12,34,56])
  })

  it('keeps ~', function(){
    var res = vercomp.split('12.34~git56')
    expect(res).to.eql([12,34,'~','git',56])
  })
});

describe('vercomp', function(){

  function RPMVERCMP(a,b,expected){
    it("should return " + expected + " when comparing '" + a + "' and '" + b + "'", function(){
      var res = vercomp(a,b);
      expect(res).to.eq(expected);
    })
  }

  RPMVERCMP('1.0', '1.0', 0)
  RPMVERCMP('1.0', '2.0', -1)
  RPMVERCMP('2.0', '1.0', 1)

  RPMVERCMP('2.0.1', '2.0.1', 0)
  RPMVERCMP('2.0', '2.0.1', -1)
  RPMVERCMP('2.0.1', '2.0', 1)

  RPMVERCMP('2.0.1a', '2.0.1a', 0)
  RPMVERCMP('2.0.1a', '2.0.1', 1)
  RPMVERCMP('2.0.1', '2.0.1a', -1)

  RPMVERCMP('5.5p1', '5.5p1', 0)
  RPMVERCMP('5.5p1', '5.5p2', -1)
  RPMVERCMP('5.5p2', '5.5p1', 1)

  RPMVERCMP('5.5p10', '5.5p10', 0)
  RPMVERCMP('5.5p1', '5.5p10', -1)
  RPMVERCMP('5.5p10', '5.5p1', 1)

  RPMVERCMP('10xyz', '10.1xyz', -1)
  RPMVERCMP('10.1xyz', '10xyz', 1)

  RPMVERCMP('xyz10', 'xyz10', 0)
  RPMVERCMP('xyz10', 'xyz10.1', -1)
  RPMVERCMP('xyz10.1', 'xyz10', 1)

  RPMVERCMP('xyz.4', 'xyz.4', 0)
  RPMVERCMP('xyz.4', '8', -1)
  RPMVERCMP('8', 'xyz.4', 1)
  RPMVERCMP('xyz.4', '2', -1)
  RPMVERCMP('2', 'xyz.4', 1)

  RPMVERCMP('5.5p2', '5.6p1', -1)
  RPMVERCMP('5.6p1', '5.5p2', 1)

  RPMVERCMP('5.6p1', '6.5p1', -1)
  RPMVERCMP('6.5p1', '5.6p1', 1)

  RPMVERCMP('6.0.rc1', '6.0', 1)
  RPMVERCMP('6.0', '6.0.rc1', -1)

  RPMVERCMP('10b2', '10a1', 1)
  RPMVERCMP('10a2', '10b2', -1)

  RPMVERCMP('1.0aa', '1.0aa', 0)
  RPMVERCMP('1.0a', '1.0aa', -1)
  RPMVERCMP('1.0aa', '1.0a', 1)

  RPMVERCMP('10.0001', '10.0001', 0)
  RPMVERCMP('10.0001', '10.1', 0)
  RPMVERCMP('10.1', '10.0001', 0)
  RPMVERCMP('10.0001', '10.0039', -1)
  RPMVERCMP('10.0039', '10.0001', 1)

  RPMVERCMP('4.999.9', '5.0', -1)
  RPMVERCMP('5.0', '4.999.9', 1)

  RPMVERCMP('20101121', '20101121', 0)
  RPMVERCMP('20101121', '20101122', -1)
  RPMVERCMP('20101122', '20101121', 1)

  RPMVERCMP('2_0', '2_0', 0)
  RPMVERCMP('2.0', '2_0', 0)
  RPMVERCMP('2_0', '2.0', 0)

  RPMVERCMP('a', 'a', 0)
  RPMVERCMP('a+', 'a+', 0)
  RPMVERCMP('a+', 'a_', 0)
  RPMVERCMP('a_', 'a+', 0)
  RPMVERCMP('+a', '+a', 0)
  RPMVERCMP('+a', '_a', 0)
  RPMVERCMP('_a', '+a', 0)
  RPMVERCMP('+_', '+_', 0)
  RPMVERCMP('_+', '+_', 0)
  RPMVERCMP('_+', '_+', 0)
  RPMVERCMP('+', '_', 0)
  RPMVERCMP('_', '+', 0)

  RPMVERCMP('1.0~rc1', '1.0~rc1', 0)
  RPMVERCMP('1.0~rc1', '1.0', -1)
  RPMVERCMP('1.0', '1.0~rc1', 1)
  RPMVERCMP('1.0~rc1', '1.0~rc2', -1)
  RPMVERCMP('1.0~rc2', '1.0~rc1', 1)
  RPMVERCMP('1.0~rc1~git123', '1.0~rc1~git123', 0)
  RPMVERCMP('1.0~rc1~git123', '1.0~rc1', -1)
  RPMVERCMP('1.0~rc1', '1.0~rc1~git123', 1)
});
