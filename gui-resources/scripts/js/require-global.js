'use strict';

define(function() {
    // get the running require global object.
    console.log(liveblog.require);
    return liveblog.require ? liveblog.require : require;
});
