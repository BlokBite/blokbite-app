import { CollectionConfig } from 'payload'

const Themes: CollectionConfig = {
  slug: 'themes',
  labels: {
    singular: 'Theme',
    plural: 'Themes',
  },
  admin: {
    useAsTitle: 'name',
    description: 'Site theme configuration, including styles and settings.',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Theme Name',
      required: true,
      unique: true,
      localized: true,
    },
    {
      name: 'styles',
      type: 'json',
      label: 'CSS Styles (JSON)',
      // The description property is now only valid inside the 'admin' object.
      // The following line has been removed to fix the error:
      // description: 'Define CSS variables or styles in JSON format.',
      admin: {
        description:
          'Define CSS variables or styles in JSON format. Example: { "primaryColor": "#007bff", "fontFamily": "Inter, sans-serif" }',
      },
    },
    {
      name: 'active',
      type: 'checkbox',
      label: 'Active Theme',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}

export default Themes
