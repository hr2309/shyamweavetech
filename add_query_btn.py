import os
import re

html_files = [f for f in os.listdir('.') if f.endswith('.html')]

button_html = '''<a href="contact.html" class="btn btn-gold nav-query-btn" style="padding: 8px 16px; font-size: 0.85rem; margin-right: 8px; font-weight: 600; display: inline-flex; align-items: center; justify-content: center; height: 36px;">Get Query</a>
        <button class="theme-toggle"'''

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # replace 
    if 'nav-query-btn' not in content:
        content = content.replace('<button class="theme-toggle"', button_html)
        
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Added query button in {file}")
