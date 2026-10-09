# Migratiehandleiding

## Fase 2 — ScootHub en HOP

Fase 2 migreert ScootHub en HOP naar dezelfde packageversie als Horeca. Een portal krijgt geen projectspecifieke fork of lokale wijziging van core-code.

Voer vóór elke migratie deze pre-checks uit:

1. Vergelijk de Tailwind-versie van de doelportal met Horeca. Als ScootHub of HOP nog Tailwind CSS v3 gebruikt, voer eerst een afzonderlijke v4-upgrade uit. De core-UI gebruikt Tailwind v4 en portalstylesheets moeten `@source` gebruiken om classes uit de core-package te detecteren.
2. Vergelijk React-, TypeScript-, Radix- en package-manager-versies met de peer- en engine-eisen van de coreversie.
3. Gebruik een tokenvrije scoped `.npmrc` met alleen `@wout4375975:registry=https://npm.pkg.github.com`. De core-package is publiek; `PACKAGES_READ_TOKEN`, `NODE_AUTH_TOKEN` en andere registry-secrets zijn niet nodig in portal-repositories of hun buildomgevingen.
4. Controleer de anonieme package-installatie expliciet met een schone installatiestap, zodat geen lokale npm-cache of bestaande credential het resultaat maskeert.
5. Leg de huidige deploymentconfiguratie en Airtable-base van de doelportal vast. De migratie mag geen `PROJECT_*`, `AIRTABLE_*`, domein, target of secret wijzigen.
6. Voer de volledige portal-CI en een productie-smoke-test uit voordat een volgende portal start.

## Rollback

Een portal kan terug naar de vorige, bewezen coreversie door de dependency en `pnpm-lock.yaml` terug te draaien en daarna opnieuw te bouwen en te publiceren. Een gepubliceerde GitHub Package-versie wordt niet overschreven of verwijderd. Een core-fout wordt hersteld met een nieuwe patchrelease.
