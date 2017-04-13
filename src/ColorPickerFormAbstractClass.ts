import 'flexi-color-picker';

export interface IColorPickerButtonProperties {
	readonly name: string;
	readonly contentDefault: string;
	readonly aria: string;
	readonly action: string;
	readonly tagNames: Array<string>;
	readonly contentFA?: string;
	readonly colors?: Array<string>;
	readonly moreColorText?: string;
	readonly pickerCloseTimeout?: number;
}

export interface IMediumEditorForm<T> {
	new(...args: any[]): T;
}

export interface IForm {
	init(): void;
	hideForm(): void;
	showForm(): void;
}

export const getColorPickerFormAbstractClass = (Form: IMediumEditorForm<IForm>) => {
	abstract class ColorPickerFormAbstractClass extends Form {
		private form: HTMLElement;
		private list: HTMLElement;
		private colorPicker: HTMLElement;

		public name: string;
		public document: HTMLDocument;
		public base: any;

		public on: any;
		public setToolbarPosition: any;
		public isDisplayed: any;
		public hideToolbarDefaultActions: any;
		public getEditorId: any;

		private color: string;
		public pickerCloseTimeout: number = 1000;
		public moreColorText: string = 'More colors...';
		public colors: Array<string> = [
			'#1ABC9C', '#16A085', '#2ECC71', '#27AE60', '#3498DB',
			'#2980B9', '#235596', '#4E5F70', '#2C3E50', '#8E44AD',
			'#9B59B6', '#F1C40F', '#F39C12', '#E67E22', '#D35400',
			'#E74C3C', '#C0392B', '#ECF0F1', '#95A5A6', '#DDDDDD',
			'#FFFFFF', '#BDC3C7', '#7F8C8D', '#999999', '#000000'
		];

		constructor(options) {
			super(options);

			this._processOptions(options || {});
		}

		public init() {
			super.init();

			if (this.name in this.base.options) {
				this._processOptions(this.base.options[this.name]);
			}
		}

		public abstract applyColor(color: string): void;

		private _processOptions (options: IColorPickerButtonProperties): void {
			Object.keys(options).forEach(prop => {
				this[prop] = options[prop];
			});
		}

		private _createForm(): HTMLElement {
			let doc = this.document;
			let form = doc.createElement('div');

			form.className = 'medium-editor-toolbar-form';
			form.id = 'medium-editor-toolbar-form-textcolor-' + this.getEditorId();

			this.list = this._createColorList();
			this.colorPicker = this._createColorPicker()

			form.appendChild(this.list);
			form.appendChild(this.colorPicker);

			return form;
		}

		private _createColorPicker(): HTMLElement {
			let pickerContainer = this.document.createElement('div');

			pickerContainer.className = 'medium-editor-textcolor-color-picker cp-small';

			let timeout;

			(<any>window).ColorPicker(pickerContainer, (hex, hsv, rgb) => {
				clearTimeout(timeout);
				timeout = setTimeout(() => {
					this.base.checkSelection();
				}, this.pickerCloseTimeout);

				this.color = hex;
				this._applyColor(true);
			});

			pickerContainer.style.display = 'none';

			return pickerContainer;
		}

		private _createColorList(): HTMLElement {
			let doc = this.document;
			let list = doc.createElement('ul');

			list.className = 'medium-editor-textcolor-box';

			this.colors.forEach(color => {
				let item = doc.createElement('li');

				item.className = 'medium-editor-textcolor-square';
				item.style.backgroundColor = color;

				list.appendChild(item);

				this.on(item, 'click', (event) => {
					this.color = color;
					this._applyColor();
				});
			});

			let item = doc.createElement('li');
			item.className = 'medium-editor-textcolor-pick-color';
			item.innerText = this.moreColorText;

			list.appendChild(item);

			this.on(item, 'click', (event) => {
				this._showHideColorPicker(true);
			});

			return list;
		}

		private _showHideColorPicker(show: boolean = false): void {
			if (show === true) {
				this.list.style.display = 'none';
				this.colorPicker.style.display = 'block';

				this.base.restoreSelection();
			} else {
				this.list.style.display = 'block';
				this.colorPicker.style.display = 'none';
			}

			this.setToolbarPosition();
		}

		private _applyColor(preventHide: boolean = false): boolean {
			this.base.restoreSelection();
			this.applyColor(this.color);
			return !preventHide && this.base.checkSelection();
		}

		public destroy(): void {
			if (!this.form) return;

			if (this.form.parentNode) this.form.parentNode.removeChild(this.form);

			delete this.form;
			delete this.list;
			delete this.colorPicker;
		}

		public getForm(): HTMLElement {
			return this.form || (this.form = this._createForm());
		};

		public handleClick(event): boolean {
			event.preventDefault();
			event.stopPropagation();

			if (!this.isDisplayed()) {
				this.showForm();
			}

			return false;
		}

		public showForm(): void {
			this.base.saveSelection();
			this.hideToolbarDefaultActions();
			super.showForm();
			this.setToolbarPosition();
		}

		public hideForm(): void {
			super.hideForm();
			this._showHideColorPicker();
		}
	}

	return ColorPickerFormAbstractClass;
}