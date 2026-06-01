import React from "react";

interface IconDef {
  fill?: boolean;
  sw?: number;
  svg: string;
}

const ICONS: Record<string, IconDef> = {
  lightning:               { fill: true,  svg: '<path d="M13 2 L5 13 H10 L9 22 L17 10 H12 Z"/>' },
  check:                   {              svg: '<path d="M5 12.5 L10 17.5 L19 6.5"/>' },
  "check-bold":            { sw: 2.6,     svg: '<path d="M5 12.5 L10 17.5 L19 6.5"/>' },
  "check-fat":             { sw: 2.8,     svg: '<path d="M5 12.5 L10 17.5 L19 6.5"/>' },
  "rocket-launch":         {              svg: '<path d="M12 2.5c2.8 1.6 4.3 4.8 4.3 7.7 0 2-.8 4-1.4 5.1H9.1c-.6-1.1-1.4-3.1-1.4-5.1 0-2.9 1.5-6.1 4.3-7.7Z"/><circle cx="12" cy="9.3" r="1.7"/><path d="M9.2 16.5c-1.2.6-2.3 2.1-2.3 4.2 1.6 0 3-.6 3.6-1.6M14.8 16.5c1.2.6 2.3 2.1 2.3 4.2-1.6 0-3-.6-3.6-1.6"/>' },
  "play-circle":           {              svg: '<circle cx="12" cy="12" r="9"/><path d="M10 8.3 L16 12 L10 15.7 Z" fill="currentColor" stroke="none"/>' },
  "user-plus":             {              svg: '<circle cx="9.5" cy="8" r="3.3"/><path d="M3.6 20c0-3.4 2.7-5.8 5.9-5.8 1.3 0 2.6.4 3.6 1.1"/><path d="M18 13.5v6M15 16.5h6"/>' },
  sparkle:                 { fill: true,  svg: '<path d="M12 2.5C12.6 8 13.4 9.4 21.5 12 13.4 14.6 12.6 16 12 21.5 11.4 16 10.6 14.6 2.5 12 10.6 9.4 11.4 8 12 2.5Z"/>' },
  "chat-teardrop-text":    {              svg: '<path d="M4 5.6A1.6 1.6 0 0 1 5.6 4h12.8A1.6 1.6 0 0 1 20 5.6v8a1.6 1.6 0 0 1-1.6 1.6H9l-5 4Z"/><path d="M8 8.5h8M8 11.5h5"/>' },
  "check-circle":          {              svg: '<circle cx="12" cy="12" r="9"/><path d="M8.5 12 L11 14.5 L15.5 9.5"/>' },
  path:                    {              svg: '<circle cx="6" cy="6" r="2.4"/><circle cx="18" cy="18" r="2.4"/><path d="M6 8.4v5.6a3.6 3.6 0 0 0 3.6 3.6H15.6"/>' },
  stack:                   {              svg: '<path d="M12 3 L21 8 L12 13 L3 8 Z"/><path d="M3.2 12 L12 17 L20.8 12"/><path d="M3.2 16 L12 21 L20.8 16"/>' },
  "magnifying-glass":      {              svg: '<circle cx="10.5" cy="10.5" r="6.2"/><path d="M19.5 19.5 L15 15"/>' },
  "arrows-clockwise":      {              svg: '<path d="M20 11a8 8 0 1 0-1.2 5.4"/><path d="M20 5v5h-5"/>' },
  "arrow-counter-clockwise": {            svg: '<path d="M4 11a8 8 0 1 1 1.2 5.4"/><path d="M4 5v5h5"/>' },
  "slack-logo":            {              svg: '<path d="M6 9a6 6 0 0 1 12 0c0 4.5 2 5.8 2 5.8H4S6 13.5 6 9Z"/><path d="M10 20a2 2 0 0 0 4 0"/>' },
  "shield-check":          {              svg: '<path d="M12 3 L20 6 V11.5 C20 16.5 16.4 19.6 12 21 7.6 19.6 4 16.5 4 11.5 V6 Z"/><path d="M8.8 12 L11 14.2 L15.4 9.8"/>' },
  gauge:                   {              svg: '<path d="M4 17.5a8 8 0 1 1 16 0"/><path d="M12 17.5 L15.5 10.5"/><circle cx="12" cy="17.5" r="1.3" fill="currentColor" stroke="none"/>' },
  "dot-outline":           { fill: true,  svg: '<circle cx="12" cy="12" r="3.2"/>' },
  question:                {              svg: '<circle cx="12" cy="12" r="9"/><path d="M9.6 9.4a2.5 2.5 0 1 1 3.3 2.4c-.9.3-1.4.9-1.4 1.9"/><circle cx="11.5" cy="16.6" r="0.6" fill="currentColor" stroke="none"/>' },
  plus:                    { sw: 2,       svg: '<path d="M12 5 V19 M5 12 H19"/>' },
  "warning-circle":        {              svg: '<circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5"/><circle cx="12" cy="16.2" r="0.6" fill="currentColor" stroke="none"/>' },
  "lock-simple":           {              svg: '<rect x="5" y="10.5" width="14" height="9.5" rx="2"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/>' },
  buildings:               {              svg: '<path d="M3 21h18"/><path d="M5 21V7l6-2.5V21"/><path d="M11 21V9l6 2v10"/><path d="M8 9.5v0M8 13v0M14 13v0M14 16.5v0"/>' },
  rocket:                  {              svg: '<path d="M12 2.5c2.8 1.6 4.3 4.8 4.3 7.7 0 2-.8 4-1.4 5.1H9.1c-.6-1.1-1.4-3.1-1.4-5.1 0-2.9 1.5-6.1 4.3-7.7Z"/><circle cx="12" cy="9.3" r="1.7"/><path d="M9.2 16.5c-1.2.6-2.3 2.1-2.3 4.2 1.6 0 3-.6 3.6-1.6M14.8 16.5c1.2.6 2.3 2.1 2.3 4.2-1.6 0-3-.6-3.6-1.6"/>' },
  "globe-hemisphere-west": {              svg: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a13 13 0 0 1 0 18M12 3a13 13 0 0 0 0 18"/>' },
  cube:                    {              svg: '<path d="M12 2.5 L20.5 7 V17 L12 21.5 L3.5 17 V7 Z"/><path d="M12 2.5 V12 M12 12 L20.5 7 M12 12 L3.5 7"/>' },
};

export interface IcProps {
  name: string;
  style?: React.CSSProperties;
  className?: string;
}

export function Ic({ name, style, className = "" }: IcProps) {
  const def = ICONS[name] ?? ICONS["dot-outline"];
  const filled = !!def.fill;
  return (
    <svg
      className={`ic${className ? ` ${className}` : ""}`}
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth={def.sw ?? 1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flex: "none", display: "inline-block", verticalAlign: "-0.14em", ...style }}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: def.svg }}
    />
  );
}
