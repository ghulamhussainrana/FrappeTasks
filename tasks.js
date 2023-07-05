// Copyright (c) 2023, hafiz and contributors
// For license information, please see license.txt

frappe.ui.form.on('Tasks', {
	refresh: function(frm) {

		// Add custom button to show report
		frm.add_custom_button(__('Show Report'), function() {
			frappe.set_route('query-report', 'Gross Profit');
		});

		// Add custom button to show popup and change values in fields
		frm.add_custom_button(__('Popup To Change values in form'), function() {
			frappe.prompt([
				{
					fieldtype: 'Data',
					fieldname: 'popup_name',
					label: 'Name',
					// reqd: 1
				},
				{
					fieldtype: 'Date',
					fieldname: 'popup_date',
					label: 'DOB',
					// reqd: 1
				}
			], function(values) {
				// Update fields in the main form
				if (values.popup_name)
					frm.set_value('name1', values.popup_name);
				if (values.popup_date)
					frm.set_value('dob', values.popup_date);
			}, 'Popup to change values in fields');
		});
		frm.set_query('query_supplier', function() {	
			return {
				filters: {
					supplier_group: 'Local'
				}
			}
		}
		);

		frm.set_query('query_method_supplier', function() {	
			return {
				query: 'hafiz_app.programming_module.doctype.tasks.tasks.custom_query_method',
				filters: {
					// supplier_group: 'Local'
				}
			}
		}
		);

	}
});
