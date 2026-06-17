import { defineField, defineType } from 'sanity'

export const destinationType = defineType({
  name: 'destination',
  title: 'Famous Destinations',
  type: 'document',
  icon: () => '📍', 
  fields: [
    defineField({
      name: 'name',
      title: 'Destination Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    // 1. ADDED: Precise GPS Coordinates
    defineField({
      name: 'coordinate',
      title: 'GPS Coordinates',
      type: 'geopoint',
      description: 'Used to pin this destination on the interactive map.',
    }),
    defineField({
      name: 'location',
      title: 'Region/Location (Text)',
      type: 'string',
      placeholder: 'e.g. Amhara Region, Northern Ethiopia',
    }),
    defineField({
      name:'Priority',
      title:'Priority Number',
      type:'number',
      placeholder:'e.g. 1 ,2 or 3'
    }),
    defineField({
      name: 'mainImage',
      title: 'Feature Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'A brief history or why this place is famous.',
    }),
    defineField({
      name: 'bestTimeToVisit',
      title: 'Best Time to Visit',
      type: 'string',
      placeholder: 'e.g. October to March',
    }),
    defineField({
      name: 'relatedTours',
      title: 'Tours that visit this place',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'tour' }] }],
    }),
  ],
})