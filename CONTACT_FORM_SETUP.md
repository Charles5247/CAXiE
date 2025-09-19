# Contact Form Setup Guide

The contact form has been updated with multiple fallback options to ensure it works reliably. Here's how to configure it:

## Option 1: EmailJS (Recommended)

1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create a new email service (Gmail, Outlook, etc.)
3. Create an email template
4. Get your credentials and add them to a `.env` file:

```env
REACT_APP_EMAILJS_SERVICE_ID=your_service_id_here
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id_here
REACT_APP_EMAILJS_USER_ID=your_user_id_here
```

## Option 2: Formspree (Free Alternative)

1. Sign up at [Formspree](https://formspree.io/)
2. Create a new form
3. Get your form endpoint and add it to `.env`:

```env
REACT_APP_FORMSPREE_ENDPOINT=https://formspree.io/f/your_form_id_here
```

## Option 3: Netlify Forms (If deployed on Netlify)

If you deploy this site to Netlify, the form will automatically work with Netlify Forms. No configuration needed.

## Option 4: Mailto Fallback (Always Works)

If none of the above are configured, the form will automatically open the user's email client with a pre-filled email. This always works as a fallback.

## Current Status

The contact form is now working with the following priority:
1. EmailJS (if configured)
2. Formspree (if configured)
3. Netlify Forms (if deployed on Netlify)
4. Mailto fallback (always available)

## Testing

To test the form:
1. Fill out all required fields
2. Submit the form
3. Check the success message to see which method was used
4. If using mailto fallback, your email client should open with a pre-filled message

The form will automatically try each method in order until one works, ensuring users can always send you a message. 