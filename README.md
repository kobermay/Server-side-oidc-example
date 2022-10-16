# Server-side-oidc-example
Bei dieser Applikation handelt es sich um ein Implementierungsbeispiel für eine serverseitige Umsetzung von OIDC, mittels der NPM-Bibliothek openid-client. Es besteht die Möglichkeit sich per login Button bei Keycloak anzumelden und sich auch wieder abzumelden. Beim Login wird im Backend ein Session Cookie mit dem Attribut Http-only erstellt. Dieses muss immer an das Backend gesendet werden um auf geschützte Routen Zugriff zu haben. Eine der geschützten Routen ist http://localhost:3000/auth/test . Diese Route wird automatisch aufgerufen, wenn der Nutzer angemeldet ist. Die dazugehörige Antwort wird in den Browserlogs ausgegeben. Wird die Route ohne einem gültigen Session Cookie aufgerufen wird eine 403 Forbidden Fehlermeldung ausgegeben. Um die Tokens im Backend zeigen zu können, werden beim Aufruf der Route /auth/user die Tokens im Backend geloggt.

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

### Verwendete NPM-Bibliotheken:
- redis
- connect-redis
- express-session
- openid-client
- @nestjs/passport

### Applikation starten
1. Code klonen oder herunterladen
2. Docker starten
3. Mit einem Terminal in den Ordner Server-side-oidc-example navigieren und den Befehl `docker-compose up` ausführen.
4. Auf http://localhost:8080/auth navigieren und auf die Administrations Console klicken.
5. Mit dem Nutzer "admin" und dem Passwort "Pa55w0rd" anmelden.
6. Unter dem Reiter Users auf den Button `Add user` klicken.
7. Einen Usernamen eingeben und den Button `Save` klicken.
8. Auf den Reiter `Credentials` klicken und ein Passwort eingeben. Den Button Temporary auf OFF setzen und als nächstes den Button `Set Password` drücken.
9. Unter Clients auf `sso-instructions-test` klicken.
10. Auf den Reiter Credentials klicken und auf den Button `Regenerate Secret` klicken.
11. Das neu generierte Secret kopieren und in der Datei unter Server-side-oidc-example/backend/src/auth/oidc.strategy.ts bei client_secret mit dem bereits existierenden austauschen.
12. Mit dem Terminal in den Ordner backend navigieren und die Befehle `npm i` und `npm run start` ausführen.
13. Mit dem Terminal in den Ordner frontend navigieren und den Befehl `npm i` und `npm run start` ausführen. Bei der Frage ob der Port auf einem anderen Port freigesetzt werden soll mit Ja bestätigen.
14. Auf http://localhost:3001 navigieren und sich mit dem erstellten User und dem Passwort anmelden.
