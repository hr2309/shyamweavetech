import glob
import re

new_wa_general_modal = """  <!-- ══════════════════ GENERAL WHATSAPP MODAL ══════════════════ -->
  <div id="wa-general-modal-overlay" class="wa-modal-overlay" aria-hidden="true">
    <div class="wa-modal-box" role="dialog" aria-modal="true" aria-labelledby="wa-general-modal-title">
      <button id="wa-general-modal-close" class="wa-modal-close" aria-label="Close modal">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      <h2 id="wa-general-modal-title" style="color:var(--text-primary);">WhatsApp Us</h2>
      <p class="wa-modal-subtitle">Please provide a few details so we can assist you better.</p>

      <form id="wa-general-modal-form">
        <div class="form-group">
          <label class="form-label" for="wa-general-modal-purpose">Purpose of Contact</label>
          <div class="select-wrapper">
            <select class="form-control" id="wa-general-modal-purpose" required>
              <option value="" disabled selected>Select a purpose...</option>
              <option value="Casual Inquiry">Casual Inquiry</option>
              <option value="Business Related">Business Related</option>
              <option value="Order Related">Order Related</option>
              <option value="Issue Related">Issue Related</option>
              <option value="Bill Related">Bill Related</option>
              <option value="Payment Related">Payment Related</option>
            </select>
            <div class="select-arrow" style="pointer-events:none; position:absolute; right:12px; top:50%; transform:translateY(-50%); font-size:12px; color:var(--text-secondary);">▼</div>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label" for="wa-general-modal-name">Your Name</label>
          <input type="text" class="form-control" id="wa-general-modal-name" placeholder="John Doe" required>
        </div>

        <div class="form-group">
          <label class="form-label" for="wa-general-modal-message">Message Details</label>
          <textarea class="form-control" id="wa-general-modal-message" rows="4" placeholder="Tell us how we can help you..." required></textarea>
        </div>

        <button type="submit" id="wa-general-modal-submit" class="btn btn-whatsapp w-full" style="justify-content:center;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style="margin-right:8px;">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          <span id="wa-general-modal-btn-text">Start WhatsApp Chat</span>
        </button>
      </form>
    </div>
  </div>

"""

for file in glob.glob('*.html'):
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Avoid injecting multiple times
    if 'id="wa-general-modal-overlay"' not in content:
        # Inject before PRODUCT WHATSAPP MODAL or EMAIL MODAL
        target_string = '<!-- ══════════════════ EMAIL MODAL ══════════════════ -->'
        if target_string in content:
            new_content = content.replace(target_string, new_wa_general_modal + target_string)
            with open(file, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Injected General WA Modal into {file}")
        else:
            print(f"Could not find target string in {file}")
    else:
        print(f"Already injected in {file}")
