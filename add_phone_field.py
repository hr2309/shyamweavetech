import os, glob, re

html_files = glob.glob('*.html')
insertion = """
        <div class="form-group">
          <label class="form-label" for="email-modal-phone">Contact Number</label>
          <input type="tel" class="form-control" id="email-modal-phone" placeholder="+91 XXXXX XXXXX" required>
        </div>"""

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    pattern = r'(<input[^>]*id="email-modal-email"[^>]*>\s*</div>)'
    
    if re.search(pattern, content):
        new_content = re.sub(pattern, r'\g<1>' + insertion, content)
        with open(file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f'Updated {file}')
    else:
        print(f'Pattern not found in {file}')
