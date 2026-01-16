import type { ReactNode } from "react"

interface SplitPageProps {
  title: ReactNode
  description?: ReactNode
  pills?: string[]
  children: ReactNode
}

export function SplitPage({ title, description, pills, children }: SplitPageProps) {
  return (
    <main className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-linear-to-b from-background to-background/80 px-4 py-10 md:h-[calc(100vh-5rem)] md:overflow-hidden">
      <div className="mx-auto grid h-full w-full max-w-5xl items-stretch gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          {/* Left column: marketing copy */}
        <section className="flex min-h-0 flex-col justify-center gap-4">
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {title}
          </h1>
          {description && (
            <p className="max-w-md text-sm text-muted-foreground md:text-base">
              {description}
            </p>
          )}
          {pills && pills.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-3 text-xs text-muted-foreground">
              {pills.map((pill) => (
                <span
                  key={pill}
                  className="rounded-full bg-secondary/60 px-3 py-1"
                >
                  {pill}
                </span>
              ))}
            </div>
          )}
        </section>

        {/* Right column: page content */}
        <section className="flex min-h-0 items-center">
          <div className="w-full md:max-h-full md:overflow-y-auto scroll-surface">
            {children}
          </div>
        </section>
      </div>
    </main>
  )
}
