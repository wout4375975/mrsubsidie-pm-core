# Mistersubsidie PM Core

`@wout4375975/mrsubsidie-pm-core` is de gedeelde TypeScript-kern voor de Mistersubsidie-projectmanagementportals. De package bevat uitsluitend herbruikbare code. Projectgegevens, Airtable-bases, domeinen, deploymenttargets en geheimen blijven altijd in de afzonderlijke portal.

## Status

Versie `0.1.0` levert bewust nog geen publieke API. Deze eerste release verifieert uitsluitend de package-, build-, test- en publicatieketen. UI-exports volgen in Subfase 1.2.

## Installatie vanuit GitHub Packages

Voeg in de consumerende portal een tokenvrije `.npmrc` toe:

```ini
@wout4375975:registry=https://npm.pkg.github.com
```

Installeer de package vervolgens met pnpm:

```bash
pnpm add @wout4375975/mrsubsidie-pm-core@0.1.0
```

Voor een private package is authenticatie nodig. Gebruik lokaal een klassieke GitHub PAT met minimaal `read:packages` in een **user-level** `~/.npmrc`; commit nooit een token:

```ini
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

In GitHub Actions staat het token uitsluitend als repository-secret `PACKAGES_READ_TOKEN` en wordt het als `NODE_AUTH_TOKEN` aan de installatiestap doorgegeven.

## Lokale ontwikkeling zonder PAT

Een lokale core-versie heeft geen GitHub Packages-authenticatie nodig. Gebruik tijdelijk één van de volgende werkwijzen in de consumerende portal:

```bash
pnpm add @wout4375975/mrsubsidie-pm-core@file:../mrsubsidie-pm-core
```

of:

```bash
cd ../mrsubsidie-pm-core
pnpm link --global
cd ../horeca-academy-slim-dashboard
pnpm link --global @wout4375975/mrsubsidie-pm-core
```

Herstel na een geslaagde packagepublicatie altijd de normale versieafhankelijke dependency en commit de bijbehorende `pnpm-lock.yaml`.

## Ontwikkelen en controleren

```bash
pnpm install --frozen-lockfile
pnpm lint
pnpm check
pnpm test
pnpm build
pnpm verify:package
pnpm pack:check
```

`pnpm release:check` voert deze controles in de verplichte volgorde uit. De tarballcontrole verifieert daarnaast dat geen `.npmrc`-token of omgevingsbestand in de gepubliceerde package terechtkomt.

## Publiceren

De workflow `.github/workflows/publish.yml` publiceert uitsluitend na een merge naar `main`, nadat lint, typecontrole, tests, build en tarballcontrole geslaagd zijn.

Voor het eerste gebruik moet de private repository-secret `NPM_PUBLISH_TOKEN` zijn ingesteld. Gebruik een klassieke GitHub PAT met ten minste `write:packages` en `repo`. De secret verschijnt nooit in repositorybestanden of workflowlogs.

Elke publicatie vereist een nieuwe semver-versie in `package.json`, een bijbehorende regel in `CHANGELOG.md`, een groene core-CI en een nieuwe, immutable packageversie.

Patchversies zijn bugfixes, minorversies zijn backward-compatible uitbreidingen en majorversies zijn breaking changes. Binnen Fase 1 worden geen majorversies gepubliceerd.

## Ontwerpprincipes

- De core bevat geen `PROJECT_*`, `AIRTABLE_*`, domeinen, deploymenttargets of geheimen.
- Portals importeren uitsluitend gedocumenteerde package-ingangen.
- Portals krijgen geen klant- of projectspecifieke codeoverrides.
- De `pnpm-lock.yaml` in iedere portal maakt een packageversie reproduceerbaar. Een core-upgrade is daarom een expliciete, geteste portalwijziging.
- Een gepubliceerde packageversie wordt nooit overschreven of verwijderd om herstel te forceren; herstel gebeurt via een volgende patchrelease of een rollback in de portal.
