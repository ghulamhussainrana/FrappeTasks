# Copyright (c) 2023, hafiz and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class Tasks(Document):
	pass
# Tasks 1-4 (3/7/2023 - 5/7/2023)
@frappe.whitelist()
def custom_query_method(doctype, txt, searchfield, start, page_len, filters):
	query = """
        SELECT `tabSupplier`.name, `tabSupplier`.supplier_name
        FROM `tabSupplier`
        WHERE `tabSupplier`.supplier_name LIKE %(txt)s
    """
	result = frappe.db.sql(query, {'txt': '%' + txt + '%'}, as_dict=False)
	return result
    # frappe.msgprint(f"Supplier name")
    # return frappe.db.sql('''SELECT name FROM `tabSupplier` WHERE supplier_group LIKE %(txt)s''', {'txt': '%%%s%%' % txt})
    # return frappe.db.sql('''SELECT name FROM `tabSupplier` WHERE supplier_group = 'Distributor' ''')

# def get_supplier(self):
# 	frappe.msgprint(f"Supplier name")




# Tasks 1-4 (5/7/2023 - 7/7/2023)

@frappe.whitelist()
def load_data_from_linked_doctype(doctype, docname):
    linked_doc = frappe.get_doc(doctype, docname)
    
    # Access the fields from the linked document and return them as a dictionary
    if linked_doc:
        data = {
            'type': linked_doc.supplier_type
        }
        return data
    else:
        return {}
