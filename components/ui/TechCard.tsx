import { Spotlight } from '@/components/ui/spotlight'
import * as LucideIcons from 'lucide-react'
import { LucideProps } from 'lucide-react'

type TechCardProps = {
  name: string
  icon: keyof typeof LucideIcons
}

export function TechCard({ name, icon }: TechCardProps) {
  const LucideIcon =
    (LucideIcons[icon] as React.FC<LucideProps>) || LucideIcons.Circle

  return (
    <div className="group relative flex cursor-default items-center gap-3 rounded-lg bg-zinc-200/30 p-3 transition-all hover:bg-zinc-300/40 dark:bg-zinc-800/30 dark:hover:bg-zinc-700/40">
      <Spotlight
        className="absolute inset-0 rounded-lg bg-gradient-to-r from-zinc-300 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        size={128}
      />
      <LucideIcon size={24} className="text-zinc-900 dark:text-zinc-100" />
      <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
        {name}
      </span>
    </div>
  )
}
