/**
 * SHYAM WEAVETECH - GOOGLE APPS SCRIPT
 * 
 * INSTRUCTIONS:
 * 1. Go to your Google Apps Script dashboard (script.google.com)
 * 2. Open the script you created for the contact form
 * 3. Replace all the code there with the code below
 * 4. Update the 'YOUR_COMPANY_EMAIL@example.com' on line 21 with your actual email
 * 5. Click "Deploy" -> "Manage Deployments" -> Edit -> "New Version" -> Deploy
 */

function doPost(e) {
  try {
    // Parse the incoming JSON data from the frontend
    var data = JSON.parse(e.postData.contents);

    var userName = data.name || "Customer";
    var userEmail = data.email || "";
    var purpose = data.purpose || "Contact Inquiry";
    var message = data.message || "";

    // The logo from your live Vercel site
    var logoUrl = "https://shyamweavetech.vercel.app/images/logo.png";

    // ==========================================
    // 1. Send the Beautiful HTML email to Shyam Weavetech Staff
    // ==========================================
    var companyEmail = "shyamweavetech@gmail.com"; // <-- CHANGE THIS TO YOUR EMAIL!
    var companySubject = "New Website Inquiry: " + purpose;

    var companyHtmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <!-- Header with Navy Background and Logo -->
        <div style="background-color: #0F2744; padding: 24px; text-align: center;">
          <table border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
            <tr>
              <td style="padding-right: 15px; vertical-align: middle;">
                <img src="${logoUrl}" alt="Shyam Weavetech Logo" style="max-height: 50px; display: block;">
              </td>
              <td style="vertical-align: middle; text-align: left;">
                <div style="font-size: 22px; color: #ffffff; margin: 0; font-family: Arial, sans-serif; line-height: 1.2;">
                  <strong>Shyam</strong> Weavetech
                </div>
                <div style="font-size: 11px; color: #C9A227; margin-top: 4px; font-family: Arial, sans-serif; letter-spacing: 1px; text-transform: uppercase;">
                  Premium Crepe Yarn
                </div>
              </td>
            </tr>
          </table>
        </div>
        <!-- Email Body -->
        <div style="padding: 32px; background-color: #ffffff; color: #333333;">
          <h2 style="color: #C9A227; margin-top: 0;">New Website Inquiry</h2>
          <p style="line-height: 1.6;">You have received a new inquiry from the <strong>Shyam</strong> Weavetech website.</p>
          
          <div style="background-color: #f9f9f9; padding: 16px; border-radius: 6px; margin: 24px 0; border-left: 4px solid #0F2744;">
            <p style="margin: 0 0 10px 0;"><strong>Name:</strong> ${userName}</p>
            <p style="margin: 0 0 10px 0;"><strong>Email:</strong> ${userEmail}</p>
            <p style="margin: 0;"><strong>Purpose:</strong> ${purpose}</p>
          </div>
          
          <p style="font-size: 14px; color: #666666; line-height: 1.5;">
            <strong>Message:</strong><br><br>
            <em style="color: #444;">${message.replace(/\n/g, '<br>')}</em>
          </p>
        </div>
        <!-- Footer -->
        <div style="background-color: #f5f5f5; padding: 16px; text-align: center; font-size: 12px; color: #888888;">
          <p style="margin: 0;">&copy; ${new Date().getFullYear()} <strong>Shyam</strong> Weavetech. All rights reserved.</p>
        </div>
      </div>
    `;

    MailApp.sendEmail({
      to: companyEmail,
      subject: companySubject,
      htmlBody: companyHtmlBody
    });

    // ==========================================
    // 2. Send the Auto-Reply/Verification Email to the User
    // ==========================================
    if (userEmail !== "") {
      var userSubject = "Thank you for contacting Shyam Weavetech";

      // Beautiful HTML Email Template for the User
      var userHtmlBody = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
          
          <!-- Header with Navy Background and Logo -->
          <div style="background-color: #0F2744; padding: 24px; text-align: center;">
            <table border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
              <tr>
                <td style="padding-right: 15px; vertical-align: middle;">
                  <img src="${logoUrl}" alt="Shyam Weavetech Logo" style="max-height: 50px; display: block;">
                </td>
                <td style="vertical-align: middle; text-align: left;">
                  <div style="font-size: 22px; color: #ffffff; margin: 0; font-family: Arial, sans-serif; line-height: 1.2;">
                    <strong>Shyam</strong> Weavetech
                  </div>
                  <div style="font-size: 11px; color: #C9A227; margin-top: 4px; font-family: Arial, sans-serif; letter-spacing: 1px; text-transform: uppercase;">
                    Premium Crepe Yarn
                  </div>
                </td>
              </tr>
            </table>
          </div>
          
          <!-- Email Body -->
          <div style="padding: 32px; background-color: #ffffff; color: #333333;">
            <h2 style="color: #0F2744; margin-top: 0;">Hello ${userName},</h2>
            <p style="line-height: 1.6;">Thank you for reaching out to <strong>Shyam</strong> Weavetech!</p>
            <p style="line-height: 1.6;">We have successfully received your request regarding <strong>${purpose}</strong>. Our team is currently reviewing your inquiry and will get back to you shortly.</p>
            
            <hr style="border: 0; border-top: 1px solid #eeeeee; margin: 24px 0;">
            
            <p style="font-size: 14px; color: #666666; line-height: 1.5;">
              <strong>Your Message Summary:</strong><br><br>
              <em style="color: #444;">${message.replace(/\n/g, '<br>')}</em>
            </p>
          </div>
          
          <!-- Footer -->
          <div style="background-color: #f5f5f5; padding: 16px; text-align: center; font-size: 12px; color: #888888;">
            <p style="margin: 0;">&copy; ${new Date().getFullYear()} <strong>Shyam</strong> Weavetech. All rights reserved.</p>
            <p style="margin: 4px 0 0 0;">Surat, Gujarat, India</p>
          </div>
        </div>
      `;

      MailApp.sendEmail({
        to: userEmail,
        subject: userSubject,
        htmlBody: userHtmlBody
      });
    }

    // Return success response to frontend
    return ContentService.createTextOutput(JSON.stringify({ "status": "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ "status": "error", "message": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
