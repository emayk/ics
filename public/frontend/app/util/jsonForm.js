/**
 * @class Ext.ux.form.JsonForm
 * Extends the regular {@link Ext.form.Panel form(panel)} in regards to how values can be gotten.
 * The courtesy method "getValues" of the {@link Ext.form.Panel form(panel)} itself is overwritten, where as the {@link Ext.form.Basic form}
 * of the {@link Ext.form.Panel form(panel)} is untouched.
 * The getValues method delivers a JSON like object structure of all underlying forms and or other components that has
 * a getValues method as well as, all deep nested "form orphan" fields flat in the root of the returned object.
 * When looking for underlying forms and other elements with getValues method, this component does not look further into that
 * found component, but relies on its delivered content.
 * @extends Ext.form.Panel
 *
 */
Ext.define('App.util.jsonForm', {
//Ext.define('Ext.ux.form.JsonForm', {
	extend: 'Ext.form.Panel',
	alias: ['widget.jsonform', 'widget.jsonForm', 'widget.JsonForm'],
	initComponent: function () {
		var me = this;

		me.callParent(arguments);
//		me.initConfig()
		me.initConfig(this.initialConfig);
		return me;
	},
	/**
	 * @method buildChildrenArrays
	 * @private
	 */
	buildChildrenArrays: function (component, arrays) {
		arrays || ( arrays = {
			fields: [],
			forms: []
		});
		var form = this,
			doItems = ( component.items && component.items.each ),
			doDocked = ( component.dockedItems && component.dockedItems.each );
		// Does this component have a items mixedcollection?
		if (doItems) {
			form.buildChildrenIterator(component, component.items, arrays);
		}
		// Does this component have a dockedItems mixedcollection?
		else if (doDocked) {
			form.buildChildrenIterator(component, component.dockedItems, arrays);
		}
		return arrays;
	},
	/**
	 * @method buildChildrenIterator
	 * @private
	 */
	buildChildrenIterator: function (component, collection, arrays) {
		var form = this;
		collection.each(function (item) {
			// Check if item is a form field and add to fields array
			if (item.isFormField) {
				arrays.fields.push(item);
			}
			// Item is something else, examine in depth for getValues method
			else {
				// Item has a getValues method
				// Add item to the forms array and break out of this branch iteration
				if (item.getValues && typeof item.getValues === 'function') {
					arrays.forms.push(item);
				}
				// Maybe item has a getForm method?
				// Get form and add it to the forms array and break out
				else if (item.getForm && typeof item.getForm === 'function') {
					arrays.forms.push(item);
				}
				// Neither was true - keep on iterating down
				else {
					form.buildChildrenArrays(item, arrays);
				}
			}
		});
	},
	/**
	 * @method getChildrenArrayValues
	 * @private
	 * @return {Object} values
	 */
	getChildrenArrayValues: function (arrays, dirtyOnly, includeEmptyText, useDataValues) {
		arrays || ( arrays = {
			fields: [],
			forms: []
		});
		var fields = arrays.fields,
			forms = arrays.forms,
			values = {},
			isArray = Ext.isArray,
			data, val, bucket, name,
			i = 0;
		// Iterate over fields and add to root value object
		for (; i < fields.length; i++) {

			var field = fields[i];
			// Add option of forcing the field to be dirty via dirty property
			var forceDirty = field.dirty,
				isDirty = forceDirty === true ? forceDirty : field.isDirty();
			// Borrowed from the getValues method of Ext.form.Basic
			if (!dirtyOnly || isDirty) {

				data = field[useDataValues ? 'getModelData' : 'getSubmitData'](includeEmptyText);
				if (Ext.isObject(data)) {

					for (name in data) {

						if (data.hasOwnProperty(name)) {

							val = data[name];
							if (includeEmptyText && val === '') {
								val = field.emptyText || '';
							}
							if (values.hasOwnProperty(name)) {
								bucket = values[name];
								if (!isArray(bucket)) {
									bucket = values[name] = [bucket];
								}
								if (isArray(val)) {
									values[name] = values[name] = bucket.concat(val);
								}
								else {
									bucket.push(val);
								}
							}
							else {
								values[name] = val;
							}
						}
					}
				}
			}
		}
		// Iterate over forms and add value from each forms own getValues method and add to values
		for (i = 0; i < forms.length; i++) {
			var form = forms[i],
				formIsDirty = form.getForm().isDirty();
			// Send along arguments from own getValues call, apart from asString since we want
			// to control that in the end
			if (!dirtyOnly || formIsDirty) {
				values[form.name] = form.getValues(false, dirtyOnly, includeEmptyText, useDataValues);
			}
		}
		return values;
	},
	/**
	 * @method getValues
	 * Overwritten courtesy method that generates the tree structured value object
	 * @param {Boolean} [asString=false] If true, will return the key/value collection as a single
	 * URL-encoded param string.
	 * @param {Boolean} [dirtyOnly=false] If true, only fields that are dirty will be included in the result.
	 * @param {Boolean} [includeEmptyText=false]] If true, the configured emptyText of empty fields will be used.
	 * @return {String/Object}
	 */
	getValues: function (asString, dirtyOnly, includeEmptyText, useDataValues) {
		var form = this,
			arrays,
			values;
		// Build the fields and forms arrays object
		arrays = form.buildChildrenArrays(form);
		// Build the values object
		values = form.getChildrenArrayValues(arrays, dirtyOnly, includeEmptyText, useDataValues);
		// User asked for a query string - give it to him/her
		if (asString) {
			values = JSON.stringify(values);
		}
		return values;
	},
	setChildrenArrayValues: function (arrays, values) {
		var field,
			form,
			i = 0;
		// Iterate the fields
		// TODO: I have a problem here in regards to shared names and array type values!!
		for (; i < arrays.fields.length; i++) {
			field = arrays.fields[i];
			field.setValue(values[field.name]);
		}
		// Iterate the "forms"
		// TODO: Have the same problem still ofc as mention above for fields
		for (i = 0; arrays.forms.length; i++) {
			form = arrays.forms[i];
			form.setValues(values[form.name]);
		}
		return this;
	},
	setValues: function (values) {
		var form = this,
			arrays;
		arrays = form.buildChildrenArrays(form);
		form.setChildrenArrayValues(arrays, values);
		return form;
	}
});