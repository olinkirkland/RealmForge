# Realm Writer
### Procedurally Generated Descriptions of Fantasy Places
This project uses TypeScript and vanilla HTML/CSS.

While it borrows some worldbuilding and naming logic from my procedurally generated map projects, this is decidedly less visual, in favor of a more creative-writing approach to designing places.
Each generated realm has several categories of content that are generated, such as 'geography' and 'economy'.
The naming logic uses a tag system to choose root and suffix name-parts, hero images, and river names.

Tags could look like this:
```
any, north, east, region, lordship, cold, wet, boreal-forest
```

For instance, a city on the coast could have the suffix '-hafen' (tagged with 'coast'), but since the tag list above does not contain 'coast', any name generated from the entity with that list could not end in the suffix '-hafen'.
