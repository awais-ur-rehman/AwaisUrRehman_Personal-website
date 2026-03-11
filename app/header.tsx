'use client'
import { TextEffect } from '@/components/ui/text-effect'
import Link from 'next/link'
import { Magnetic } from '@/components/ui/magnetic'
import { Linkedin } from 'lucide-react'

export function Header() {
  return (
    <header className="mb-8 flex items-center justify-between">
      <div>
        <Link href="/" className="font-medium text-black dark:text-white">
          Awais Ur Rehman
        </Link>
        <TextEffect
          as="p"
          preset="fade"
          per="char"
          className="text-zinc-600 dark:text-zinc-500"
          delay={0.5}
        >
          Full Stack Developer
        </TextEffect>
      </div>
      <div>
        <Magnetic intensity={0.3}>
          <Link
            href="https://www.linkedin.com/in/awais-ur-rehman-88615a217/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-3 py-1.5 text-sm text-zinc-50 ring-1 ring-zinc-800 transition-colors hover:bg-zinc-950 dark:bg-zinc-50 dark:text-zinc-900 dark:ring-zinc-200 dark:hover:bg-zinc-100"
            aria-label="Hire me on LinkedIn"
          >
            <Linkedin className="h-4 w-4" />
            Hire Me
          </Link>
        </Magnetic>
      </div>
    </header>
  )
}
