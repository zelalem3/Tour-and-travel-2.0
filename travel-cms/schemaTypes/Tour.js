import { defineField, defineType } from 'sanity'

export const tourType = defineType({
  name: 'tour',
  title: 'Tour Package',
  type: 'document',
  icon: () => '✈️', 
  fields: [
    defineField({
      name: 'title',
      title: 'Tour Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    // --- NEW: LINK TO DESTINATION ---
    defineField({
      name: 'destination',
      title: 'Destination',
      type: 'reference',
      to: [{ type: 'destination' }], // This connects it to your destinationType
      description: 'Which destination does this tour belong to?',
      validation: (Rule) => Rule.required(),
    }),
    // --------------------------------
    defineField({
      name: 'price',
      title: 'Price (USD)',
      type: 'number',
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      placeholder: 'e.g., 5 Days / 4 Nights',
    }),
    defineField({
      name: 'mainImage',
      title: 'Tour Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name:'Priority',
      title:'Priority Number',
      type:'number',
      placeholder:'e.g. 1 ,2 or 3'
    }),
    defineField({
      name: 'description',
      title: 'Tour Description',
      type: 'text',
    }),
    defineField({
      name: 'includes',
      title: "What's Included",
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
  ],
})