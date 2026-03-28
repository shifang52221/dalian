# News Cover And R&D Article Design

**Goal:** Publish a news article based on the "技术研发" chapter from the provided company document, with an extracted original image displayed in the site news UI.

**Scope**
- Add a reusable cover-image field to CMS-backed news records.
- Render the news cover image in the news list and detail pages.
- Extract the source chapter text and one original document image, then publish a bilingual news record.

**Approach**
- Extend the PocketBase `news` collection with an optional file field for the cover image and thread it through the content mapping layer.
- Keep the current editorial layout, but add the image as a lead visual so existing news cards and detail pages remain consistent.
- Parse the supplied `.doc` locally, extract the chapter text and image assets, then import one polished article into PocketBase.

**Risks**
- Existing fallback news items do not currently carry image data, so the new field must remain optional.
- The supplied document is an old binary `.doc`; extraction is possible, but the image order may require manual selection from the extracted originals.
