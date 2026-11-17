# Purwanchal website design direction

**Status: proposed direction, owner sign-off pending.** This document was written after the first build to replace an undocumented assumption. It is a draft, not owner-supplied brand guidance. The dials below are the honest no-direction defaults required by antislop R-37: **ENERGY 1 / RHYTHM 1 / MOTION 1**.

Reading this as: a public information site for parents, prospective families and alumni in Sunsari, in a calm editorial school-proud language, dial ENERGY 1 / RHYTHM 1 / MOTION 1.

## Identity

The school's uploaded crest in `public/logo/logo.png` is the identity mark. The wordmark beside it is a text lockup so the name stays legible at small sizes. Nothing in the visual system replaces or restyles the crest.

## Palette

| Role | Token | Value | Reason |
|---|---|---|---|
| Primary | `brand-700` / `brand-900` | `#0f5748` / `#0a372f` | Forest green matches the school's crest and the Tarahara setting. White on `brand-700` is 8.5:1. |
| Accent | `sun-300` | `#ffc857` | Warm amber used at one moment per screen: primary action or a single key figure. On `brand-950` it is 10.4:1. Never used as text on white. |
| Neutral | `cream`, `ink`, `line` | `#fbfaf6`, `#13221e`, `#e9e6dc` | Warm paper background reads as printed school material, not a generic white SaaS page. |
| Functional | `error` | `#b42318` | Used only for validation and error text. 6.6:1 on white. Not a decorative colour. |

Two core colours plus one accent. Coral, glass, radial orbs and dot grids were removed: none carried information.

## Type

`Plus Jakarta Sans` for interface and headings. It is a legible, slightly warm sans that suits a school prospectus. `Fraunces` italic is the single editorial voice, used for one phrase per heading. The pairing gives the site a recognisable voice without relying on a trend font.

## Layout and rhythm

RHYTHM 1: a predictable, uniform section structure. One idea per section, a single heading, and content laid out in a plain grid. This is deliberate for an information site: parents scan for facts. There is no bento grid, no alternating-background theatre and no card grid used as a default answer.

## Motion

MOTION 1: hover and focus states only. No scroll reveals, floating elements, marquees, pulse rings or parallax. Nothing on the page moves without a direct user action. `prefers-reduced-motion` is still honoured.

## Elevation

Radius is limited to small and medium values so a card reads as a container, not a pill. A single subtle border does most of the separation work. Shadows are used only where a surface sits above another surface (the sticky header when scrolled, the lightbox).

## Copy voice

Plain, specific and locally grounded. Facts come from `src/config/site.ts` (name, address, phone, 1994 founding, five academic levels, three +2 streams) or from the database. Where the school has not supplied content, the UI says so rather than inventing it. No em dashes, no generic CTAs, no invented achievements, testimonials or compliance claims.

## Change control

Any change to palette, type, motion or copy voice belongs in this file first. A visual technique is only added when its purpose can be written in one line here.
