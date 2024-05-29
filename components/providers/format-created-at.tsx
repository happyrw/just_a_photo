import React from 'react';

interface FormatRelativeTimeProps {
    createdAt: Date;
}

export function FormatRelativeTime({ createdAt }: FormatRelativeTimeProps) {
    const now = new Date();
    const timestamp = createdAt;
    const difference = now.getTime() - timestamp.getTime();
    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
        return <span>{days} day{days !== 1 ? 's' : ''} ago</span>;
    } else if (hours > 0) {
        return <span>{hours} hour{hours !== 1 ? 's' : ''} ago</span>;
    } else if (minutes > 0) {
        return <span>{minutes} minute{minutes !== 1 ? 's' : ''} ago</span>;
    } else {
        return <span>Just now</span>;
    }
};