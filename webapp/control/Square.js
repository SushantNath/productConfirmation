
  
  sap.ui.define([
	"sap/ui/core/Control",
		"sap/m/Button"

], function (Control,Button) {
	"use strict";
	return Control.extend("ZRTC.ZPROD_CONF.control.Square", {

   metadata : {
          properties : {           // setter and getter are created behind the scenes, 
                                   // incl. data binding and type validation
              "text" : "string",   // in simple cases, just define the type
              "size" : {type: "sap.ui.core.CSSSize", defaultValue: "200px"} 
                                   // you can also give a default value and more
          },
          	aggregations : {
				_rating : {type : "sap.m.RatingIndicator", multiple: false, visibility : "hidden"},
				_label : {type : "sap.m.Label", multiple: false, visibility : "hidden"},
				_button : {type : "sap.m.Button", multiple: false}
			}
      },
      

      // the part creating the HTML:
      renderer : function(oRm, oControl) { // static function, so use the given "oControl" instance 
                                           // instead of "this" in the renderer function

          oRm.write("<div"); 
          oRm.writeControlData(oControl);  // writes the Control ID and enables event handling - important!
          oRm.addStyle("width", oControl.getSize());  // write the Control property size; the Control has validated it 
                                                      // to be a CSS size
          oRm.addStyle("height", oControl.getSize());
          oRm.writeStyles();
          oRm.addClass("mySquare");        // add a CSS class for styles common to all Control instances
          oRm.writeClasses();              // this call writes the above class plus enables support 
                                           // for Square.addStyleClass(...)

          oRm.write(">");
          oRm.writeEscaped(oControl.getText()); // write another Control property, with protection 
                                                // against cross-site-scripting
          oRm.write("</div>");
      },
		init : function () {
			
			this.setAggregation("_button", new Button({
				text: "{i18n>productRatingButton}"
			
			}));
		
		},
	_onSubmit: function(){},
	
	 // an event handler:
      onclick : function(evt) {   // is called when the Control's area is clicked - no event registration required
          alert("Control clicked! Text of the Control is:\n" + this.getText());
      }	
	
       
		
	
	});
});
