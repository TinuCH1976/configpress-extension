/**
 * ======================================================================
 * LICENSE: This file is subject to the terms and conditions defined in *
 * file 'license.txt', which is part of this source code package.       *
 * ======================================================================
 */

(function ($) {
    
    var editor = null;
    
    $(document).ready(function () {
        aam.addHook('menu-feature-click', function(feature) {
            if (feature === 'configpress' && editor === null) {
                editor = CodeMirror.fromTextArea(
                    document.getElementById("configpress-editor"), {}
                );
        
                editor.on("blur", function(){
                    $.ajax(aamLocal.ajaxurl, {
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            action: 'aam',
                            sub_action: 'ConfigPress.save',
                            _ajax_nonce: aamLocal.nonce,
                            config: editor.getValue()
                        },
                        error: function () {
                            aam.notification('danger', aam.__('Application error'));
                        }
                    });
                });
            } 
        });
    });

})(jQuery);