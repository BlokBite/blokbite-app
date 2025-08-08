import { CollectionConfig } from 'payload' // <-- WORKAROUND HERE for TS errors in editor

export const Themes: CollectionConfig = {
  slug: 'themes',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'active', 'updatedAt'],
    group: 'Appearance',
    description:
      'Upravljajte različitim vizuelnim temama za vašu web stranicu. Svaka tema uključuje svoj naslov, logo i stilove. Samo jedna tema može biti aktivna u jednom trenutku.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      label: 'Ime Teme',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'themeSiteTitle',
      label: 'Naslov Sajta za Ovu Temu',
      type: 'text',
      required: true,
      admin: {
        description: 'Naslov sajta koji će biti prikazan kada je ova tema aktivna.',
      },
    },
    {
      name: 'themeSiteLogo',
      label: 'Logo Sajta za Ovu Temu',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Logo koji će biti prikazan kada je ova tema aktivna.',
      },
    },
    {
      name: 'active',
      label: 'Da li je aktivna tema?',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description:
          'Samo jedna tema može biti označena kao aktivna. Kada se sačuva, ovo će aktivirati ovu temu i deaktivirati ostale.',
      },
      hooks: {
        beforeChange: [
          async ({ siblingData, req }: any) => {
            if (siblingData.active === true) {
              const { payload } = req
              try {
                const otherActiveThemes = await payload.find({
                  collection: 'themes',
                  where: {
                    active: { equals: true },
                    id: { not_equals: siblingData.id },
                  },
                  depth: 0,
                  limit: 100,
                })
                for (const theme of otherActiveThemes.docs) {
                  await payload.update({
                    collection: 'themes',
                    id: theme.id,
                    data: { active: false },
                  })
                }
              } catch (error: any) {
                payload.logger.error(`Greška pri deaktiviranju ostalih tema: ${error.message}`)
              }
            }
            return siblingData.active
          },
        ],
      },
    },
    {
      name: 'styles',
      label: 'CSS Varijable (JSON)',
      type: 'json',
      required: true,
      admin: {
        description:
          'Unesite svoje CSS varijable kao JSON objekat (npr. {"primary-bg": "#ffffff", "primary-color": "#333333", "text-color": "#000000"}). Ove varijable se koriste za stilizovanje teme.',
      },
    },
    {
      name: 'footerText',
      label: 'Tekst u Fusnoti za Ovu Temu',
      type: 'textarea',
      required: false,
      admin: {
        description: 'Tekst koji se prikazuje u fusnoti kada je ova tema aktivna.',
      },
    },
  ],
}

export default Themes
