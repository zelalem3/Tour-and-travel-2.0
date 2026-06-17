export default {
  name: 'youtubeVideo',
  title: 'YouTube Video',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Video Title',
      type: 'string',
    },
    {
      name: 'videoId',
      title: 'YouTube Video ID',
      type: 'string',
      description: 'The string of characters after "v=" in the URL (e.g., dQw4w9WgXcQ)',
    },
    {
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'videoId'
    }
  }
}