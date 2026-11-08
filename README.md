# PCBuilds

PCBuilds is Sub and Abd’s garage-built PC project: carefully matched components, sensible bundles, and savings passed back to buyers. The landing page is a lightweight static site with no runtime dependencies.

## Design directions

The production homepage at `public/index.html` currently opens with **Direction A — The Garage Signal**: warm workbench light, dark metal and an amber accent. Open `/prototype-review.html` in Manus Preview to compare both directions. The review page links to the full homepage as either `/?concept=bench` or `/?concept=signal`; Direction B uses a cool precision palette and aligned component-flow artwork. The review page is `noindex` and excluded from the sitemap.

## Local preview

From this project directory, start the Manus Preview server on the session’s configured port:

```sh
python3 -m http.server 3000 --bind 127.0.0.1 --directory public
```

Open the Manus Preview at `/` for the site or `/prototype-review.html` for the two design choices. The preview port is session-local; do not commit it into production configuration.

## Cloudflare Pages

This repository is a static HTML site; no Node build or environment variables are needed. A Cloudflare Pages Git-integrated project can use:

- Repository: `5u8han/PCBuilds`
- Root directory: `/` (repository root)
- Production branch: `master`
- Build command: leave blank, or use `exit 0` if a command is required
- Build output directory: `public`

The tracked `wrangler.toml` declares project name `pcbuilds` and `pages_build_output_dir = "./public"`. Keep Cloudflare’s build settings aligned with this file. For local Pages emulation, use `npx wrangler@latest pages dev ./public`. After authorizing Wrangler and creating the Pages project, a manual upload can use `npx wrangler@latest pages deploy ./public --project-name pcbuilds`; Git integration is the recommended path for branch-based builds.

To connect GitHub, use Cloudflare Dashboard → Workers & Pages → Create application → Pages → Connect to Git, select `5u8han/PCBuilds`, and choose `master` as the production branch. Pushes to `master` can trigger production builds if that Git integration is active; no Cloudflare account was accessed and no direct deployment command was run here.

## Custom domain

The requested canonical origin is `https://builds.5u8han.dev/`. After the Pages project has a successful deployment, add `builds.5u8han.dev` under the project’s **Custom domains** flow. It is a subdomain, so its DNS provider needs a CNAME pointing to the project’s assigned `<project>.pages.dev` hostname. Associate the custom domain in the Pages dashboard first; a standalone CNAME is not sufficient. No DNS or domain-mapping changes were made here.

## Scope notes

Build paths are representative workload directions, not fixed part lists, live stock, performance guarantees, quoted prices or a checkout flow. The existing user Git repository and `origin` remote are preserved. The initialized Manus WebDev configuration still has platform analytics enabled; that existing setting was left unchanged.

Cloudflare references: [Static HTML deployment](https://developers.cloudflare.com/pages/framework-guides/deploy-anything/), [Git integration](https://developers.cloudflare.com/pages/get-started/git-integration/), [Wrangler Pages configuration](https://developers.cloudflare.com/pages/functions/wrangler-configuration/), and [Custom domains](https://developers.cloudflare.com/pages/configuration/custom-domains/).
