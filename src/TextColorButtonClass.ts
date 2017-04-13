import {
	getColorPickerFormAbstractClass,
	IColorPickerButtonProperties,
	IMediumEditorForm,
	IForm
} from './ColorPickerFormAbstractClass';

export const getTextColorButtonClass = (Form: IMediumEditorForm<IForm>) => {
	return class TextColorButtonClass extends getColorPickerFormAbstractClass(Form) implements IColorPickerButtonProperties {
		name = 'textcolor';
		contentDefault = '<b><u>A</u></b>';
		aria = 'text color';
		action = 'text-color';
		tagNames = ['font'];

		public applyColor(color) {
			this.document.execCommand.apply(this.document, this._getCommandArgs(color));
		}

		private _getCommandArgs (color) {
			return ['foreColor', false, color, this.document.queryCommandValue('fontName')];
		}
	}
}