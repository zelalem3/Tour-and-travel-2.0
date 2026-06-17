export default {
  name: 'testimonial',
  title: 'Testimonials',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'role',
      title: 'Role or Location',
      type: 'string',
      description: 'e.g., "Verified Traveler" or "Adventurer from UK"',
    },
    {
      name: 'image',
      title: 'User Photo',
      type: 'image',
      options: {
        hotspot: true, // Allows you to crop the face properly
      },
    },
    {
      name: 'quote',
      title: 'Testimonial Quote',
      type: 'text',
      description: 'The actual feedback from the client.',
      validation: (Rule) => Rule.required().min(10).max(500),
    },
    {
      name: 'rating',
      title: 'Rating (1-5)',
      type: 'number',
      description: 'Star rating for the experience',
      validation: (Rule) => Rule.min(1).max(5).precision(1),
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'image',
    },
  },
}