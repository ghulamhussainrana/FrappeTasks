# Copyright (c) 2023, hafiz and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class Tasks(Document):
	pass

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
