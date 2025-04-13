import { useEffect, useState } from 'react';

interface props {
    open?: boolean
}

export default function ThemeToggle({open}: props) {
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
        console.log(open)
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
        <div className='flex justify-end items-center'>
            <div className='flex gap-2'>
                <button onClick={toggleTheme}>
                    {
                        isDark ? (
                            <span >
                            🌙 <span className={(open ?? true) ? 'inline' : 'hidden'}>Dark</span>
                          </span>
                        ) : (
                            <span >
                            ☀️ <span className={(open ?? true) ? 'inline' : 'hidden'}>Light</span>
                            </span>
                        )
                    }
                </button>
            </div>
        </div>
    );
}
