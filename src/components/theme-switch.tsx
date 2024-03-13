'use client'
import { LuMoonStar } from 'react-icons/lu'
import { IoIosSunny } from 'react-icons/io'
import { Switch } from '@/components/ui/switch'
import { useTheme } from 'next-themes'

export default function ThemeSwitch() {
  const { theme, setTheme, systemTheme } = useTheme()
  const currentTheme = theme === 'system' ? systemTheme : theme

  return (
    <div className='flex gap-2 items-center'>
      <IoIosSunny />
      <Switch
        checked={currentTheme === 'dark'}
        onCheckedChange={() => {
          if (currentTheme === 'light') {
            setTheme('dark')
          }
          if (currentTheme === 'dark') {
            setTheme('light')
          }
        }}
      />
      <LuMoonStar />
    </div>
  )
}
