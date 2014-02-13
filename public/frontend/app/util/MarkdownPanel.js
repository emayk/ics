//Ext.define('Ext.ux.form.field.Markdown', {
Ext.define('App.util.MarkdownPanel', {
	alias: [
		'widget.markdownfield', 'widget.markdownformfield',
		'widget.markdownField', 'widget.markdownFormField',
		'widget.MarkdownField', 'widget.MarkdownFormField'
	],
	extend: 'Ext.ux.form.ExtendedFieldContainer',
	requires: ['Ext.ux.markdown.Panel'],
	mixins: {
		isready: 'Ext.ux.util.IsReady'
	},
	markdownConfigs: [
		'controlTags',
		'inputValue',
		'stylesPath',
		'outputValue'
	],
	textareaConfigs: [
		'grow',
		'growAppend',
		'growMax',
		'growMin',
		'allowBlank'
	],
	_editor: null,
	initComponent: function() {
		var field = this;
		field.callParent();
		field.addEvents(
			/**
			 * @event editorready
			 */
			'editorready'
		);
		// Init mixins (make isready obsolete!)
		field.initIsReady();
		field.on({
			'beforerender': {
				fn: function() {
					var editorConfig,
						initialConfig,
						initialValue,
						markdownConfigs,
						textareaConfigs;

					markdownConfigs = field.markdownConfigs;
					textareaConfigs = field.textareaConfigs;
					initialConfig = field.initialConfig;
					initialValue = initialConfig.value;
					editorConfig = {
						xtype: 'markdownpanel',
						name: 'editor',
						textarea: {
							isFormField: false
						},
						listeners: {
							'isready': {
								fn: function(editor) {
									var textarea = editor.getTextarea();
									field.applyComponentBind(textarea);
									field.fireEvent('editorready', field, editor);
									field.setReady();
								}
							}
						}
					};
					if ( initialValue ) {
						editorConfig.value = initialValue;
					}
					Ext.Array.forEach(markdownConfigs, function(property) {
						var value = initialConfig[property];
						if ( typeof value !== 'undefined' )
							editorConfig[property] = value;
					});
					Ext.Array.forEach(textareaConfigs, function(property) {
						var value = initialConfig[property];
						if ( typeof value !== 'undefined' )
							editorConfig.textarea[property] = value;
					});
					field._editor = field.add(editorConfig);
				},
				single: true
			}
		});
		return field;
	},
	getEditor: function() {
		return this._editor;
	},
	getValue: function(output) {
		var field = this,
			editor = field.getEditor(),
			value;
		if ( editor ) {
			value = editor.getValue(output||'markdown');
		}
		else {
			value = field.superclass.getValue.call(field);
		}
		return value;
	},
	getSubmitValue: function() {
		return this.getValue();
	},
	resetOriginalValue: function() {
		var field = this,
			editor = field.getEditor();
		if ( editor && editor.getTextarea() ) {
			editor.getTextarea().resetOriginalValue();
		}
		else {

			field.on({
				'editorready': {
					fn: function(self, editor) {
						if ( editor.getTextarea() ) {
							editor.getTextarea().resetOriginalValue();
						}
					}
				}
			});
		}
		return field.superclass.resetOriginalValue.call(field);
	},
	setValue: function(value) {
		var field = this,
			editor = field.getEditor();
		if ( editor ) {

			editor.setValue(value);
		}
		return field.superclass.setValue.call(field, value);
	}
});