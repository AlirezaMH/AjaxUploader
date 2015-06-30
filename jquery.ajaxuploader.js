/*
 * AjaxUploader - jQuery Plugin
 * An ajax uploader with progress event
 *
 * Github: https://github.com/amahmoodi
 * 
 * Copyright (c) 2015 Alireza Mahmoodi
 * 
 * Version: 1.0 (06/29/2015)
 * Requires: jQuery v1.3+
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
(function($){
    var _OID = 0;
    var _ID ;
    var _defines = new Object();
    
    var _public = {
        init : function(options){
            _ID = 'wfs_id_' + (++_OID);
            _defines[_ID] = $.extend({
                url: '',
                // type: 'POST',
                dataType: 'json',
                data: {},
                
                /**
                 * Callbacks
                 */
                success: function(){},
                error : function(){},
                complete : function(){},
                progress : function(){},
                load : function(){}
            },options);
            
            _private.upload(this);

            return this;
        }

    };

    var _private = {

        upload : function(fe){
            var file = fe[0].files[0];
            var fieldName = fe.attr('name');
            var xhr = new XMLHttpRequest();
            // xhr.addEventListener('progress', function(e) {
            //     var done = e.position || e.loaded, total = e.totalSize || e.total;
            //     // _defines[_ID].progress({done: done, total: total, percent: (Math.floor(done/total*1000)/10)});
            //     // console.log('xhr progress: ' + (Math.floor(done/total*1000)/10) + '%');
            // }, false);
            if ( xhr.upload ) {
                xhr.upload.onprogress = function(e) {
                    var done = e.position || e.loaded, total = e.totalSize || e.total;
                    _defines[_ID].progress({done: done, total: total, percent: (Math.floor(done/total*1000)/10)});
                    // console.log('xhr.upload progress: ' + (Math.floor(done/total*1000)/10) + '%');
                };
            }
            xhr.onreadystatechange = function(e) {
                if (this.readyState == 4) {
                    if(this.status == 200){
                        switch(_defines[_ID].dataType.toLowerCase()){
                            case 'json':
                                _defines[_ID].success(_private.jsonToObj(this.responseText), this);
                                break;
                            case 'xml':
                                _defines[_ID].success(this.responseXML, this);
                                break;
                            case 'text':
                                _defines[_ID].success(this.responseText, this);
                                break;
                            default:
                                _defines[_ID].success(this.response, this);
                                break;
                        }
                        
                    }else{//error
                        _defines[_ID].error(this);

                    }

                    _defines[_ID].complete(this);
                }
            };

            xhr.open('post', _defines[_ID].url, true);
            var fd = new FormData;
            fd.append(fieldName, file);
            $.each(_defines[_ID].data, function(i, v){
                fd.append(i, v);
            });
            
            _defines[_ID].load(file, xhr);
            xhr.send(fd);
        },

        jsonToObj: function(data){
            eval("data = " + data);
            return data;
        }
    }

    $.fn.ajaxUploader = function(method){

        if ( _public[method] ) {
            return _public[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return _public.init.apply( this, arguments );
            // return this;
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.mediaService' );
            return false;
        } 
    }


})(jQuery);
