# App icon set

`scripts/validate-icons.mjs` runs automatically before every build (`npm run build`
and `npm run build:dev`) and fails the build if any icon is the wrong size, is
missing, is not opaque, or would have its gold frame clipped by an Android
launcher mask. Run it on demand with:

```bash
npm run validate:icons
```

## CI

`.github/workflows/icons.yml` runs the same validator on every pull request and
on pushes to `main`. The check needs no dependency install (the validator uses
only Node built-ins), so it finishes in seconds. To make it blocking, add the
`Validate PWA icons` check to the branch protection rules for `main` in
GitHub → Settings → Branches.

Because `npm run build` and `npm run build:dev` call the validator first, an
icon regression also fails the production build, not just CI.

## Regenerating the icons

Source logo: the black-and-gold H&E crown mark, toned down ~28% in saturation.

```bash
# 1. Tone the source logo
magick <source-logo.png> -modulate 94,72 -resize 1024x1024 /tmp/hee-toned.png

# 2. Standard ("any") icons + Apple touch + favicons
for s in 48 72 96 128 144 152 167 180 192 256 384 512; do
  magick /tmp/hee-toned.png -resize ${s}x${s} -strip public/icon-${s}x${s}.png
done
magick public/icon-180x180.png -strip public/apple-touch-icon.png
magick /tmp/hee-toned.png -resize 64x64 -strip public/favicon.png
magick /tmp/hee-toned.png -resize 32x32 -strip public/favicon-32x32.png
magick /tmp/hee-toned.png -resize 16x16 -strip public/favicon-16x16.png

# 3. Maskable icons: logo at 72% inside a black square so Android's circular
#    launcher mask never touches the gold frame (validator enforces this).
for s in 192 512; do
  i=$(( s * 72 / 100 ))
  magick /tmp/hee-toned.png -resize ${i}x${i} -background black -gravity center \
    -extent ${s}x${s} -strip public/maskable-${s}x${s}.png
done

# 4. Verify
npm run validate:icons
```

Keep maskable artwork at or below 72% of the canvas: Android's safe zone is a
centered circle covering 80% of the icon, and the logo's rounded gold frame is
square, so its corners sit near the safe-zone edge.