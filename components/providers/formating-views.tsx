import { useState, useEffect } from 'react';
import { FaRegEye } from "react-icons/fa";

// Function to format view count
export const formatViewCount = (viewCount: number) => {
    if (viewCount < 1000) {
        return viewCount.toString(); // No need to format
    } else if (viewCount < 1000000) {
        return (viewCount / 1000).toFixed(1) + 'K'; // Format to 1 decimal place with 'K' suffix
    } else {
        return (viewCount / 1000000).toFixed(1) + 'M'; // Format to 1 decimal place with 'M' suffix
    }
};