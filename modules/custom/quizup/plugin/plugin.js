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
      requiredContent: 'quizup',
   } ) );

   
   editor.ui.addButton( 'quizup_plugin_button', {
    label: 'Collect and display options data', //this is the tooltip text for the button
    command: 'quizup_command',
    icon: this.path + 'images/quizup_plugin_button.png'
   });
  // }

    /****************************************************/
      if ( editor.contextMenu ) {
        editor.addMenuGroup( 'abbrGroup' );
        // editor.addMenuItem( 'abbrItem', {
        editor.addMenuItem( 'quizup_plugin_button', {
            label: 'Edit Abbreviation',
            icon: this.path + 'images/quizup_plugin_button.png',
            command: 'quizup_command',
            group: 'abbrGroup'
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
                      id: 'answer',
                      label: 'Answer',
                      validate: CKEDITOR.dialog.validate.notEmpty( "The correct option field cannot be empty." )
                  },
                  {
                      type: 'text',
                      id: 'option1',
                      label: 'Option#1',
                  },
                  {
                      type: 'text',
                      id: 'option2',
                      label: 'Option#2',
                  },
                  {
                      type: 'text',
                      id: 'option3',
                      label: 'Option#3',
                  },
                  {
                      type: 'text',
                      id: 'option4',
                      label: 'Option#4',
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
              // Create a new <abbr> element.
            var quizup = this.element;
            // var quizup = editor.document.createElement( 'quizup' );

            quizup.setAttribute( 'answer', dialog.getValueOf( 'tab-basic', 'answer' ) );
            quizup.setText( dialog.getValueOf( 'tab-basic', 'answer' ) );
            // this.commitContent(quizup);

            // if( this.insertMode )
            //   editor.insertElement( quizup );

            /*
              var dialog = this;

              // Create a new <abbr> element.
              var abbr = this.element;

              // Invoke the commit methods of all dialog window elements, so the <abbr> element gets modified.
              this.commitContent( abbr );

              // Finally, if in insert mode, insert the element into the editor at the caret position.
              if ( this.insertMode )
                editor.insertElement( abbr );
             */
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