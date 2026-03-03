import { defineField, defineType } from 'sanity';

export const sectionType = defineType({
  name: 'section',
  title: 'Sections',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'sectionType',
      title: 'Section Type',
      type: 'string',
      options: {
        list: [
          { title: 'Hero', value: 'hero' },
          { title: 'Features', value: 'features' },
          { title: 'Testimonials', value: 'testimonials' },
          { title: 'CTA', value: 'cta' },
          { title: 'Text', value: 'text' },
          { title: 'Gallery', value: 'gallery' },
          { title: 'Contact', value: 'contact' },
          { title: 'Pricing', value: 'pricing' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'body',
      title: 'Body Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
          },
        },
        { type: 'image', options: { hotspot: true } },
      ],
    }),
    defineField({
      name: 'media',
      title: 'Media',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'media' }] }],
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
    }),
    defineField({
      name: 'ctaUrl',
      title: 'CTA Button URL',
      type: 'string',
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          { title: 'White', value: 'white' },
          { title: 'Gray', value: 'gray' },
          { title: 'Blue', value: 'blue' },
          { title: 'Dark', value: 'dark' },
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      type: 'sectionType',
    },
    prepare({ title, type }) {
      return {
        title,
        subtitle: type,
      };
    },
  },
});
