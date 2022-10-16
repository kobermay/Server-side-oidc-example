import { Controller, Get, UseGuards, Request, Res } from '@nestjs/common';
import { Response } from 'express';
import { Issuer } from 'openid-client';
import { AuthenticatedGuard } from './authenticated.guard';
import { LoginGuard } from './login.guard';

@Controller('auth')
export class AuthController {
    @UseGuards(LoginGuard)
    @Get('/login')
    login() {}

    @Get('/user')
    user(@Request() req) {
        if(req.user){
        console.log(req.user);
        return req.user.userinfo;
        }
    }

    @UseGuards(LoginGuard)
    @Get('/callback')
    loginCallback(@Res() res: Response) {
        res.redirect('/');
    }

    @UseGuards(AuthenticatedGuard)
    @Get('/test')
    test(){
        return {name: 'test'};
    }

    @Get('/logout')
    async logout(@Request() req, @Res() res: Response) {
        const id_token = req.user ? req.user.id_token : undefined;
        req.logout(function(err) {
            if(err) {return err}
            res.redirect('/')
        });
        req.session.destroy(async (error: any) => {
            const TrustIssuer = await Issuer.discover('http://localhost:8080/auth/realms/sso-instructions-test/.well-known/openid-configuration');
            const end_session_endpoint = TrustIssuer.metadata.end_session_endpoint;
            if(end_session_endpoint) {
                res.redirect(end_session_endpoint + 
                    '?post_logout_redirect_uri=' + 'http://localhost:3001' +
                    (id_token ? '&id_token_hint=' + id_token : '')
                    );
            } else {
                res.redirect('/')
            }
        })
    }
}
