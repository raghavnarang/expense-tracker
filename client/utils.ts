import React from "react";

export const getApiUrl = (url: string) => `http://localhost:4000/${url}`;

export const ToastContext: React.Context<{
    showToast: (text: string) => void;
}> = React.createContext({
    showToast: (text: string) => { }
});