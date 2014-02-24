'use strict';
define(['dustjs-linkedin', 'core/utils/twitter'], function(dust, twitter){
    // TODO: Remove filters from here once dust-helpers are integrated
    String.prototype.trunc = function(n,useWordBoundary){
        var toLong = this.length>n,
            s_ = toLong ? this.substr(0,n-1) : this;
        s_ = useWordBoundary && toLong ? s_.substr(0,s_.lastIndexOf(' ')) : s_;
        return  toLong ? s_ + '...' : s_;
     };

    // TODO: Remove filters from here once dust-helpers are integrated
    dust.filters.t = function(string){ return $('<div>'+string+'</div>').text(); }
    dust.filters.trim50 = function(string){ return string.trunc(50, true);}
    dust.filters.trim150 = function(string){ return string.trunc(150, true);}
    dust.filters.trim200 = function(string){ return string.trunc(200, true);}
    dust.filters.twitter_all = function(string) { return twitter.link.all(string); }

    function getAnnotation(idx)
    {
        return function(content)
        {
            try
            {
                var content = JSON.parse(content);
                return content.annotation[idx];
            }
            catch(e){}
            return '';
        };
    }
    dust.filters.twitter_annotation_before = getAnnotation(0);
    dust.filters.twitter_annotation_after = getAnnotation(1);
    return dust;
});
