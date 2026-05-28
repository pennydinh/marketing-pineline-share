import React from 'react';
export default function MobilePanel({ children, onClose, }: {
    children: React.ReactNode;
    onClose: () => void;
}): React.ReactPortal;
