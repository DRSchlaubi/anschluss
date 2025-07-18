'use client';

import { useEffect, useState } from 'react';
import { checkConnection, ConnectionInfo } from '@/app/api';
// // Heroicons imports
import { LinkIcon } from '@heroicons/react/24/solid';
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/solid'; // Import Heroicons for status icons

export default function Home() {
  const [connectionStatus, setConnectionStatus] = useState<ConnectionInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkConnection()
      .then(setConnectionStatus)
      .finally(() => setIsLoading(false));
  }, []);

  const transport1Name = (
      <a
          href={`https://bahn.expert/details/${connectionStatus?.departureTransport?.displayName}/j/${connectionStatus?.departureTransport?.journeyId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 font-normal no-underline inline-flex items-center gap-1 align-middle"
      >
        <span className="leading-none">{connectionStatus?.departureTransport?.displayName}</span>
        <LinkIcon className="h-4 w-4 inline-block" />
      </a>
  );

  const transport2Name = (
      <a
          href={`https://bahn.expert/details/${connectionStatus?.destinationTransport?.displayName}/j/${connectionStatus?.destinationTransport?.journeyId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 font-normal no-underline inline-flex items-center gap-1 align-middle"
      >
        <span className="leading-none">{connectionStatus?.destinationTransport?.displayName}</span>
        <LinkIcon className="h-4 w-4 inline-block" />
      </a>
  );

  const renderMessage = () => {
    if (!connectionStatus) {
      return (
        <p className="text-red-500 dark:text-red-400">
          Error: Unable to fetch connection status.
        </p>
      );
    }

    // Updated switch cases
    switch (connectionStatus.status) {
      case 'SAFE':
        return (
          <p className="flex items-center gap-2">
            <CheckCircleIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
            {transport1Name} erreicht {transport2Name} locker!
          </p>
        );
      case 'CRITICAL':
        return (
          <p className="flex items-center gap-2">
            <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
            {transport1Name} erreicht {transport2Name} vielleicht, aber vielleicht auch nicht,
            also beeil dich!
          </p>
        );
      case 'IMPOSSIBLE':
        return (
          <p className="flex items-center gap-2">
            <XCircleIcon className="h-5 w-5 text-red-600 dark:text-red-400" />
            {transport1Name} kann {transport2Name} nicht erreichen.
          </p>
        );
      case 'UNKNOWN':
      default:
        return (
          <p className="flex items-center gap-2">
            <QuestionMarkCircleIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            Es konnte keine mögliche Verbindung von Gauting nach Murnau gefunden werden :&apos;(
          </p>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200 text-center flex items-center">
        Gauting-Murnau Anschluss
      </h1>
      {isLoading ? (
        <div className="flex flex-col items-center">
          <svg
            className="animate-spin h-10 w-10 text-blue-500 dark:text-blue-300"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Loading connection status...</p>
        </div>
      ) : (
        <div className="w-full max-w-md p-4 bg-white dark:bg-gray-800 shadow-lg rounded-lg text-center">
          {renderMessage()}
        </div>
      )}
    </div>
  );
}