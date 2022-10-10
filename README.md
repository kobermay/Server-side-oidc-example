# Server-side-oidc-example
Bei dieser Applikation handelt es sich um ein Implementierungsbeispiel für eine serverseitige Umsetzung von OIDC, mittels der NPM-Bibliothek openid-client. Es besteht die Möglichkeit sich per login Button bei Keycloak anzumelden und sich auch wieder abzumelden. Beim Login wird im Backend ein Session Cookie mit dem Attribut Http-only erstellt. Dieses muss immer an das Backend gesendet werden um auf geschützte Routen Zugriff zu haben. Eine der geschützten Routen ist http://localhost:3000/auth/test . Diese Route wird automatisch aufgerufen, wenn der Nutzer angemeldet ist. Die dazugehörige Antwort wird in den Browserlogs ausgegeben. Wird die Route ohne einem gültigen Session Cookie aufgerufen wird eine 403 Forbidden Fehlermeldung ausgegeben.

## Technologien
### Frontend
- React mit TypeScript

### Backend
- NestJs
- Postgres
- Redis (Wird verwendet um die Session ID des Session Cookies abzuspeichern)

### Infrastruktur
- docker
- docker-compose

### Identity Provider
- Keycloak

### Applikation starten
1. Code klonen oder herunterladen
2. Docker starten
3. Mit einem Terminal in den Ordner Server-side-oidc-example navigieren und den Befehl `docker-compose up` ausführen.
4. Mit dem Terminal in den Ordner backend navigieren und die Befehle `npm i` und `npm run start` ausführen.
5. Mit dem Terminal in den Ordner frontend navigieren und den Befehl `npm i` und `npm run start` ausführen. Bei der Frage ob der Port auf einem anderen Port freigesetzt werden soll mit Ja bestätigen.
6. Auf http://localhost:8080/auth navigieren und auf die Administration Console klicken.
7. Mit dem Nutzer "admin" und dem Passwort "Pa55w0rd" anmelden.
8. Unter dem Reiter Users einen User mit einem Passwort erstellen.
9. Auf http://localhost:3001 navigieren und sich mit dem erstellten User und dem Passwort anmelden.
