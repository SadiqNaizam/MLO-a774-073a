import type { Config } from "tailwindcss";
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
        // PRD specific colors
        appSidebar: '#F5F5F5', // PRD designSystem.colorPalette.sidebar
        // PRD Accent Colors for charts/highlights
        accentBlue: '#299CDB', // Mapped to primary/accent HSL vars
        accentYellow: '#FFB934',
        accentGreen: '#1BC167',
        accentRed: '#E74C3C', // Mapped to destructive HSL var
        accentOrange: '#FF8E42',
        // PRD Text Colors (foreground and muted-foreground HSL vars cover these)
        // primaryText: '#212529',
        // secondaryText: '#878A99',
        // PRD Background Colors (background and card HSL vars cover these)
        // appBackground: '#F3F3F9',
        // surface: '#FFFFFF',
			},
			borderRadius: {
        // Kept original Shadcn structure. With --radius: 0.5rem,
        // 'rounded-md' (calc(var(--radius) - 2px)) will visually be 0.375rem,
        // matching PRD's default 'rounded-md' specification.
				lg: 'var(--radius)', // Becomes 0.5rem
				md: 'calc(var(--radius) - 2px)', // Becomes 0.5rem - 2px (approx. 0.375rem or Tailwind's md)
				sm: 'calc(var(--radius) - 4px)' // Becomes 0.5rem - 4px (approx. 0.25rem or Tailwind's sm)
			},
      fontFamily: {
        sans: ['Nunito', ...defaultTheme.fontFamily.sans],
      },
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
