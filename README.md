# vercomp [![Build Status](https://travis-ci.org/Filirom1/vercomp.svg)](https://travis-ci.org/Filirom1/vercomp)
Version Comparison in JavaScript

Inspired by <https://fedoraproject.org/wiki/Archive:Tools/RPM/VersionComparison>

## Usage

    var vercomp = require('vercomp')
    vercomp('1.0.0', '1.0.1') # return -1
    vercomp('10b2', '10a1')   # return 1
    vercomp('1', '1')         # return 0

# Warning

Release are not condisidered in this algorythm.
For example:

    vercomp('6.0.rc1', '6.0') # return 1

If you care about the meaning of releases, check <https://github.com/Filirom1/smart-vercomp>

# LICENSE MIT
