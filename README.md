# Mistersubsidie PM Core

`@wout4375975/mrsubsidie-pm-core` is de gedeelde TypeScript-kern voor de Mistersubsidie-projectmanagementportals. De repository bevat uitsluitend herbruikbare code. Projectgegevens, Airtable-bases, domeinen, deploymenttargets en geheimen blijven altijd in de afzonderlijke portal.

## Status en publieke API

Versie `0.2.0` levert de eerste UI-subpath-exports. Importeer uitsluitend via de gedocumenteerde package-ingangen, bijvoorbeeld:

```ts
import { Badge } from "@wout4375975/mrsubsidie-pm-core/ui/badge";
import { Label } from "@wout4375975/mrsubsidie-pm-core/ui/label";
import { Separator } from "@wout4375975/mrsubsidie-pm-core/ui/separator";
import { cn } from "@wout4375975/mrsubsidie-pm-core/ui/utils";
```

De package bevat avatar, badge, button, card, dialog, dropdown-menu, label, scroll-area, select, separator, sheet, skeleton, toggle, tooltip en `cn`. `input`, `textarea`, `sidebar` en `sonner` blijven voorlopig portaalgebonden.

## Tokenvrije installatie vanuit de openbare core-repository

De openbare core-repository is de standaarddistributieroute voor portals zonder registry-authenticatie. Pin altijd op een exacte, gecontroleerde git-commit; gebruik nooit een beweeglijke branchnaam.

```json
{
  "dependencies": {
    "@wout4375975/mrsubsidie-pm-core": "github:wout4375975/mrsubsidie-pm-core#COMMIT_SHA"
  }
}
```

De core commit de gecontroleerde `dist/`-releaseoutput mee. Daardoor vereist een schone `pnpm install --frozen-lockfile` geen buildscript, `.npmrc`, `PACKAGES_READ_TOKEN`, `NODE_AUTH_TOKEN` of andere registry-credential. Voer na iedere wijziging een anonieme installatiecontrole uit in een schone directory.

### GitHub Packages

De GitHub Package kan zichtbaar of publiek zijn, maar de npm-registry van GitHub vereist volgens de officiële GitHub-documentatie nog steeds een access token voor installatie. Gebruik `npm.pkg.github.com` daarom alleen voor omgevingen waar expliciet registry-authenticatie beschikbaar is; WebDev-productiebouw en toekomstige tokenloze portals gebruiken de vaste git-dependency hierboven.

## Tailwind CSS v4 in consumerende portals

Tailwind v4 scant packagebron niet automatisch. Iedere portal die UI uit deze core importeert, moet direct na `@import "tailwindcss";` een `@source`-regel opnemen die naar de geïnstalleerde core-output wijst:

```css
@import "tailwindcss";
@source "../../node_modules/@wout4375975/mrsubsidie-pm-core/dist";
```

Een portal-build en productie-smoke-test zijn pas geldig nadat deze regel aanwezig is en de gegenereerde CSS de utilities van de package bevat.

## Lokale ontwikkeling

Tijdens actieve core-ontwikkeling kan een portal tijdelijk naar de lokale werkmap verwijzen:

```bash
pnpm add @wout4375975/mrsubsidie-pm-core@file:../mrsubsidie-pm-core
```

Of gebruik een globale link:

```bash
cd ../mrsubsidie-pm-core
pnpm link --global
cd ../horeca-academy-slim-dashboard
pnpm link --global @wout4375975/mrsubsidie-pm-core
```

Herstel vóór code review altijd de vaste git-commitdependency en commit de bijbehorende `pnpm-lock.yaml`.

## Ontwikkelen en controleren

```bash
pnpm install --frozen-lockfile
pnpm lint
pnpm check
pnpm test
pnpm build
pnpm verify:package
pnpm verify:git-artifact
pnpm pack:check
```

`pnpm release:check` voert deze controles in de verplichte volgorde uit. `verify:git-artifact` controleert dat de gebouwde `dist/`-output volledig en ongewijzigd in git is vastgelegd. De tarballcontrole verifieert daarnaast dat geen `.npmrc`-token of omgevingsbestand in een package-artefact terechtkomt.

## Optionele GitHub Packages-publicatie

De workflow `.github/workflows/publish.yml` publiceert alleen na een merge naar `main`, nadat lint, typecontrole, tests, build en tarballcontrole slagen. Hiervoor blijft `NPM_PUBLISH_TOKEN` als private repository-secret nodig; de secret verschijnt nooit in repositorybestanden of workflowlogs.

Elke packagepublicatie vereist een nieuwe semver-versie in `package.json`, een bijbehorende regel in `CHANGELOG.md`, een groene core-CI en een nieuwe, immutable packageversie. Patchversies zijn bugfixes, minorversies zijn backward-compatible uitbreidingen en majorversies zijn breaking changes.

## Ontwerpprincipes

- De core bevat geen `PROJECT_*`, `AIRTABLE_*`, domeinen, deploymenttargets of geheimen.
- Portals importeren uitsluitend gedocumenteerde package-ingangen.
- Portals krijgen geen klant- of projectspecifieke codeoverrides.
- Iedere portal pinnen een core-commit in `pnpm-lock.yaml`; een core-upgrade is daarom een expliciete, geteste portalwijziging.
- Een gepubliceerde packageversie wordt nooit overschreven of verwijderd om herstel te forceren; herstel gebeurt via een volgende patchrelease of een portalrollback naar de vorige vaste core-commit.
