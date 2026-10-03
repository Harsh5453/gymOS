import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const nav = 'hidden text-sm text-mu transition-colors hover:text-tx md:block'
const sub = 'text-sm text-mu transition-colors hover:text-tx'

export default function MainLayout({ children }) {
  const { pathname, hash } = useLocation()
  const home = pathname === '/'
  useEffect(() => {
    if (hash) document.querySelector(hash)?.scrollIntoView()
    else window.scrollTo(0, 0)
  }, [pathname, hash])

  if (pathname.startsWith('/app')) return children // the workspace brings its own shell

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[200] focus:rounded-lg focus:bg-tx focus:px-4 focus:py-2 focus:font-semibold focus:text-ink">
        Skip to content
      </a>
      <header className="sticky top-0 z-30 border-b border-line bg-ink/85 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-6">
          <Link to="/" className="text-sm font-bold tracking-[.14em]">
            ANJORYX<span className="ml-2 font-medium tracking-normal text-mu">GymOS</span>
          </Link>
          <nav aria-label="Primary" className="flex items-center gap-6">
            {home ? (
              <>
                <Link to="/#demo" className={nav}>Product</Link>
                <Link to="/#how" className={nav}>How it works</Link>
                <Link to="/app" className={nav}>Demo</Link>
                <Link to="/build" className="btn btn-s btn-p">Build My Gym System</Link>
              </>
            ) : (
              <>
                <Link to="/" className={sub}>Exit</Link>
                <Link to="/app" className={sub}>Skip to demo</Link>
              </>
            )}
          </nav>
        </div>
      </header>
      <main id="main" tabIndex={-1} className="outline-none">{children}</main>
      <footer className="mx-auto max-w-6xl px-6 pb-12 pt-6 text-[13px] text-mu">
        ANJORYX Technologies · Engineering the Next Era. ·{' '}
        <a className="hover:text-tx" href="mailto:anjoryx.tech@gmail.com">anjoryx.tech@gmail.com</a>
      </footer>
    </>
  )
}
