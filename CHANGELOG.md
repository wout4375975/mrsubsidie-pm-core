# Changelog

Alle relevante wijzigingen aan deze package worden in dit bestand vastgelegd.

## Onversieerde distributiewijziging — 2026-10-09

- De core-repository is openbaar en wordt de standaarddistributieroute voor tokenloze portals.
- De gecontroleerde `dist/`-releaseoutput wordt in git vastgelegd, zodat portals een exacte core-commit als dependency kunnen pinnen zonder registrycredential.
- GitHub Packages kan publiek zichtbaar zijn, maar de GitHub npm-registry vereist ook voor publieke packages een token bij installatie. `npm.pkg.github.com` is daarom niet de route voor WebDev-productiebouw of andere tokenloze portals.
- De packageversie en de export-interface zijn hierbij niet gewijzigd; dit is uitsluitend een wijziging in distributie en toegang.

## 0.2.0 — 2026-10-09

- Gedeelde stateless UI-primitieven als stabiele subpath-exports onder `./ui/*`.
- Eerste package-ingangen: `utils`, `badge`, `label` en `separator`.
- Aanvullend meegenomen stateless UI-primitieven: avatar, card, dialog, dropdown-menu, scroll-area, select, sheet, skeleton, toggle en tooltip.
- `button` is als afzonderlijke export beschikbaar, maar wordt in Horeca pas na de controlemodules gemigreerd.
- `input`, `textarea`, `sidebar` en `sonner` blijven buiten deze release wegens portalhooks, thema- of compositieafhankelijkheden.
- Packagecontrole verifieert alle UI-ingangen voor ESM, CommonJS en TypeScript-declaraties.

## 0.1.0 — 2026-10-09

- Eerste private GitHub Packages-release van `@wout4375975/mrsubsidie-pm-core`.
- TypeScript- en tsup-basis met ESM-, CommonJS- en type-output.
- CI met lint, typecontrole, tests, build, tarballcontrole en publicatie naar GitHub Packages.
- Bewust nog geen publieke API; UI-exports volgen in versie `0.2.0`.
