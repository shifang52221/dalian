# Homepage Static Image To CMS Migration Design

**Date:** 2026-03-29

## Goal

Upload the homepage images that are currently hardcoded as frontend static assets into PocketBase records, so the CMS not only exposes image fields but also starts with the same visuals the website is already using.

## Problem

The current implementation correctly added image file fields to the CMS and taught the frontend to prefer CMS images when they exist. However, the existing PocketBase setup and seed flow only import JSON record data. They do not upload the already-approved static images that the homepage currently renders from `public/images`.

That creates a mismatch:

- Frontend still shows images because it falls back to local static assets.
- CMS fields exist but remain empty until someone uploads files manually.

## Approved Solution

Add a one-time migration script and npm command that uploads the existing homepage static images into the matching PocketBase records.

## Migration Scope

### 1. Hero

- Source file: `public/images/horl.webp`
- Target collection: `home_hero`
- Target field: `hero_image`

### 2. About

- Source file: `public/images/dalian-coast-card.webp`
- Target collection: `home_about`
- Target field: `image`

### 3. Capabilities

Use each record's `preview_group` to choose the current static image:

- `maihu` -> `public/images/capabilities/maihu.jpg`
- `minghu` -> `public/images/capabilities/minghu.jpg`
- `denglizi` -> `public/images/capabilities/denglizi.jpg`
- `huoyan` -> `public/images/capabilities/huoyan.jpg`
- `rechuli` -> `public/images/capabilities/rechuli.jpg`
- `zhijian` -> `public/images/capabilities/zhijian.jpg`

Target collection: `capabilities`
Target field: `preview_image`

### 4. Product Cases

Use the first three gallery images already used by the homepage:

- `连铸设备 / 連鋳設備` -> `public/images/boheng-crops/gallery-workshop.png`
- `连轧设备 / 圧延設備` -> `public/images/boheng-crops/gallery-machine.png`
- `其他产品 / その他製品` -> `public/images/boheng-crops/gallery-fire-spray.png`

Target collection: `product_cases`
Target field: `image`

## Behavior

- The script should authenticate with PocketBase admin credentials.
- It should locate the existing published records and update them with files.
- It should skip missing local files with clear output instead of crashing the whole run.
- It should be safe to run more than once by updating the target field instead of duplicating records.

## Why A Dedicated Script

This migration is different from schema setup and different from JSON seeding:

- `cms:setup` changes collection structure
- `cms:seed` creates text records from JSON
- this new migration uploads local image files into existing records

Keeping it separate makes the operation explicit, safe, and easy to re-run during deployment.

## Verification

After the script runs successfully:

1. PocketBase records should display the uploaded files in the new image fields.
2. Homepage HTML should render `/api/media/...` image URLs for those sections.
3. The visual result should match the images the site already used before CMS takeover.
