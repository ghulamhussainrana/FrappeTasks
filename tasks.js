// Copyright (c) 2023, hafiz and contributors
// For license information, please see license.txt

// Tasks 1-4 (3/7/2023 - 5/7/2023)
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

		// query to filter supplier based on supplier group
		frm.set_query('query_supplier', function() {	
			return {
				filters: {
					supplier_group: 'Local'
				}
			}
		}
		);

		// Query method to filter supplier based on supplier group
		frm.set_query('query_method_supplier', function() {	
			return {
				query: 'hafiz_app.programming_module.doctype.tasks.tasks.custom_query_method',
				filters: {
					supplier_group: 'Based on Search'
				}
			}
		}
		);
	},



// Tasks 1-4 (5/7/2023 - 7/7/2023)
	// Hide and unhide fields based on checkbox
	// and making fields mandatory based on checkbox
	onload: function(frm) {
		frm.toggle_display(['phone','query_method_supplier'], false);
	},
	enable: function(frm) {
        // Check the condition and hide/unhide fields accordingly
        if (frm.doc.enable) {
            frm.toggle_display(['phone','query_method_supplier'], true);  // Show fields
			frm.toggle_reqd('name1', true);
            // frm.toggle_display('dob', false); // Hide fields
        }
		else {
			frm.toggle_display(['phone','query_method_supplier'], false);  // Hide fields 
			frm.toggle_reqd('name1', false);
			// frm.toggle_display('phone', false); // Hide fields
			// frm.toggle_display('dob', true);  // Show fields
		}
		
		// if (frm.doc.enable) {
        //     frm.toggle_display(['phone', 'dob'], true); 
        //     frm.toggle_display(['query_supplier', 'query_method_supplier'], false);
        // } else {
		// 	frm.toggle_display(['phone', 'dob'], false); 
        //     frm.toggle_display(['query_supplier', 'query_method_supplier'], true);
        // }
    },

	query_supplier: function(frm) {
        var link_value = frm.doc.query_supplier;

        if (link_value) {
            // Make an AJAX request to fetch data from the Python function
            frappe.call({
                method: 'hafiz_app.programming_module.doctype.tasks.tasks.load_data_from_linked_doctype',
                args: {
                    doctype: 'Supplier',
                    docname: link_value
                },
                callback: function(response) {
                    var data = response.message;
                    // Populate the fields in the current form with the returned data
                    if (data) {
                        frm.set_value('supplier_type_link', data.type);
                    }
                }
            });
        }
		else{
			frm.set_value('supplier_type_link', '');
		}
    },

	validate: function(frm) {
		console.log("Hello This is 'Validate Event'")
	},
	// before_save: function(frm) {
	// 	console.log("Hello This is 'Before Save Event'")
	// },
	// after_save: function(frm) {
	// 	console.log("Hello This is 'After Save Event'")
	// },
	// before_submit: function(frm) {
	// 	console.log("Hello This is 'Before Submit Event'")
	// }
	// on_submit: function(frm) {
	// 	console.log("Hello This is 'On Submit Event'")
	// }
	// before_cancel: function(frm) {
	// 	console.log("Hello This is 'Before Cancel Event'")
	// },
	// after_cancel: function(frm){
	// 	console.log("Hello This is 'After Cancel Event'")
	// }
});
