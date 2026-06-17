export default {
  name: 'contactInquiry',
  title: 'Traveler Inquiries',
  type: 'document',
  readOnly: true, 
  fields: [
    {
      name: 'userName',
      title: 'Adventurer Name',
      type: 'string',
    },
    {
      name: 'userEmail',
      title: 'Email Address',
      type: 'string',
    },
    {
      name: 'userPhone',
      title: 'WhatsApp / Phone',
      type: 'string',
    },
    // --- ADDED FIELD START ---
    {
      name: 'preferredContact',
      title: 'Preferred Contact Method',
      type: 'string',
      options: {
        list: [
          { title: 'Email', value: 'Email' },
          { title: 'WhatsApp', value: 'WhatsApp' },
          { title: 'Phone Call', value: 'Phone Call' },
        ],
        layout: 'radio', // Makes it look clean in the Sanity Studio
      },
    },
    // --- ADDED FIELD END ---
    {
      name: 'tourInterest',
      title: 'Selected Tour',
      type: 'string',
    },
    {
      name: 'guests',
      title: 'Number of Guests',
      type: 'number',
    },
    {
      name: 'message',
      title: 'Expedition Details',
      type: 'text',
    },
    {
      name: 'createdAt',
      title: 'Received At',
      type: 'datetime',
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
      }
    },
  ],
  preview: {
    select: {
      title: 'userName',
      subtitle: 'tourInterest',
      contact: 'preferredContact', // Added for the preview
    },
    prepare({ title, subtitle, contact }) {
      return {
        title: `${title} - ${subtitle}`,
        subtitle: `Via ${contact || 'Unknown'}`,
      }
    }
  }
}