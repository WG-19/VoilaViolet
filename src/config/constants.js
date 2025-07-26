// Contact Information
export const CONTACT = {
  EMAIL: process.env.REACT_APP_CONTACT_EMAIL || 'Voilaviolet@outlook.com',
  PHONE: process.env.REACT_APP_CONTACT_PHONE || '+263777978762',
  WHATSAPP: `https://wa.me/${process.env.REACT_APP_WHATSAPP_NUMBER || '263777978762'}`,
  WHATSAPP_DISPLAY: process.env.REACT_APP_CONTACT_PHONE ? 
    process.env.REACT_APP_CONTACT_PHONE.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3') : 
    '+263 77 797 8762'
};

// App Configuration
export const APP = {
  NAME: 'Voila Violet',
  DESCRIPTION: 'Premium 100% human hair bundles',
  THEME: {
    PRIMARY_COLOR: 'custom-purple',
    TEXT_COLOR: 'text-white',
    BG_COLOR: 'bg-black/30',
    BORDER_COLOR: 'border-white/20'
  }
};

// Form Defaults
export const FORM_DEFAULTS = {
  SUBMIT_BUTTON: 'Send Message',
  LOADING_TEXT: 'Sending...',
  SUCCESS_MESSAGE: 'Thank you for your message! We\'ll get back to you soon.'
};
