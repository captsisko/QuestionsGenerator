(function($) {
 CKEDITOR.plugins.add( 'quizup_plugin', {
  init: function( editor )
  {
	/*editor.addCommand( 'quizup_command', {
	 exec : function( editor ) {
	  //here is where we tell CKEditor what to do.
	  editor.insertHtml( 'This text is inserted when clicking on our new button from the CKEditor toolbar' );
	 }
	});*/

	editor.addCommand( 'quizup_command', new CKEDITOR.dialogCommand( 'quizupDialog',{
		allowedContent: 'quizup[title,id]',
		requiredContent: 'quizup',
	} ) );

	
	editor.ui.addButton( 'quizup_plugin_button', {
	 label: 'Collect and display options data', //this is the tooltip text for the button
	 command: 'quizup_command',
	 icon: this.path + 'images/quizup_plugin_button.png'
	});

	 /****************************************************/
		if ( editor.contextMenu ) {
		  editor.addMenuGroup( 'quizupGroup' );
		  editor.addMenuItem( 'quizup_plugin_button', {
				label: 'Edit Abbreviation',
				icon: this.path + 'images/quizup_plugin_button.png',
				command: 'quizup_command',
				group: 'quizupGroup'
		  });

		  editor.contextMenu.addListener( function( element ) {
			 if ( element.getAscendant( 'quizup', true ) ) {
				  return { abbrItem: CKEDITOR.TRISTATE_OFF };
			 }
		  });
		}
	 /****************************************************/

  } // close init

 });

CKEDITOR.dialog.add( 'quizupDialog', function( editor ) {
	 return {
		  title: 'Quiz Options Properties',
		  minWidth: 300,
		  minHeight: 200,

		  contents: [
				{
					 id: 'tab-basic',
					 label: 'Basic Settings',
					 elements: 
					 [
						{
							type: 'text',
							id: 'option1',
							label: 'Answer',
							validate: CKEDITOR.dialog.validate.notEmpty( "The correct option field cannot be empty." ),
							// Called by the main setupContent method call on dialog initialization.
							setup: function( element ) {
								this.setValue( element.getAttribute( 'option1' ) );
							},

							// Called by the main commitContent method call on dialog confirmation.
							commit: function( element ) {
								element.setAttribute( 'option1', this.getValue() );
							}
						},
						{
							type: 'text',
							id: 'option2',
							label: 'Option#2',
							// Called by the main setupContent method call on dialog initialization.
							setup: function( element ) {
								this.setValue( element.getAttribute( 'option2' ) );
							},

							// Called by the main commitContent method call on dialog confirmation.
							commit: function( element ) {
								element.setAttribute( 'option2', this.getValue() );
							}
						},
						{
							type: 'text',
							id: 'option3',
							label: 'Option#3',
							// Called by the main setupContent method call on dialog initialization.
							setup: function( element ) {
								this.setValue( element.getAttribute( "option3" ) );
							},

							// Called by the main commitContent method call on dialog confirmation.
							commit: function( element ) {
								element.setAttribute( "option3", this.getValue() );
							}
						},
						{
							type: 'text',
							id: 'option4',
							label: 'Option#4',
							// Called by the main setupContent method call on dialog initialization.
							setup: function( element ) {
								this.setValue( element.getAttribute( "option4" ) );
							},

							// Called by the main commitContent method call on dialog confirmation.
							commit: function( element ) {
								element.setAttribute( "option4", this.getValue() );
							}
						},
						{
							type: 'text',
							id: 'option5',
							label: 'Option#5',
							// Called by the main setupContent method call on dialog initialization.
							setup: function( element ) {
								this.setValue( element.getAttribute( "option5" ) );
							},

							// Called by the main commitContent method call on dialog confirmation.
							commit: function( element ) {
								element.setAttribute( "option5", this.getValue() );
							}
						}
				  ]
				}/*,
				{
					 id: 'tab-adv',
					 label: 'Advanced Settings',
					 elements: [
						  // UI elements of the second tab will be defined here.
					 ]
				}*/
		  ],

		  onOk: function() {
				var dialog = this;
				var quizup = editor.document.createElement( 'quizup' );

				/*
					sets the text to be parsed into the question options
				 */
				data = "[{" + dialog.getValueOf( 'tab-basic', 'option1' ) + "}~"
						 	+ dialog.getValueOf( 'tab-basic', 'option2' ) + "~"
						 	+ dialog.getValueOf( 'tab-basic', 'option3' ) + "~"
						 	+ dialog.getValueOf( 'tab-basic', 'option4' ) + "~"
						 	+ dialog.getValueOf( 'tab-basic', 'option5' ) + "]";
	            quizup.setText( data );

	            /*
	            	sets the element attributes used to re-populate the textfields when editting
	             */
			    quizup.setAttribute( 'option1', dialog.getValueOf( 'tab-basic', 'option1' ) );
			    quizup.setAttribute( 'option2', dialog.getValueOf( 'tab-basic', 'option2' ) );
			    quizup.setAttribute( 'option3', dialog.getValueOf( 'tab-basic', 'option3' ) );
			    quizup.setAttribute( 'option4', dialog.getValueOf( 'tab-basic', 'option4' ) );
			    quizup.setAttribute( 'option5', dialog.getValueOf( 'tab-basic', 'option5' ) );
				    
				/*
					inserts the markup into the textarea
				 */
				editor.insertElement( quizup );
		  }, // close onOk

		  onShow: function() {
				var selection = editor.getSelection();
				var element = selection.getStartElement();

				if ( element )
					 element = element.getAscendant( 'quizup', true );

				if ( !element || element.getName() != 'quizup' ) {
					 element = editor.document.createElement( 'quizup' );
					 this.insertMode = true;
				}
				else
					 this.insertMode = false;

				this.element = element;
				if ( !this.insertMode )
					 this.setupContent( this.element );
		  } // close onSow

	 };
});

})(jQuery);