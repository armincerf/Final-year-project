(function () {
	"use strict";
        
    module.exports.pageContainer = "#page";
    
    module.exports.editableItems = {
            'h1': ['color', 'font-size', 'text-align', 'font-family', 'font-style', 'font-weight', 'text-transform'],
            'h2': ['color', 'font-size', 'text-align', 'font-family', 'font-style', 'font-weight', 'text-transform'],
            'h3': ['color', 'font-size', 'text-align', 'font-family', 'font-style', 'font-weight', 'text-transform'],
            'h4': ['color', 'font-size', 'text-align', 'font-family', 'font-style', 'font-weight', 'text-transform'],
            'h5': ['color', 'font-size', 'text-align', 'font-family', 'font-style', 'font-weight', 'text-transform'],
            'p': ['color', 'font-size', 'text-align', 'font-family', 'font-style', 'font-weight'],
            '.text':['color', 'font-size', 'text-align', 'font-family', 'font-style', 'font-weight'],
            'ul.text-list':['color', 'font-size', 'text-align', 'font-family', 'font-style', 'font-weight'],
            '.text-advanced':['color', 'background-color', 'font-size', 'text-align', 'font-family', 'font-style', 'font-weight', 'border-color', 'border-radius'],
            'img':['width','height', 'margin', 'padding', 'border-color', 'border-width', 'border-style', 'border-radius'],
            'svg':['width','height', 'margin', 'padding'],
            'span.fa, i.fa': ['color', 'font-size'],
            '.icon-advanced':['color', 'font-size', 'background-color'],
            '.icon-border':['color', 'font-size', 'padding-top', 'border-color'],
            '.link':['color', 'font-size', 'font-family', 'font-style', 'font-weight', 'text-decoration', 'border-bottom-color', 'border-bottom-width'],
            '.edit-link':['color', 'font-size', 'font-family', 'font-style', 'font-weight', 'text-decoration', 'border-bottom-color', 'border-bottom-width'],
            '.edit-tags':['color', 'font-size', 'font-family', 'font-style', 'font-weight', 'background-color', 'border-color', 'border-width', 'border-style'],
            'a.btn, button.btn':[ 'color', 'font-size', 'background-color', 'border-radius'],
            '.progress-style':['background-color', 'border-color', 'border-radius'],
            '.progress-inner-style':['width', 'background-color', 'border-radius'],
            '.progress-inner-advanced':['width', 'color', 'background-color', 'background-image', 'font-size', 'text-align', 'font-family', 'font-style', 'font-weight', 'line-height', 'border-radius'],
            '.color':['color', 'background-color', 'border-color'],
            '.just-color':['color'],
            '.help-color':['background-color', 'border-color'],
            '.help-color-advanced': ['background-color', 'border-color', 'border-radius'],
            '.bg':['background-image', 'background-color', 'background-size', 'background-position', 'background-repeat'],
            '.bg-color':['background-color'],
            '.bg-image':['background-image', 'background-size', 'background-position', 'background-repeat'],
            '.border':['border-color', 'border-width', 'border-style'],
            '.devider-edit, .devider-brand': ['height', 'background-color', 'border-color', 'border-top-width', 'border-bottom-width', 'border-style'],
            'nav a':['color', 'font-weight', 'text-transform'],
            'a.edit':['color', 'font-weight', 'text-transform'],
            '.footer a':['color'],
            //'.bg.bg1, .bg.bg2, .header10, .header11': ['background-image', 'background-color'],
            '.frameCover': []
    };
    
    module.exports.editableItemOptions = {
            'nav a : font-weight': ['400', '700'],
            'a.btn : border-radius': ['0px', '4px', '10px'],
            'img : border-style': ['none', 'dotted', 'dashed', 'solid'],
            'h1 : text-align': ['left', 'right', 'center', 'justify'],
            'h1 : font-weight': ['normal', 'bold'],
            'h1 : font-style': ['normal', 'italic'],
            'h1 : text-transform': ['none', 'uppercase', 'lowercase', 'capitalize'],
            'h2 : text-align': ['left', 'right', 'center', 'justify'],
            'h2 : font-weight': ['normal', 'bold'],
            'h2 : font-style': ['normal', 'italic'],
            'h2 : text-transform': ['none', 'uppercase', 'lowercase', 'capitalize'],
            'h3 : text-align': ['left', 'right', 'center', 'justify'],
            'h3 : font-weight': ['normal', 'bold'],
            'h3 : font-style': ['normal', 'italic'],
            'h3 : text-transform': ['none', 'uppercase', 'lowercase', 'capitalize'],
            'h4 : text-align': ['left', 'right', 'center', 'justify'],
            'h4 : font-weight': ['normal', 'bold'],
            'h4 : font-style': ['normal', 'italic'],
            'h4 : text-transform': ['none', 'uppercase', 'lowercase', 'capitalize'],
            'h5 : text-align': ['left', 'right', 'center', 'justify'],
            'h5 : font-weight': ['normal', 'bold'],
            'h5 : font-style': ['normal', 'italic'],
            'h5 : text-transform': ['none', 'uppercase', 'lowercase', 'capitalize'],
            'p : text-align': ['left', 'right', 'center', 'justify'],
            'p : font-weight': ['normal', 'bold'],
            'p : font-style': ['normal', 'italic'],
            '.text : text-align': ['left', 'right', 'center', 'justify'],
            '.text : font-weight': ['normal', 'bold'],
            '.text : font-style': ['normal', 'italic'],
            '.text-advanced : text-align': ['left', 'right', 'center', 'justify'],
            '.text-advanced : font-weight': ['normal', 'bold'],
            '.text-advanced : font-style': ['normal', 'italic'],
            'ul.text-list : text-align': ['left', 'right', 'center', 'justify'],
            'ul.text-list : font-weight': ['normal', 'bold'],
            'ul.text-list : font-style': ['normal', 'italic'],
            '.link : font-weight': ['normal', 'bold'],
            '.link : font-style': ['normal', 'italic'],
            '.edit-link : font-weight': ['normal', 'bold'],
            '.edit-link : font-style': ['normal', 'italic'],
            '.edit-tags : font-weight': ['normal', 'bold'],
            '.edit-tags : font-style': ['normal', 'italic'],
            'nav a : text-transform': ['none', 'uppercase', 'lowercase', 'capitalize']
    };

    module.exports.editableContent = ['.editContent', '.navbar a', 'button', 'a.btn', '.footer a:not(.fa)', '.tableWrapper', 'h1'];

    module.exports.autoSaveTimeout = 60000;
    
    module.exports.sourceCodeEditSyntaxDelay = 10000;
                    
}());