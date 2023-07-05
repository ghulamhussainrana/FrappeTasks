# Copyright (c) 2023, hafiz and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class Tasks(Document):
	pass

@frappe.whitelist()
def custom_query_method(doctype, txt, searchfield, start, page_len, filters):
        # frappe.msgprint(f"Supplier name")
	    return frappe.db.sql('''SELECT name FROM `tabSupplier` WHERE supplier_group = 'Distributor' ''')
    # return frappe.db.sql('''SELECT name FROM `tabSupplier` WHERE supplier_group LIKE %(txt)s''', {'txt': '%%%s%%' % txt})

# def get_supplier(self):
# 	frappe.msgprint(f"Supplier name")
