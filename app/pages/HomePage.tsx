'use client'
import React from 'react'
import { KEY_ENV } from '../constants';
import toast from 'react-hot-toast';
import { waypointProvider } from '../wallet/provider';
import { PersonalSign } from '../components/PersonalSign';


export const HomePage = () => {
    const [account, setAccount] = React.useState<string | undefined>();

    const handleConnectWaypoint = async () => {
        try {
            if (!KEY_ENV.CLIENT_ID) {
                toast.error('Missing CLIENT_ID in environment variables!');
                return;
            }
            const result = await waypointProvider.connect();
            setAccount(result?.address);
        }
        catch (error) {
            toast.error('Failed to connect Waypoint. Please check console logs!');
            console.error(error);
        }
    }

    const handleDisconnect = () => {
        try {
            waypointProvider.disconnect();
        }
        catch (error) {
            toast.error('Failed to disconnect Waypoint. Please check console logs!');
            console.error(error);
        }
    };

    return <>
        {account &&
            <div className='space-y-4'>
                <p className='text-green-500'>Welcome, {account}</p>
                <button onClick={handleDisconnect} className='border border-red-500 rounded-md p-2'>Disconnect</button>
                <PersonalSign />
            </div>}
        {!account && <button onClick={handleConnectWaypoint} className='border border-gray-500 rounded-md p-2'>Connect Waypoint</button>}
    </>
}
