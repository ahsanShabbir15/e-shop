const contactUs= 
[
  {
    "company_name": "GlowUp Cosmetics",
    "address": {
      "street": "123 Beauty Avenue",
      "city": "Cosmetica City",
      "state": "CA",
      "postal_code": "98765",
      "country": "USA"
    },
    "phone_number": "+1 800-123-4567",
    "email": "support@glowupcosmetics.com",
    "social_media": {
      "facebook": "https://facebook.com/glowupcosmetics",
      "instagram": "https://instagram.com/glowupcosmetics",
      "twitter": "https://twitter.com/glowupcosmetics"
    },
    "working_hours": {
      "monday_to_friday": "9:00 AM - 6:00 PM",
      "saturday": "10:00 AM - 4:00 PM",
      "sunday": "Closed"
    },
    "contact_form": {
      "fields": [
        {
          "name": "name",
          "type": "text",
          "placeholder": "Enter your full name",
          "required": true
        },
        {
          "name": "email",
          "type": "email",
          "placeholder": "Enter your email address",
          "required": true
        },
        {
          "name": "message",
          "type": "textarea",
          "placeholder": "How can we assist you?",
          "required": true
        }
      ],
      "submit_button_text": "Send Message"
    }
  }
]
export default contactUs