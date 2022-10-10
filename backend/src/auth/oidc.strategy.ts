import { PassportStrategy } from "@nestjs/passport";
import { Issuer, Strategy, Client, TokenSet, UserinfoResponse } from "openid-client"
import { UnauthorizedException } from '@nestjs/common';

export const buildOpenIdClient = async () => {
    const TrustIssuer = await Issuer.discover('http://localhost:8080/auth/realms/sso-instructions-test/.well-known/openid-configuration');
    const client = new TrustIssuer.Client({
        client_id: 'sso-instructions-test',
        client_secret: '4LZbZljgL3KwDPU5Zy6b98G8B5YWwxQ4',
        redirect_uris: ['http://localhost:3001/auth/callback'],
        post_logout_redirect_uris: ['http://localhost:3001/auth/logout'],
        response_types: ['code']
    });
    return client;
}

export class OidcStrategy extends PassportStrategy(Strategy, 'oidc') {
    client: Client;

    constructor(client: Client) {
        super({
            client: client,
            params: {
                scope: 'openid profile',
            },
            passReqToCallback: false,
            usePKCE: true,
        });

        this.client = client;
    }

    async validate(tokenset: TokenSet): Promise<any> {
        const userinfo: UserinfoResponse = await this.client.userinfo(tokenset);

        try {
            const id_token = tokenset.id_token
            const access_token = tokenset.access_token
            const refresh_token = tokenset.refresh_token
            const user = {
                id_token,
                access_token,
                refresh_token,
                userinfo,
            }
            return user;
        } catch (err) {
            throw new UnauthorizedException();
        }
    }
}