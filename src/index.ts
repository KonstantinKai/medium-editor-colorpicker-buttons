import './styles/color-picker';
import './styles/text-color';

import {getColorPickerFormAbstractClass} from './ColorPickerFormAbstractClass';
import {getTextColorButtonClass} from './TextColorButtonClass';

export const get = (MediumEditor) => {
	const ColorPickerFormAbstractClass = getColorPickerFormAbstractClass(MediumEditor.extensions.form);
	const TextColorButtonClass = getTextColorButtonClass(MediumEditor.extensions.form);

	return {
		ColorPickerFormAbstractClass,
		TextColorButtonClass,
		version
	}
}