# vercomp
Version Comparison in JavaScript

Inspired by <https://fedoraproject.org/wiki/Archive:Tools/RPM/VersionComparison>

## Usage

    var vercomp = require('vercomp')
    vercomp('1.0.0', '1.0.1') # return -1
    vercomp('10b2', '10a1')   # return 1
    vercomp('1', '1')         # return 0

# LICENSE MIT
