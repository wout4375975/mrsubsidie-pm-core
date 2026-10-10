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

De openbare core-repository is de standaarddistributieroute voor portals zonder registry-authenticatie. Pin altijd op een vaste, gecontroleerde releasetag; gebruik nooit een beweeglijke branchnaam.

```json
{
  "dependencies": {
    "@wout4375975/mrsubsidie-pm-core": "git+https://github.com/wout4375975/mrsubsidie-pm-core.git#v0.2.0"
  }
}
```

De core commit de gecontroleerde `dist/`-releaseoutput mee. `pnpm release:prepare` bouwt die output, neemt uitsluitend `dist/` op in de index en valideert de git-artifacts; CI valideert vervolgens dezelfde artifacts via `pnpm release:check`. Daardoor vereist een schone `pnpm install --frozen-lockfile` geen buildscript, `.npmrc`, `PACKAGES_READ_TOKEN`, `NODE_AUTH_TOKEN` of andere registry-credential. Voer na iedere wijziging een anonieme installatiecontrole uit in een schone directory.

### GitHub Packages

De GitHub Package kan zichtbaar of publiek blijven als archief, maar wordt niet meer gebruikt door portals. De npm-registry van GitHub vereist volgens de officiële GitHub-documentatie een access token voor installatie. WebDev-productiebouw en alle toekomstige portals gebruiken daarom uitsluitend de vaste git-dependency hierboven.

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

Herstel vóór code review altijd de vaste git-tagdependency en commit de bijbehorende `pnpm-lock.yaml`.

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

`pnpm release:prepare` maakt de releaseoutput expliciet gereed voor commit. `pnpm release:check` voert de kwaliteitscontroles in de verplichte volgorde uit. `verify:git-artifact` controleert dat de gebouwde `dist/`-output volledig en ongewijzigd in git is vastgelegd. De tarballcontrole verifieert daarnaast dat geen `.npmrc`-token of omgevingsbestand in een package-artefact terechtkomt.

## GitHub Packages-archief

De GitHub Package-registry wordt niet meer gebruikt als runtime-distributieroute. Bestaande packageversies mogen als archief beschikbaar blijven; nieuwe portals gebruiken uitsluitend de vaste git-tagdependency. Er is daarom geen `PACKAGES_READ_TOKEN` of `NODE_AUTH_TOKEN` nodig in portalrepositories, CI of WebDev.

## Ontwerpprincipes

- De core bevat geen `PROJECT_*`, `AIRTABLE_*`, domeinen, deploymenttargets of geheimen.
- Portals importeren uitsluitend gedocumenteerde package-ingangen.
- Portals krijgen geen klant- of projectspecifieke codeoverrides.
- Iedere portal pinnen een core-releasetag in `pnpm-lock.yaml`; een core-upgrade is daarom een expliciete, geteste portalwijziging.
- Een releasetag wordt nooit verplaatst of overschreven. Herstel gebeurt via een volgende patchrelease of een portalrollback naar de vorige vaste core-tag.
