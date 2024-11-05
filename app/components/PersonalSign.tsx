import React, { useState } from 'react'
import { waypointProvider } from '../wallet/provider';
import * as ethers from 'ethers';
import toast from 'react-hot-toast';

export function PersonalSign() {
    const [message, setMessage] = useState("");
    const [result, setResult] = useState("");

    const handleSign = async () => {
        try {
            if (!message) {
                toast.error('Please enter a message to sign');
                return;
            }
            const web3Provider = new ethers.BrowserProvider(waypointProvider)
            const accounts = await web3Provider.listAccounts();

            if (!accounts.length) return alert('Connect to Ronin Waypoint to continue');

            const signer = await web3Provider.getSigner()
            const signature = await signer.signMessage(message);
            setResult(signature);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='flex flex-col gap-2'>
            <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder='Sign everything with Ronin Waypoint...'
                className='px-4 py-2 border border-gray-300 rounded-md text-gray-900'
            />
            <button onClick={handleSign} >Sign message</button>
            {result && <p>{`Signature: ${result}`}</p>}
        </div>
    );
}