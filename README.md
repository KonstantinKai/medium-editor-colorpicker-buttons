# Extension medium-editor-colorpicker-buttons for MediumEditor

### install:
```sh
npm install medium-editor-colorpicker-buttons
```

### usage:
```js
const MediumEditor = require('medium-editor');
const mediumEditorColorButtons = require('medium-editor-colorpicker-buttons').get(MediumEditor);
/*
	mediumEditorColorButtons: {
		TextColorButtonClass: TextColorButtonClass;
		ColorPickerFormAbstractClass: ColorPickerFormAbstractClass;
		version: string
	}
*/
const TextColorButtonClass = mediumEditorColorButtons.TextColorButtonClass

new MediumEditor('.etitable', {
	toolbar: {
		buttons: ['bold', 'italic', 'underline', 'anchor', 'h2', 'h3', 'textcolor']
	},
	/*textcolor?: {
		colors?: Array<string>;
		moreColorText?: string;
		pickerCloseTimeout?: number;
	},*/
	extensions: {
		textcolor: new TextColorButtonClass(/* options? */)
	}
})
```