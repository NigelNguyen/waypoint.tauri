import { WaypointProvider } from '@sky-mavis/waypoint';
import { KEY_ENV } from '../constants';
import { saigon } from 'viem/chains';

export const waypointProvider = WaypointProvider.create({
  clientId: KEY_ENV.CLIENT_ID || '',
  chainId: saigon.id,
  waypointOrigin: 'https://id.skymavis.one',
  scopes: ['wallet', 'openid', 'profile', 'email'],
});