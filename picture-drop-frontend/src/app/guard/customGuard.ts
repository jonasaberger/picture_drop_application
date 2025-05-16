import {ActivatedRouteSnapshot, CanActivate, CanActivateFn, RouterStateSnapshot} from '@angular/router';
import {AuthGuardData, createAuthGuard} from 'keycloak-angular';

const isAccessAllowed =  async(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  authData: AuthGuardData
): Promise<boolean> => {
  const{authenticated, grantedRoles, keycloak} = authData;

  if(!authenticated){
    await keycloak.login({
      redirectUri: window.location.origin + state.url
    });
    return false;
  }
  return true;
}

export const canActivate : CanActivateFn = createAuthGuard<CanActivateFn>(isAccessAllowed);
