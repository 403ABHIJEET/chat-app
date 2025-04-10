import { useEffect, useState } from 'react';
import { Switch } from './ui/switch';
import { Label } from './ui/label';

export default function ThemeToggle() {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        if (
            storedTheme === 'dark' ||
            (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)
        ) {
            document.documentElement.classList.add('dark');
            setIsDark(true);
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleTheme = () => {
        if (isDark) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            setIsDark(false);
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            setIsDark(true);
        }
    };

    return (
        <div className='flex justify-end pb-5'>
            <div className='flex gap-2'>
                <Switch onClick={toggleTheme} />
                <Label>
                    {
                        isDark ? (
                            '🌙 Dark'
                        ) : (
                            '☀️ Light'
                        )
                    }
                </Label>
            </div>
        </div>
    );
}
