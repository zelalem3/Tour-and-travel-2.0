export default {
  name: 'gallery',
  title: 'Photo Gallery',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Gallery Title',
      type: 'string',
      description: 'e.g., Simien Mountains Expedition',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      description: 'The URL path (e.g., simien-mountains)',
    },
    {
      name: 'mainImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'images',
      title: 'Gallery Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              title: 'Alternative Text',
              type: 'string',
              description: 'Important for SEO and accessibility.',
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
            }
          ]
        }
      ],
      options: {
        layout: 'grid'
      }
    }
  ]
}